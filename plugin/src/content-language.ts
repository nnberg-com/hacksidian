import type { Language } from '../i18n';

/** Prefer the shared article-only playground; support older localized vaults. */
export function selectColoringPaths(paths: string[], root: string, language: Language): string[] {
  const base = `${root.replace(/\/+$/, '')}/`;
  const articles = paths.filter(path => path.startsWith(base) && /^p\d+\.md$/.test(path.slice(base.length))
    && Number(path.slice(base.length + 1, -3)) > 0);
  if (articles.length) return articles;
  const prefix = `${base}${language}/`;
  return paths.filter(path => path.startsWith(prefix) && path.endsWith('.md')
    && !path.slice(prefix.length).includes('/') && !['ru.md', 'en.md', 'playground.md', 'p000.md'].includes(path.slice(prefix.length)));
}
