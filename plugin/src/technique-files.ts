export function techniqueDirectory(sourcePath: string, id: string): string {
  const root = sourcePath.match(/^(.*(?:^|\/)atlas)\//)?.[1];
  if (!root || !/^[a-z0-9][a-z0-9-]*$/.test(id)) throw new Error('Некорректный код приёма');
  return sourcePath.endsWith(`/${id}.md`) ? sourcePath.slice(0, sourcePath.lastIndexOf('/')) : `${root}/! hacks/${id}`;
}
export async function readTechniqueSource(adapter: {exists(path: string): Promise<boolean>; read(path: string): Promise<string>}, directory: string, kind: 'css' | 'markdown'): Promise<string | null> {
  const path = `${directory}/${kind === 'css' ? 'recipe.css' : 'markdown.md'}`;
  return await adapter.exists(path) ? adapter.read(path) : null;
}
