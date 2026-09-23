import fs from 'node:fs';
import path from 'node:path';

export function valueTable(variable, label, options, defaultValue, existing = '') {
  const current = existing.match(new RegExp(variable + ':\\s*([^;]+);'))?.[1]?.trim();
  if (current && !options.some(o => o.id === current)) throw Error(`Saved option ${current} is no longer available; migrate explicitly`);
  const keys = Object.keys(options[0].values).sort().join('\n');
  if (options.some(o => Object.keys(o.values).sort().join('\n') !== keys)) throw Error('Variant schemas differ');
  return `  /**\n   * @parameter ${label}\n   * @type select\n   * @default ${defaultValue}\n${options.map(o => `   * @option ${o.id} | ${o.title}`).join('\n')}\n   */\n  ${variable}: ${current || defaultValue};\n  @hacksidian-variants ${variable} {\n${options.map(o => `    @variant ${o.id} {\n${Object.entries(o.values).map(([k,v]) => `      ${k}: ${v};`).join('\n')}\n    }`).join('\n')}\n  }\n`;
}

export function writeCard(directory, id, title, category, sources, description) {
  fs.writeFileSync(path.join(directory, `${id}.md`), `---\ntags:\n  - hacksidian_technique\ntitle: ${title}\ncategory: ${category}\nsources:\n${sources.map(s => `  - ${JSON.stringify(s)}`).join('\n')}\nformat: markdown\nthemes: []\n---\n\n\`\`\`hacksidian-id\n${id}\n\`\`\`\n\n\`\`\`hacksidian-live\n${id}\n\`\`\`\n\n\`\`\`hacksidian-details\n> Зачем\n${description}\n\n> Как работает\nОдин параметр выбирает согласованные значения переменных. Все варианты используют одну CSS-структуру. На expanded-странице можно сравнить примеры и сохранить выбор; включение или обновление установленного стиля выполняется на карточке.\n\n> Ограничения\nТекущий этап поддерживает светлое оформление. Гарнитуры и базовый размер текста остаются пользовательскими. Сторонние темы и другие приёмы могут переопределять результат.\n\`\`\`\n\n\`\`\`hacksidian-sources\n${id}\n\`\`\`\n\n\`\`\`hacksidian-files\n${id}\n\`\`\`\n`);
}
export function expanded(id, title, variable, options) {
  return `# ${title}: варианты\n\n[[atlas/! hacks/${id}/${id}|Карточка приёма]]\n\nВсе примеры независимы. Просмотр не меняет выбранные параметры. «Выбрать этот вариант» сохраняет выбор; установленный стиль обновляется отдельно на карточке.\n\n${options.map(o => `## ${o.title}\n\n${o.note || ''}\n\n\`\`\`hacksidian-expanded\n${JSON.stringify({[variable]: o.id})}\n\`\`\`\n`).join('\n')}`;
}
