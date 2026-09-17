import { requestUrl } from 'obsidian';
import { t } from '../i18n';
import { digest, type CatalogDocument, type CatalogState, type CatalogSnapshot, type buildCatalog } from './catalog';

export class CatalogApi {
  constructor(private key: string) {}
  async json(endpoint: string, method = 'GET', body?: unknown): Promise<any> {
    if (!this.key.trim()) throw new Error(t('provider.add_an_openai_api_key_in_hacksidian'));
    const result = await requestUrl({ url: `https://api.openai.com/v1${endpoint}`, method,
      headers: { Authorization: `Bearer ${this.key.trim()}`, 'Content-Type': 'application/json' },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }), throw: false });
    if (method === 'DELETE' && result.status === 404) return {};
    if (result.status < 200 || result.status >= 300) throw Object.assign(new Error(`OpenAI ${method} ${endpoint}: HTTP ${result.status}`), {status: result.status});
    return result.json;
  }
  async upload(name: string, text: string): Promise<string> {
    const boundary = `hacksidian-${crypto.randomUUID()}`;
    const body = `--${boundary}\r\nContent-Disposition: form-data; name="purpose"\r\n\r\nassistants\r\n--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${name}"\r\nContent-Type: text/markdown\r\n\r\n${text}\r\n--${boundary}--\r\n`;
    const bytes = new TextEncoder().encode(body);
    const result = await requestUrl({ url: 'https://api.openai.com/v1/files', method: 'POST',
      headers: { Authorization: `Bearer ${this.key.trim()}`, 'Content-Type': `multipart/form-data; boundary=${boundary}` }, body: bytes.buffer as ArrayBuffer, throw: false });
    if (result.status < 200 || result.status >= 300 || !result.json?.id) throw new Error(`OpenAI upload: HTTP ${result.status}`);
    return result.json.id;
  }
}

export interface StoreChoice { id: string; name: string }
export interface SyncOptions {
  chooseStore?: (stores: StoreChoice[]) => Promise<string>;
  status?: (message: string) => void;
}
async function listAll(api: CatalogApi, endpoint: string): Promise<any[]> {
  const rows: any[] = [];
  let after = '';
  const seen = new Set<string>();
  for (;;) {
    const page = await api.json(`${endpoint}?limit=100${after ? `&after=${encodeURIComponent(after)}` : ''}`);
    if (!Array.isArray(page.data)) throw new Error('OpenAI: invalid list response');
    rows.push(...page.data);
    if (!page.has_more) return rows;
    after = page.last_id;
    if (!after || seen.has(after)) throw new Error('OpenAI: invalid pagination');
    seen.add(after);
  }
}
const attributes = (doc: CatalogDocument) => ({ hs_format: '1', hs_entry: doc.entryId!, hs_hash: doc.hash, hs_name: doc.name });

