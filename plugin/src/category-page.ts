/** Paths relative to the atlas root, shared by navigation and catalog checks. */
export function categoryPage(category: string): string {
  return category.startsWith('plugin-')
    ? `! plugins/${category.slice('plugin-'.length)}.md`
    : `! categories/${category}.md`;
}
