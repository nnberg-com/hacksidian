import { explicitlyNamedTechniques, type CatalogEntry, type CatalogSnapshot } from './catalog';

// Prefix-normalized words make inflected Russian words searchable without a
// technique-specific synonym list. Ranking proposes candidates, never actions.
const stop = new Set('the and for with that this make please так чтобы как будто сделай немного мне надо хочу можно'.split(' '));
function terms(text: string): string[] {
  return (text.toLowerCase().replace(/ё/g, 'е').match(/[\p{L}\p{N}_-]+/gu) ?? [])
    .filter(word => word.length > 2 && !stop.has(word))
    .map(word => /^[а-я]+$/.test(word) && word.length > 5 ? word.slice(0, -2) : word);
}

/** Keep authored intent and actual recipe evidence; theme provenance is not the
 * recipe's effect and must not dominate ranking just because it is verbose. */
export function recipeSearchText(entry: CatalogEntry): string {
  const research = entry.text.search(/^#{2,6} (?:Подтверждения в темах|Theme evidence)/m);
  const authored = research < 0 ? entry.text : entry.text.slice(0, research);
  const scope = entry.text.match(/^Selectors \(scope evidence\): (.*)$/m)?.[1] ?? '';
  const declarations = entry.text.match(/^Authored CSS declarations[^:]*: ([\s\S]*?)(?=\nAdjustable parameters|$)/m)?.[1] ?? '';
  return `${authored.split('\nRequirements:')[0]}\n${scope}\n${declarations}`;
}

/** Field-weighted BM25 over every applicable technique, independently of parameters. */
export function lexicalCandidates(query: string, entries: CatalogEntry[], limit = 24): CatalogEntry[] {
  const docs = entries.filter(e => e.kind === 'technique' && e.applyAvailable).map(entry => {
    const counts = new Map<string, number>();
    for (const [text, weight] of [[entry.title, 4], [entry.id.replace(/[-_]/g, ' '), 2], [recipeSearchText(entry), 1]] as const) {
      for (const word of terms(text)) counts.set(word, (counts.get(word) ?? 0) + weight);
    }
    return { entry, counts, length: [...counts.values()].reduce((sum,n) => sum+n,0) };
  });
  const queryTerms = [...new Set(terms(query))];
  const average = docs.reduce((sum, d) => sum + d.length, 0) / (docs.length || 1) || 1;
  const frequencies = new Map(queryTerms.map(term => [term, docs.filter(d => d.counts.has(term)).length]));
  return docs.map(d => ({ entry: d.entry, score: queryTerms.reduce((score, term) => {
    const count = d.counts.get(term) ?? 0, frequency = frequencies.get(term) ?? 0;
    return score + Math.log(1 + (docs.length - frequency + .5) / (frequency + .5)) *
      count * 2.2 / (count + 1.2 * (.25 + .75 * d.length / average));
  }, 0) })).filter(d => d.score > 0).sort((a,b) => b.score - a.score || a.entry.id.localeCompare(b.entry.id))
    .slice(0, limit).map(d => d.entry);
}

export interface SearchHit { file_id: string; score: number; content: Array<{type: string; text: string}> }
export function searchCandidates(catalog: CatalogSnapshot, query: string | string[], hits: SearchHit[]): CatalogEntry[] {
  const queries = typeof query === 'string' ? [query] : query;
  const byId = new Map(catalog.entries.map(e => [e.id,e]));
  const files = new Map(catalog.documents.filter(d => d.fileId).map(d => [d.fileId!, d]));
  const semantic: CatalogEntry[] = [];
  for (const hit of hits) {
    const doc = files.get(hit.file_id);
    if (!doc) throw Error('Search returned an obsolete or foreign catalog file; update the catalog.');
    const ids = doc.entryId ? [doc.entryId] : [...hit.content.map(c => c.text).join('\n').matchAll(/(?:^|\n)(?:# |END )?ID: ([a-z0-9_-]+)\b/g)].map(m => m[1]);
    for (const id of ids) {
      const entry = byId.get(id);
      if (entry?.kind === 'technique' && entry.applyAvailable && !semantic.includes(entry)) semantic.push(entry);
    }
  }
  // Preserve each formulation's top results: translation/expansion must not
  // displace a match from the original request or another independent query.
  const lexical = queries.map(q => lexicalCandidates(q, catalog.entries));
  const interleaved = Array.from({length: 24}, (_,rank) => lexical.flatMap(rows => rows[rank] ? [rows[rank]] : [])).flat();
  return [...new Map([...explicitlyNamedTechniques(queries[0] ?? '', catalog.entries), ...interleaved, ...semantic]
    .map(e => [e.id,e])).values()];
}
