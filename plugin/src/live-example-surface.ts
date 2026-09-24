/** Share the native reading stylesheet between isolated examples, never snippets. */
const nativeSheets = new WeakMap<Document, { source: CSSStyleSheet; copy: CSSStyleSheet }>();

export function isNativeReadingSheet(href: string | null): boolean {
  return !!href && /(?:^|\/)app\.css(?:[?#]|$)/.test(href);
}

export function previewTokens(page: CSSStyleDeclaration, body: CSSStyleDeclaration): Record<string, string> {
  const tokens: Record<string, string> = {};
  // `all: initial` does not reset custom properties across a shadow boundary.
  for (const style of [page, body]) for (let i = 0; i < style.length; i++) {
    const name = style[i];
    if (name.startsWith('--')) tokens[name] = name.startsWith('--hacksidian-')
      ? 'initial' : body.getPropertyValue(name).trim() || 'initial';
  }
  return tokens;
}

/** Outside selectors cannot reach the sample; native tokens come from the body,
 * not the surrounding note (whose enabled techniques may redefine them).
 */
export function createLiveExampleSurface(viewport: HTMLElement): HTMLElement {
  const doc = viewport.ownerDocument, win = doc.defaultView!;
  const source = Array.from(doc.styleSheets).find(sheet => isNativeReadingSheet(sheet.href));
  if (!source) throw new Error('Native Obsidian app.css is unavailable for the isolated preview');
  let cached = nativeSheets.get(doc);
  if (!cached || cached.source !== source) {
    const Sheet = (win as unknown as { CSSStyleSheet: typeof CSSStyleSheet }).CSSStyleSheet;
    const copy = new Sheet();
    copy.replaceSync(Array.from(source.cssRules, rule => rule.cssText).join('\n'));
    cached = { source, copy }; nativeSheets.set(doc, cached);
  }
  const host = doc.createElement('div');
  host.className = 'hacksidian-live-shadow'; viewport.append(host);
  const shadow = host.attachShadow({ mode: 'open' });
  shadow.adoptedStyleSheets = [cached.copy];
  // Keep body/theme ancestor selectors meaningful inside the isolated tree.
  const root = doc.createElement('body');
  root.className = doc.body.className;
  root.style.cssText = 'all:initial;display:block;font-family:var(--font-text);font-size:var(--font-text-size);line-height:var(--line-height-normal);color:var(--text-normal);';
  const tokens = previewTokens(win.getComputedStyle(viewport), win.getComputedStyle(doc.body));
  for (const [name, value] of Object.entries(tokens)) root.style.setProperty(name, value);
  shadow.append(root);
  const style = doc.createElement('style');
  style.textContent = '.hacksidian-live-sample.markdown-preview-view { height:auto; min-height:0; padding:0; overflow:visible; }';
  root.append(style);
  return root;
}
