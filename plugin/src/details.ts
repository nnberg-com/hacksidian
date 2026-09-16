export interface DetailColumn { title: string; content: string }
export function parseDetails(source: string): DetailColumn[] {
  const columns: DetailColumn[] = [];
  let fence: string | null = null;
  for (const line of source.split('\n')) {
    const marker = line.match(/^\s*(`{3,}|~{3,})/);
    const heading = !fence && line.match(/^>\s+(.+?)\s*$/);
    if (heading) { columns.push({ title: heading[1], content: '' }); continue; }
    if (marker) {
      if (!fence) fence = marker[1];
      else if (marker[1][0] === fence[0] && marker[1].length >= fence.length) fence = null;
    }
    if (columns.length) columns[columns.length - 1].content += line + '\n';
    else if (line.trim()) throw new Error('Начните блок со строки > Название колонки');
  }
  return columns.map(column => ({ ...column, content: column.content.trim() }));
}
