import { hasHack } from './hacks';
import type { ModularStyle } from './style-modules';
export function enabledTechniquePaths(files: Array<{path: string}>, atlasFolder: string, style: ModularStyle | undefined): string[] {
  const root = atlasFolder.replace(/\/+$/, '') + '/! hacks/';
  return files.filter(file => {
    if (!file.path.startsWith(root)) return false;
    const parts = file.path.split('/'), filename = parts.pop()!, id = parts.pop()!;
    return filename === `${id}.md` && hasHack(style, id);
  }).map(file => file.path).sort();
}
