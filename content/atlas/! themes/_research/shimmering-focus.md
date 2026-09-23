# Разбор: Shimmering Focus

[[atlas/! themes/shimmering-focus|Shimmering Focus]] · [Репозиторий на момент проверки](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0)

Commit: `06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 65; документов: 5; CSS-файлов: 45; правил основного CSS разобрано: 666.

## Результат сопоставления

Новых карточек: 16; ранее существовавших приёмов с найденными подтверждениями: 14.

- Не показывать полосу единственной вкладки — новая карточка
- Выделение активной строки редактора — новая карточка
- Скрытие вложений из файлового дерева — новая карточка
- Подпись изображения из alt-текста — новая карточка
- Упрощённый заголовок Bases — новая карточка
- Относительные номера строк для Vim — новая карточка
- Скрытые URL ссылок в исходном режиме — новая карточка
- Счётчик слов только в заметках для письма — новая карточка
- Обозначение уровня заголовка в редакторе — новая карточка
- Уведомления в нижнем правом углу — новая карточка
- Широкая заметка автоматически при наличии таблицы — новая карточка
- Боковая панель поверх заметки — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Служебные элементы появляются при наведении — новая карточка
- Ширина текстовой полосы заметки — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- [[atlas/! hacks/text-indent-book/text-indent-book|Красная строка]] — существующая карточка
- [[atlas/! hacks/heading-e027/heading-e027|Прямоугольная плашка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/code-e020/code-e020|Пробелы в конце строки]] — существующая карточка
- [[atlas/! hacks/image-fluid/image-fluid|Изображение по ширине заметки]] — существующая карточка
- [[atlas/! hacks/text-selection-custom/text-selection-custom|Собственный цвет выделения мышью]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка
- [[atlas/! hacks/unordered-tree/unordered-tree|Линии вложенного плана]] — существующая карточка
- [[atlas/! hacks/metadata-no-add/metadata-no-add|Без строки добавления]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Always show tab bar | `normal-tab-bar` | Есть карточка | Подтверждено правилом CSS. Не показывать полосу единственной вкладки | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L38) |
| Hide inline title when more than one tab | `hide-inline-title-when-more-than-one-tab` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L43) |
| Left sidebar: Hide the vault switcher and settings button | `hide-vault-switcher-and-settings` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L48) |
| Re-enable suggester hints | `show-suggester-instructions` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L59) |
| Re-enable new tab button | `show-new-tab-button` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L66) |
| Re-enable tab list button | `show-tab-list-button` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L72) |
| Re-enable sidebar toggle buttons | `show-sidebar-toggle-buttons` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L79) |
| Re-enable close buttons | `show-close-buttons` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L86) |
| Show URLs of markdown links | `show-urls` | Есть карточка | Подтверждено правилом CSS. Скрытые URL ссылок в исходном режиме | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L92) |
| Hide properties count | `hide-properties-in-statusbar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L108) |
| Hide backlinks count | `hide-backlinks-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L112) |
| Hide Pane Relief focus lock | `hide-pane-relief-focus-lock-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L116) |
| Hide Language Tools icon | `hide-languagetool-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L120) |
| Hide Pandoc Reference List icon | `hide-pandoc-reference-list-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L124) |
| Hide Harper toggle icon | `hide-harper-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L128) |
| Hide the Shimmering Focus icon (⟡) | `hide-signature-icon` | Вариант оформления | Декоративная подпись темы; псевдоэлемент с символом ⟡.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L132) |
| Use normal header bar (tab title bar) | `normal-header-bar` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Служебные элементы появляются при наведении | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L144) |
| Sidebars: Overlaying right sidebar | `overlaying-right-sidebar` | Есть карточка | Подтверждено правилом CSS. Боковая панель поверх заметки | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L164) |
| Status bar requires sidebars | `hidden-sidebars-hidden-statusbar` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L171) |
| Notifications: Display at bottom right | `notices-at-bottom-right` | Есть карточка | Подтверждено правилом CSS. Уведомления в нижнем правом углу | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L176) |
| Headings: No alternating colors | `no-alternating-header-colors` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L217) |
| Headings: Disable background | `no-heading-background` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e027/heading-e027\|Прямоугольная плашка]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L222) |
| Headings: No level indicators in live preview | `no-lp-heading-level-indicator` | Есть карточка | Подтверждено правилом CSS. Обозначение уровня заголовка в редакторе | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L226) |
| Alternative color schemes | `alt-colorschemes` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L260) |
| Angular shapes | `angular-shapes` | Вариант оформления | Обнуление радиусов общих компонентов; геометрический вариант темы.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L294) |
| Uncolored bold | `uncolored-bold` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/emphasis-s02/emphasis-s02\|02 · Цветной bold]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L299) |
| Uncolored italic | `uncolored-italic` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/emphasis-s03/emphasis-s03\|03 · Цвет вместо курсива]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L305) |
| Uncolored strikethroughs | `uncolored-strikethroughs` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L311) |
| Active block indicator | `active-line-highlight` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L325) |
| readable line length | `readable-line-length-toggle` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Ширина текстовой полосы заметки | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L358) |
| Hide trailing spaces | `hide-trailing-whitespace` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/code-e020/code-e020\|Пробелы в конце строки]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L363) |
| Images: No alt-text as caption | `no-image-alttext-caption` | Есть карточка | Подтверждено правилом CSS. Подпись изображения из alt-текста | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L379) |
| between reduced and full image size | `max-image-size-toggle` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/image-fluid/image-fluid\|Изображение по ширине заметки]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L396) |
| Automatically disable `readable line length` on notes with tables | `unrestricted-line-length-tables` | Есть карточка | Подтверждено правилом CSS. Широкая заметка автоматически при наличии таблицы | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L401) |
| Relative line numbers | `use-relative-line-numbers` | Есть карточка | Подтверждено правилом CSS. Относительные номера строк для Vim | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L424) |
| Cursorline | `vim-active-visual-line` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L430) |
| Disable tooltips & "Edit this block" button | `no-mouse-hovers` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L439) |
| Status bar: Show word count only when longform/writing note is open | `wordcount-only-when-writing` | Есть карточка | Подтверждено правилом CSS. Счётчик слов только в заметках для письма | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L482) |
| Status bar: Hide longform wordcount | `hide-longform-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L487) |
| Tasks: Use gray instead of normal text color | `longform-tasks-different` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L493) |
| Left-aligned text | `longform-left-aligned` | Типографический параметр | Выключка текста: по ширине с переносами либо по левому краю.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L498) |
| First-line indent & no spacing between paragraphs (reading mode) | `longform-text-indent` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/text-indent-book/text-indent-book\|Красная строка]] | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L503) |
| File explorer: Hide attachments folders | `hide-attachment-folders` | Есть карточка | Подтверждено правилом CSS. Скрытие вложений из файлового дерева | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L516) |
| File explorer: Show buttons | `show-file-explorer-navigation` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L521) |
| Bookmarks: Show buttons in sidebar | `show-bookmark-controls` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L528) |
| Bookmarks: Show icons in sidebar | `show-bookmark-icons` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L535) |
| Normal outgoing links and backlinks | `normal-out-back-links` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L542) |
| Use normal inline backlinks | `classic-inline-backlinks` | Вариант оформления | Обычный или компактный блок обратных ссылок; отступы и типографика списка.  | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L549) |
| Outline: Show buttons in sidebar | `show-outline-buttons` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L556) |
| Bases: Hide column header icons | `bases-hide-column-header-icons` | Есть карточка | Подтверждено правилом CSS. Упрощённый заголовок Bases | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L563) |
| Various complements: Show completion source icon | `show-various-complements-icon` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/chrisgrieser/shimmering-focus/blob/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/theme.css#L567) |

## Документация в репозитории

- [.github/pull_request_template.md](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/.github/pull_request_template.md) — Checklist
- [Changelog.md](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/Changelog.md)
- [README.md](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/README.md) — Shimmering Focus ⟡ <!-- rumdl-disable-line MD063 -->; Table of contents; General information; Design philosophy; Features; Commands; Advanced customization; Create your own color scheme; Standalone snippets; Contribute to the theme; Credits; Licenses; Thanks; About the creator
- [assets/promo-note.md](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/assets/promo-note.md) — Lorem Ipsum; Cras iaculis dignissim; Libero, et lobortis nisl; Dolor sit amet
- [source/INFO-dont-save-css-files-at-this-level.md](https://github.com/chrisgrieser/shimmering-focus/tree/06a5b0784d91e8862d3f6502c4e48b5bf2cc0fa0/source/INFO-dont-save-css-files-at-this-level.md) — INFO; Explanation

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
