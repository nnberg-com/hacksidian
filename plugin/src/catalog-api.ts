import { requestUrl } from 'obsidian';
import { t } from '../i18n';
import type { CatalogResources, CatalogState, CatalogSnapshot, buildCatalog } from './catalog';

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

// All created resources are journaled before the next mutation. The active
// snapshot changes only after every file has finished indexing.
export async function syncCatalog(api: CatalogApi, state: CatalogState, catalog: ReturnType<typeof buildCatalog>, save: () => Promise<void>, progress: (done: number, total: number) => void): Promise<CatalogSnapshot> {
  if (state.pending) { state.garbage.push(state.pending); delete state.pending; await save(); }
  await cleanCatalogGarbage(api, state, save);
  if (state.active?.revision === catalog.revision) {
    try {
      const remote = await api.json(`/vector_stores/${state.active.storeId}`);
      if (remote.status === 'completed') return state.active;
    } catch (error) { if ((error as {status?:number}).status !== 404) throw error; }
  }
  const store = await api.json('/vector_stores', 'POST', { name: `Hacksidian ${catalog.revision.slice(0,12)}`, expires_after: { anchor: 'last_active_at', days: 30 } });
  if (!store.id) throw new Error('OpenAI: missing vector store ID');
  state.pending = { storeId: store.id, fileIds: [] }; await save();
  const previous = state.active;
  const documents = catalog.documents.map(doc => ({ ...doc }));
  try {
    let done = 0;
    for (let start = 0; start < documents.length; start += 4) {
      // Wait for every in-flight upload even after failure so none escape the journal.
      const results = await Promise.allSettled(documents.slice(start, start + 4).map(async doc => {
        const reused = previous?.documents.find(old => old.name === doc.name && old.hash === doc.hash);
        doc.fileId = reused?.fileId ?? await api.upload(doc.name, doc.text);
        if (!reused?.fileId) { state.pending!.fileIds.push(doc.fileId!); await save(); }
        progress(++done, documents.length);
      }));
      const failure = results.find(result => result.status === 'rejected');
      if (failure?.status === 'rejected') throw failure.reason;
    }
    const batch = await api.json(`/vector_stores/${store.id}/file_batches`, 'POST', { file_ids: documents.map(doc => doc.fileId) });
    if (!batch.id) throw new Error('OpenAI: missing indexing batch ID');
    let status = batch;
    const deadline = Date.now() + 10 * 60_000;
    while (status.status === 'in_progress') {
      if (Date.now() > deadline) throw new Error(t('catalog.timeout'));
      await new Promise(resolve => setTimeout(resolve, 1000));
      status = await api.json(`/vector_stores/${store.id}/file_batches/${batch.id}`);
    }
    if (status.status !== 'completed' || status.file_counts?.failed || status.file_counts?.cancelled) throw new Error(t('catalog.index_failed'));
    const snapshot: CatalogSnapshot = { ...catalog, documents, storeId: store.id, createdAt: new Date().toISOString() };
    if (previous) state.garbage.push({ storeId: previous.storeId, fileIds: previous.documents.filter(old => !documents.some(doc => doc.fileId === old.fileId)).map(doc => doc.fileId!) });
    state.active = snapshot; delete state.pending;
    try { await save(); } catch (error) { state.active = previous; state.pending = { storeId: store.id, fileIds: documents.filter(doc => !previous?.documents.some(old => old.fileId === doc.fileId)).map(doc => doc.fileId!) }; state.garbage = state.garbage.filter(item => item.storeId !== previous?.storeId); throw error; }
    await cleanCatalogGarbage(api, state, save);
    return snapshot;
  } catch (error) {
    // Keep the journal for retry/cleanup, and keep the previous working snapshot.
    await save();
    throw error;
  }
}

export async function cleanCatalogGarbage(api: CatalogApi, state: CatalogState, save: () => Promise<void>): Promise<void> {
  for (const resource of [...state.garbage]) {
    try {
      if (resource.storeId === state.active?.storeId) continue;
      await api.json(`/vector_stores/${resource.storeId}`, 'DELETE');
      const obsolete = resource.fileIds.filter(id => !state.active?.documents.some(doc => doc.fileId === id));
      for (let start = 0; start < obsolete.length; start += 4) {
        const results = await Promise.allSettled(obsolete.slice(start, start + 4).map(id => api.json(`/files/${id}`, 'DELETE')));
        const failure = results.find(result => result.status === 'rejected');
        if (failure?.status === 'rejected') throw failure.reason;
      }
      state.garbage.splice(state.garbage.indexOf(resource), 1); await save();
    } catch { /* Persisted garbage is retried next update; never lose resource IDs. */ }
  }
}
