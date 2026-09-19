import type { CatalogEntry } from './catalog';
import type { Recommendation } from './types';
import { parameterInputs, applyParameterDecision } from './parameter-chat';

export interface ParameterSnapshot {
  id: string; path: string; title: string; css: string;
  parameters: ReturnType<typeof parameterInputs>;
}
/** Read current local parameter fields without depending on the remote index's age. */
export async function collectRecommendationParameters(entries: CatalogEntry[], read: (path: string) => Promise<string>): Promise<ParameterSnapshot[]> {
  const candidates = entries.filter(entry => entry.kind === 'technique' && entry.applyAvailable &&
    /^[a-z0-9][a-z0-9-]*$/.test(entry.id) && entry.path.endsWith(`/! hacks/${entry.id}/${entry.id}.md`));
  const results: ParameterSnapshot[] = [];
  let next = 0;
  await Promise.all(Array.from({length: Math.min(8, candidates.length)}, async () => {
    while (next < candidates.length) {
      const entry = candidates[next++];
      try {
        const css = await read(entry.path.slice(0, entry.path.lastIndexOf('/')) + '/recipe.css');
        if (!css.includes('@parameter')) continue;
        const parameters = parameterInputs(css);
        if (parameters.length) results.push({id:entry.id,path:entry.path,title:entry.title,css,parameters});
      } catch { /* Missing or invalid local recipes remain searchable but cannot be preconfigured. */ }
    }
  }));
  return results.sort((a,b) => a.id.localeCompare(b.id));
}
export function recommendationParameterPatch(recommendations: Recommendation[], snapshots: ParameterSnapshot[], entries: CatalogEntry[], retrievedIds: string[]) {
  const requested = recommendations.filter(item => item.parameterChanges?.length);
  if (!requested.length) return null;
  if (recommendations.length !== 1 || requested.length !== 1) return null;
  const item = requested[0];
  const entry = entries.find(entry => entry.id === item.id);
  const snapshot = snapshots.find(snapshot => snapshot.id === item.id);
  if (!entry || entry.kind !== 'technique' || !entry.applyAvailable || !retrievedIds.includes(item.id) || !snapshot || snapshot.path !== entry.path) {
    throw Error('No verified local parameters for this recommendation');
  }
  const patch = applyParameterDecision(snapshot.css, {action:'update_parameters',message:'',changes:item.parameterChanges!});
  return {snapshot, ...patch};
}