// Remote inventory is authoritative: local snapshots may be absent or stale.
// Never delete global Files: an older installation may share them with another store.
export async function syncCatalog(api: CatalogApi, state: CatalogState, catalog: ReturnType<typeof buildCatalog>, save: () => Promise<void>, progress: (done: number, total: number) => void, options: SyncOptions = {}): Promise<CatalogSnapshot> {
  options.status?.(t('catalog.discovering'));
  let store: any;
  const known = state.sync?.storeId ?? state.active?.storeId ?? state.pending?.storeId;
  if (known) {
    try { store = await api.json(`/vector_stores/${known}`); }
    catch (error) { if ((error as {status?:number}).status !== 404) throw error; }
    if (store?.status === 'expired') store = undefined;
  }
  if (!store) {
    const stores = (await listAll(api, '/vector_stores')).filter(s => s.status !== 'expired' &&
      (s.metadata?.hacksidian === 'catalog-v1' || /^Hacksidian(?: [a-f0-9]{12})?$/.test(s.name ?? '')));
    if (stores.length > 1) {
      if (!options.chooseStore) throw new Error(t('catalog.choose_store'));
      const id = await options.chooseStore(stores);
      store = stores.find(s => s.id === id);
      if (!store) throw new Error(t('catalog.selection_cancelled'));
    } else store = stores[0];
  }
  if (!store) store = await api.json('/vector_stores', 'POST', { name: 'Hacksidian', metadata: { hacksidian: 'catalog-v1' } });
  if (!store?.id) throw new Error('OpenAI: missing vector store ID');
  const base = `/vector_stores/${store.id}`;
  // Save selection before any uploads. A failed update blocks search until retried.
  if (state.sync?.storeId !== store.id) state.sync = { storeId: store.id, documents: [] };
  await save();
  const remote = await listAll(api, `${base}/files`);
  const inventory: Array<{ file: any; doc: CatalogDocument; tagged: boolean }> = [];
  options.status?.(t('catalog.comparing'));
  for (const file of remote) {
    const a = file.attributes;
    let doc: CatalogDocument | undefined;
    let tagged = false;
    if (a?.hs_format === '1' && typeof a.hs_entry === 'string' && /^[a-f0-9]{64}$/.test(a.hs_hash) && typeof a.hs_name === 'string') {
      doc = { entryId: a.hs_entry, hash: a.hs_hash, name: a.hs_name, text: '', fileId: file.id };
      tagged = true;
    } else {
      // Files with purpose=assistants cannot be downloaded through Files content.
      // Read the indexed text instead; never compare a partial response.
      const meta = await api.json(`/files/${file.id}`);
      const content = await api.json(`${base}/files/${file.id}/content`);
      if (content.has_more || !Array.isArray(content.data) || content.data.length !== 1 ||
          content.data[0]?.type !== 'text' || typeof content.data[0].text !== 'string') {
        throw new Error(t('catalog.incomplete_content', { p0: file.id }));
      }
      const text = content.data[0].text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim();
      const id = text.match(/^# ID: ([a-z0-9_-]+)\n/)?.[1];
      if (!id || !text.endsWith(`END ID: ${id}`) || !/^(technique|setting|variable|theme)-[a-f0-9]{64}\.md$/.test(meta.filename) || !meta.filename.endsWith(`${digest(id)}.md`)) {
        throw new Error(t('catalog.foreign_file', { p0: file.id }));
      }
      const local = catalog.documents.find(d => d.entryId === id && d.name === meta.filename);
      const matches = local && local.text.replace(/^\uFEFF/, '').replace(/\r\n/g, '\n').trim() === text;
      doc = { entryId: id, hash: matches ? local.hash : digest(text), name: meta.filename, text, fileId: file.id };
    }
    inventory.push({ file, doc, tagged });
  }
  const documents = catalog.documents.map(d => ({ ...d }));
  const unchanged = documents.filter(d => inventory.some(r => r.doc.entryId === d.entryId && r.doc.hash === d.hash && r.file.status === 'completed')).length;
  const removed = new Set(inventory.filter(r => !documents.some(d => d.entryId === r.doc.entryId)).map(r => r.doc.entryId)).size;
  options.status?.(t('catalog.delta', { p0: unchanged, p1: documents.length - unchanged, p2: removed }));
  let done = 0;
  for (const doc of documents) {
    const existing = inventory.find(r => r.doc.entryId === doc.entryId && r.doc.hash === doc.hash && ['completed', 'in_progress'].includes(r.file.status));
    if (existing) {
      doc.fileId = existing.file.id;
      if (!existing.tagged) await api.json(`${base}/files/${doc.fileId}`, 'POST', { attributes: attributes(doc) });
    } else {
      const uploaded = state.sync!.documents.find(d => d.entryId === doc.entryId && d.hash === doc.hash);
      doc.fileId = uploaded?.fileId;
      if (!doc.fileId) {
        doc.fileId = await api.upload(doc.name, doc.text);
        state.sync!.documents.push({ ...doc });
        await save();
      }
      const failed = inventory.find(r => r.file.id === doc.fileId && ['failed', 'cancelled'].includes(r.file.status));
      if (failed) await api.json(`${base}/files/${doc.fileId}`, 'DELETE');
      await api.json(`${base}/files`, 'POST', { file_id: doc.fileId, attributes: attributes(doc) });
    }
    if (existing?.file.status !== 'completed') {
      const deadline = Date.now() + 10 * 60_000;
      let result = await api.json(`${base}/files/${doc.fileId}`);
      while (result.status === 'in_progress') {
        if (Date.now() >= deadline) throw new Error(t('catalog.timeout'));
        await new Promise(resolve => setTimeout(resolve, 1000));
        result = await api.json(`${base}/files/${doc.fileId}`);
      }
      if (result.status !== 'completed') throw new Error(t('catalog.index_failed'));
      progress(++done, documents.length - unchanged);
    }
  }
  // All replacements are ready before removing the old searchable attachments.
  for (const item of inventory) {
    if (!documents.some(d => d.fileId === item.file.id)) await api.json(`${base}/files/${item.file.id}`, 'DELETE');
  }
  if (store.metadata?.hacksidian !== 'catalog-v1' || store.expires_after) {
    await api.json(base, 'POST', { metadata: { ...store.metadata, hacksidian: 'catalog-v1' }, expires_after: null });
  }
  const previous = state.active;
  const journal = state.sync;
  const snapshot: CatalogSnapshot = { ...catalog, documents, storeId: store.id, createdAt: new Date().toISOString() };
  state.active = snapshot;
  delete state.sync;
  // Legacy resource journals are retained; do not run destructive old store cleanup.
  if (state.pending?.storeId === store.id) delete state.pending;
  try { await save(); }
  catch (error) { state.active = previous; state.sync = journal; throw error; }
  return snapshot;
}
