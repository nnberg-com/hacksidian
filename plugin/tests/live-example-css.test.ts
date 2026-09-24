import { expect, test } from 'vitest';
import { liveExampleIssue, resolveLiveUrls, scopeLiveExample } from '../src/live-example-css';
const host = ':is(.markdown-preview-view, .markdown-source-view)';
test('text scopes to its root; editor selectors are omitted', () => {
 const result = scopeLiveExample('.markdown-preview-view, .markdown-source-view.mod-cm6 .cm-scroller {line-height:var(--line-height-normal)}', 'hacksidian-live-one');
 expect(result).toContain('#hacksidian-live-one');expect(result).not.toContain('.markdown-source-view');
});
test('comma lists, pseudo classes, children and descendant siblings stay inside the sample', () => {
 const result = scopeLiveExample(`${host} a:hover, ${host} p + p {color:red}`, 'hacksidian-live-two');
 expect(result).toContain('#hacksidian-live-two a:hover'); expect(result).toContain('#hacksidian-live-two p + p');
});
test('theme ancestors and conditional CSS remain effective', () => {
 const result = scopeLiveExample('@media (max-width:600px){.theme-light .markdown-preview-view p {color:var(--text-normal)}}', 'hacksidian-live-one');
 expect(result).toContain('.theme-light #hacksidian-live-one p');expect(result).toContain('@container preview (max-width:600px)');
});
test('global targets, resources, nesting and host siblings cannot escape', () => {
 for(const css of ['body {color:red}', '@import "x";', '@font-face{src:url(x)}', `${host} + p {color:red}`, `.workspace:has(${host}){color:red}`, `${host}{& a{color:red}}`]) expect(() => scopeLiveExample(css, 'hacksidian-live-one')).toThrow();
 expect(() => scopeLiveExample('', 'x,body')).toThrow();
});
test('animations and counter styles have names unique to each widget', () => {
 const css=`@keyframes blink {to{opacity:0}} @counter-style stars {system:cyclic;symbols:"*";} ${host} li{animation:blink 1s;list-style:stars}`;
 const result=scopeLiveExample(css,'hacksidian-live-one');
 expect(result).toContain('@keyframes hacksidian-live-one-blink');expect(result).toContain('animation:hacksidian-live-one-blink');
 expect(result).toContain('@counter-style hacksidian-live-one-stars');expect(result).toContain('list-style:hacksidian-live-one-stars');
});
test('local CSS assets resolve relative to the card; embedded and web URLs are preserved', () => {
 const result=resolveLiveUrls('a{background:url("assets/image.svg");mask:url(data:image/svg+xml;base64,AAAA);cursor:url(https://example.org/a)}','atlas/card',p=>'app://'+p);
 expect(result).toContain('app://atlas/card/assets/image.svg');expect(result).toContain('url(data:image/svg+xml;base64,AAAA)');expect(result).toContain('url(https://example.org/a)');
});
test('interface, model, printing and unsupported document navigation are recorded as deferred', () => {
 expect(liveExampleIssue('metadata','x','')).toBeTruthy();
 expect(liveExampleIssue('tag','hacksidian-source-model','')).toBeTruthy();
 expect(liveExampleIssue('text','x','@media print{.markdown-preview-view p{color:red}}')).toBeTruthy();
 expect(liveExampleIssue('link','x',`${host} a:target{color:red}`)).toBeNull();
 expect(liveExampleIssue('callout','> [!note] Hello','')).toBeNull();
});

test('target state stays local including targets inside has selectors',()=>{
 const css=scopeLiveExample('.markdown-preview-view .footnotes:has(li:target) li:target { outline: 2px solid red; }','hacksidian-live-target');
 expect(css).not.toContain(':target');expect(css).toContain(':has(li[data-hacksidian-target])');expect(css).toContain('#hacksidian-live-target');
});

test('page width rules stay inside a readable preview and exclude editor rules', () => {
 const result = scopeLiveExample('.markdown-preview-view.is-readable-line-width .markdown-preview-sizer, .markdown-source-view.mod-cm6.is-readable-line-width .cm-content { max-width: calc(var(--file-line-width) * 0.8); }', 'hacksidian-live-page');
 expect(result).toContain('#hacksidian-live-page.is-readable-line-width .markdown-preview-sizer');
 expect(result).not.toContain('.cm-content');
 expect(liveExampleIssue('text', 'Paragraph', '.markdown-preview-view.is-readable-line-width .markdown-preview-sizer { max-width: 40ch; }')).toBeNull();
});
