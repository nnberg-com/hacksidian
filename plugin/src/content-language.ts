import type { Language } from '../i18n';

/** Select only samples in the requested language; never silently mix languages. */
export function selectColoringPaths(paths: string[], root: string, language: Language): string[] {
  const prefix = `${root.replace(/\/+$/, '')}/${language}/`;
  return paths.filter(path => path.startsWith(prefix) && path.endsWith('.md')
    && !path.slice(prefix.length).includes('/') && !['ru.md', 'en.md', 'playground.md', 'p000.md'].includes(path.slice(prefix.length)));
}
