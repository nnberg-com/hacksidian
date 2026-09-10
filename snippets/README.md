# Базовые сниппеты Hacksidian

Одна группа — один CSS-файл — один набор переменных. Сейчас 22 группы: 19 групп разметки и три служебные (`interface`, `meta`, `palette`). Новые служебные группы созданы без дополнительных приёмов и без навязывания новых значений настроек. Некоторые базовые файлы пока содержат только место для будущих правил.

`hacksidian-manifest.json` связывает ID группы, модуль, файл и набор штатных переменных Obsidian (`nativeVariables`). Реальные значения собственных переменных находятся в самом CSS группы: `--hs-<group>-…`; общие цвета — в `palette` (`--cmr-color-*`). Набор штатных переменных — перечень точек настройки, а не безусловное переопределение темы.

Образцы в этой папке входят в сборку плагина. Рабочие копии находятся в `<vault>/<configDir>/snippets`. При первом запуске создаются отсутствующие копии; обновление старого набора из десяти файлов разделяет именно рабочие значения, затем удаляет старые файлы. Исторические снимки Undo также переводятся в новую структуру. Чат и настройки остаются в данных плагина.

Область существующего оформления: Reading view заметок с `cssclasses: callmered-coloring`. Шаблоны приёмов отдельно задают поддержку Reading/Live Preview. Палитра пока сохраняет прежние цвета; введение группы не меняет существующую светлую/тёмную схему.

| Группа | Базовый файл |
| --- | --- |
| Палитра и темы (`palette`) | `hacksidian-00-palette.css` |
| Платформы и метанастройки (`meta`) | `hacksidian-01-meta.css` |
| Интерфейс Obsidian (`interface`) | `hacksidian-02-interface.css` |
| Заметка (`note`) | `hacksidian-03-note.css` |
| Текст (`text`) | `hacksidian-04-text.css` |
| Заголовки (`heading`) | `hacksidian-05-heading.css` |
| Горизонтальные разделители (`hr`) | `hacksidian-06-hr.css` |
| Ссылки (`link`) | `hacksidian-07-link.css` |
| Выделения (`emphasis`) | `hacksidian-08-emphasis.css` |
| Строчный код (`inline-code`) | `hacksidian-09-inline-code.css` |
| Теги (`tag`) | `hacksidian-10-tag.css` |
| Списки (`list`) | `hacksidian-11-list.css` |
| Задачи (`task`) | `hacksidian-12-task.css` |
| Псевдозадачи (`pseudo-task`) | `hacksidian-13-pseudo-task.css` |
| Цитаты (`quote`) | `hacksidian-14-quote.css` |
| Callout-блоки (`callout`) | `hacksidian-15-callout.css` |
| Таблицы (`table`) | `hacksidian-16-table.css` |
| Блоки кода (`code`) | `hacksidian-17-code.css` |
| Изображения (`image`) | `hacksidian-18-image.css` |
| Встроенные страницы (`iframe`) | `hacksidian-19-iframe.css` |
| Сноски (`footnote`) | `hacksidian-20-footnote.css` |
| Свойства заметки (`metadata`) | `hacksidian-21-metadata.css` |

## Конкретный приём

Все файлы принадлежат папке `atlas/! hacks/<id>/`: карточка, `Markdown.ru.md`, `recipe.template.css`, `dependencies.template.css`, `preview.css`, `hack.json`, локальные `assets/` и необязательные модели. В `hack.json` находятся `group`, `target: g-<group>`, `atlas` и `snippet` — два набора буквальных параметров одного шаблона; при необходимости — `requirements`.

Кнопка «Применить hack» в правой панели добавляет CSS в файл группы, без LLM. Маркеры в CSS предотвращают повторное добавление. Undo убирает добавленный блок. Автоматического устранения конфликтов с другими приёмами нет: действует обычный CSS-каскад, включая `!important` в базовом стиле.
