const labels: Record<string, string> = {sh:'Shell',bash:'Shell',shell:'Shell',js:'JavaScript',javascript:'JavaScript',ts:'TypeScript',typescript:'TypeScript',py:'Python',python:'Python',cpp:'C++',c:'C',css:'CSS',html:'HTML',markup:'HTML',json:'JSON',yaml:'YAML',yml:'YAML',md:'Markdown',markdown:'Markdown',lua:'Lua',awk:'AWK',gawk:'AWK',kconfig:'Kconfig'};
export function codeLanguageLabel(classes: string): string {
  const token = classes.split(/\s+/).find(value => /^language-[\w+-]+$/.test(value));
  if (!token) return '';
  const language = token.slice(9);
  return labels[language.toLowerCase()] ?? language;
}
export function prepareCodeLanguageLabels(root: HTMLElement): void {
  const nodes = Array.from(root.querySelectorAll<HTMLElement>('pre > code'));
  if (root.matches('pre > code')) nodes.push(root);
  for (const node of nodes) {
    const label = codeLanguageLabel(node.className);
    if (label) node.setAttribute('data-hacksidian-language', label);
    else node.removeAttribute('data-hacksidian-language');
  }
}
