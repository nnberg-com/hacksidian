import {test,expect} from 'vitest';
import {parse} from 'yaml';
import {formatCard,themeCode} from '../../tools/card-format.mjs';
test('simplifies card metadata, retains explanations and preserves executable sample blocks',()=>{
 const input=`---
tags: [atlas/technique, atlas/link]
category: link
id: link-e023
title: Волнистая линия
group: Подчёркивание
source_anchor: e023
example: Markdown.ru.md
template: recipe.css
interactive: false
language: ru
translation_status: complete
digest: [todo]
Встречается в темах: ["[[atlas/! themes/minimal|Minimal]]"]
sources: [https://example.org/source]
---
# Волнистая линия
[Открыть Markdown-пример](./Markdown.ru.md) · [CSS приёма](./recipe.css) · [[atlas|Атлас]]
## Живой пример в Obsidian
\`\`\`hacksidian-live
link-e023
\`\`\`
## Пояснения из HTML-атласа
Как. text-decoration-style:wavy задаёт форму подчёркивания.

Зачем. Выделить ссылки волнистой линией.
## Источники
[Автор](https://example.org/source)
## Данные исходного каталога
\`\`\`json
{"id":"e023"}
\`\`\`
## Исходный пример
\`\`\`md
# Heading inside sample
## Зачем
Sample text
\`\`\`
`;
 const result=formatCard(input);const meta=parse(result.markdown.split('---')[1]);
 expect(Object.keys(meta).slice(0,2)).toEqual(['tags','title']);
 expect(meta).toEqual({tags:['hacksidian_technique','hacksidian_link'],title:'Волнистая линия',category:'link',sources:['https://example.org/source'],themes:['minimal']});
 expect(result.markdown).toContain('- **Зачем:**\n\n  Выделить ссылки волнистой линией.');
 expect(result.markdown).toContain('text-decoration-style:wavy');
 expect(result.markdown).toContain('```hacksidian-live\nlink-e023\n```');
 expect(result.markdown).toContain('# Heading inside sample\n## Зачем\nSample text');
 expect(result.markdown).not.toContain('# Волнистая линия');
 expect(result.markdown).not.toContain('Пояснения из HTML-атласа');
 expect(result.markdown).not.toContain('Открыть Markdown-пример');
 expect(result.provenance.removedProperties.source_anchor).toBe('e023');
 expect(result.provenance.sections['Данные исходного каталога']).toContain('e023');
 expect(formatCard(result.markdown,result.provenance)).toEqual(result);
});
test('does not duplicate explanations already expressed under headings',()=>{
 const input='---\ntags: [atlas/technique]\ntitle: Example\n---\n## Зачем\nUseful effect\n## Как работает\nMechanism\n## Ограничения исходного приёма\nLimits\n## Пояснения из HTML-атласа\nЗачем. Useful effect\n\nКак. Mechanism';
 const {markdown}=formatCard(input);
 expect(markdown.match(/Useful effect/g)).toHaveLength(1);
 expect(markdown).toContain('- **Ограничения:**\n\n  Limits');
});
test('theme codes cannot resolve arbitrary paths',()=>{
 expect(themeCode('minimal')).toBe('minimal');
 expect(themeCode('[[atlas/! themes/minimal.md|Minimal]]')).toBe('minimal');
 expect(()=>themeCode('../private')).toThrow();
});
