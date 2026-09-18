// Isolated palette specimen shared by cards and the category gallery.
export const PALETTE_TEMPLATE = `<div id="obsidian-palette-lab"><style>
#obsidian-palette-lab{font-family:system-ui,sans-serif;color:var(--foreground);font-size:14px;line-height:1.5}
#obsidian-palette-lab *{box-sizing:border-box}
#obsidian-palette-lab [hidden]{display:none!important}
#obsidian-palette-lab .choices{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:0 0 16px}
#obsidian-palette-lab .choice{appearance:none;text-align:left;border:2px solid transparent;border-radius:7px;padding:10px;cursor:pointer;font:inherit;min-width:0}
#obsidian-palette-lab .choice[aria-pressed=true]{border-color:var(--foreground);outline:2px solid var(--background);outline-offset:-4px}
#obsidian-palette-lab .choice-bars{display:flex;height:8px;gap:3px;margin-top:8px}
#obsidian-palette-lab .choice-bars span{flex:1;border-radius:2px}
#obsidian-palette-lab .controls{display:flex;gap:14px;align-items:end;flex-wrap:wrap;margin-bottom:12px}
#obsidian-palette-lab .controls label{display:flex;gap:6px;flex-direction:column}
#obsidian-palette-lab select{max-width:100%}
#obsidian-palette-lab .meta{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin:10px 0}
#obsidian-palette-lab .workspace{border:1px solid var(--background-modifier-border);border-radius:9px;overflow:hidden;background:var(--background-primary);color:var(--text-normal);color-scheme:light}
#obsidian-palette-lab .workspace.dark{color-scheme:dark}
#obsidian-palette-lab .workspace ::selection{background:var(--text-selection)}
#obsidian-palette-lab .appbar{background:var(--background-secondary);border-bottom:1px solid var(--background-modifier-border);padding:10px 16px;display:flex;justify-content:space-between;gap:10px;color:var(--text-muted);font-size:12px}
#obsidian-palette-lab .panes{display:grid;grid-template-columns:175px minmax(0,1fr)}
#obsidian-palette-lab .sidebar{background:var(--background-secondary);border-right:1px solid var(--background-modifier-border);padding:16px 10px}
#obsidian-palette-lab .sidebar div{padding:7px 10px;color:var(--text-muted)}
#obsidian-palette-lab .sidebar .active{background:var(--background-modifier-hover);color:var(--text-normal);border-radius:5px}
#obsidian-palette-lab .note{padding:24px 32px;min-width:0}
#obsidian-palette-lab .note h2{font-size:27px;font-weight:500;line-height:1.25;margin:7px 0 18px;color:var(--text-normal)}
#obsidian-palette-lab .note h3{font-size:17px;font-weight:500;margin:22px 0 8px;color:var(--text-normal)}
#obsidian-palette-lab .note p{margin:10px 0}
#obsidian-palette-lab .note a{color:var(--text-accent);text-decoration:underline;cursor:pointer}
#obsidian-palette-lab .note a:hover{color:var(--text-accent-hover)}
#obsidian-palette-lab .note mark{background:var(--text-highlight-bg);color:var(--text-normal);padding:1px 3px}
#obsidian-palette-lab .muted{color:var(--text-muted)}
#obsidian-palette-lab .faint{color:var(--text-faint)}
#obsidian-palette-lab .callouts{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:17px 0}
#obsidian-palette-lab .callout{border-left:3px solid var(--callout-color);padding:10px 12px;background:color-mix(in oklch,var(--callout-color) 12%,var(--background-primary));border-radius:4px}
#obsidian-palette-lab .callout strong{font-weight:500;color:var(--callout-color)}
#obsidian-palette-lab .callout p{margin:3px 0;font-size:13px}
#obsidian-palette-lab .note pre{background:var(--background-secondary);padding:13px;border-radius:5px;white-space:pre-wrap;overflow-wrap:anywhere;font-size:13px;color:var(--text-normal)}
#obsidian-palette-lab .note pre code{background:transparent;color:inherit}
#obsidian-palette-lab .actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:18px}
#obsidian-palette-lab .appbutton{border:1px solid var(--background-modifier-border);border-radius:5px;background:var(--interactive-normal);color:var(--text-normal);font:inherit;padding:7px 12px;cursor:pointer}
#obsidian-palette-lab .appbutton:hover{background:var(--interactive-hover)}
#obsidian-palette-lab .appbutton.primary{background:var(--interactive-accent);color:var(--text-on-accent);border-color:transparent}
#obsidian-palette-lab .appbutton.primary:hover{background:var(--interactive-accent-hover)}
#obsidian-palette-lab .tags{display:flex;gap:8px;flex-wrap:wrap;margin:14px 0}
#obsidian-palette-lab .tag{color:var(--text-accent);background:color-mix(in oklch,var(--color-accent) 12%,transparent);padding:2px 8px;border-radius:12px;font-size:12px}
#obsidian-palette-lab .swatches{display:grid;grid-template-columns:repeat(8,minmax(0,1fr));gap:7px;margin:14px 0}
#obsidian-palette-lab .swatch{min-width:0;text-align:center;font-size:11px}
#obsidian-palette-lab .swatch i{display:block;height:19px;border-radius:3px;margin-bottom:4px}
#obsidian-palette-lab .ratios{display:flex;gap:8px 24px;flex-wrap:wrap;margin:12px 0;font-size:12px}
#obsidian-palette-lab details{margin:12px 0}
#obsidian-palette-lab summary{cursor:pointer;font-weight:500}
#obsidian-palette-lab .mapping{width:100%;border-collapse:collapse;font-size:12px;margin-top:10px;table-layout:fixed}
#obsidian-palette-lab .mapping td,#obsidian-palette-lab .mapping th{text-align:left;padding:7px 5px;border-bottom:1px solid var(--border);overflow-wrap:anywhere;font-weight:400}
#obsidian-palette-lab .mapping th{font-weight:500}
#obsidian-palette-lab .sample{display:inline-block;width:12px;height:12px;margin-right:5px;vertical-align:middle}
#obsidian-palette-lab .provenance{font-size:12px;color:var(--muted-foreground);margin:8px 0}
@container hacksidian-palette-model (max-width:640px){#obsidian-palette-lab .choices{grid-template-columns:repeat(3,minmax(0,1fr))}#obsidian-palette-lab .panes{grid-template-columns:1fr}#obsidian-palette-lab .sidebar{display:none}#obsidian-palette-lab .note{padding:18px}#obsidian-palette-lab .swatches{grid-template-columns:repeat(4,1fr)}}
@container hacksidian-palette-model (max-width:390px){#obsidian-palette-lab .choices{grid-template-columns:repeat(2,minmax(0,1fr))}#obsidian-palette-lab .callouts{grid-template-columns:1fr}}
</style><div class="workspace" aria-label="Образец цветовых ролей Obsidian">
<div class="appbar"><span>Hacksidian / Заметки</span><span id="op-mode"></span></div>
<div class="panes"><aside class="sidebar"><div>⌄ Личное пространство</div><div class="active">Цвет и внимание</div><div>Идеи на завтра</div><div>Источники</div><div>⌄ Проекты</div><div>Атлас приёмов</div></aside>
<article class="note">
<div class="muted" style="font-size:12px">17 сентября · заметка для чтения и письма</div>
<h2>Цвет и внимание</h2>
<p>Хорошая палитра держит страницу целиком: основной текст, тихие подписи, ссылки и состояния интерфейса.</p>
<p>Откройте <a href="#op-related">связанную заметку</a>, выделите текст мышью или наведите курсор на кнопку. <mark>Важное можно подсветить</mark>, сохраняя читаемость.</p>
<div class="tags"><span class="tag">#наблюдения</span><span class="tag">#цветовая-палитра</span></div>
<div class="callouts">
<div class="callout" style="--callout-color:var(--color-blue)"><strong>ⓘ Заметка</strong><p>Идея, к которой хочется вернуться.</p></div>
<div class="callout" style="--callout-color:var(--color-green)"><strong>✓ Готово</strong><p>Наблюдение сохранено в дневнике.</p></div>
<div class="callout" style="--callout-color:var(--color-orange)"><strong>△ Внимание</strong><p>У приглушённого текста свой контраст.</p></div>
<div class="callout" style="--callout-color:var(--color-red)"><strong>! Ошибка</strong><p>Не удалось найти связанную заметку.</p></div>
</div>
<h3 id="op-related">Небольшой фрагмент кода</h3>
<pre><code><span style="color:var(--color-purple)">const</span> palette = <span style="color:var(--color-green)">"согласованный набор"</span>;
<span style="color:var(--color-blue)">apply</span>(palette); <span class="faint">// второстепенный текст</span></code></pre>
<label style="display:block"><input type="checkbox" checked style="accent-color:var(--color-accent)"> Проверить заметку на светлом и тёмном фоне</label>
<div class="actions"><button class="appbutton primary" type="button" id="op-save">Сохранить заметку</button><button class="appbutton" type="button" id="op-more">Показать подпись</button><span class="muted" id="op-saved" aria-live="polite"></span></div>
<div class="faint" id="op-caption" hidden>Служебная подпись · роль --text-faint</div>
</article></div></div>
</div>`;
