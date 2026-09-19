import { TFile, type Vault } from 'obsidian';
import { updateParameter } from './parameters';
const queues = new WeakMap<Vault, Map<string, Promise<void>>>();
export function pendingParameters(vault: Vault, path: string): Promise<void> {
  return queues.get(vault)?.get(path) ?? Promise.resolve();
}
export function saveParameter(vault: Vault, path: string, variable: string, input: string, expected: string): Promise<void> {
  return processParameterSource(vault, path, css => updateParameter(css, variable, input, expected));
}

export function processParameterSource(vault: Vault, path: string, update: (css: string) => string): Promise<void> {
  let paths = queues.get(vault);
  if (!paths) { paths = new Map(); queues.set(vault, paths); }
  const operation = (paths.get(path) ?? Promise.resolve()).catch(() => {}).then(async () => {
    const file = vault.getAbstractFileByPath(path);
    if (!(file instanceof TFile)) throw Error('CSS file not found');
    await vault.process(file, update);
  });
  paths.set(path, operation);
  // Keep only active writes. A past conflict must not permanently block Apply.
  const settled = () => { if (paths!.get(path) === operation) paths!.delete(path); };
  void operation.then(settled, settled);
  return operation;
}
