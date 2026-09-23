# Разбор: Primary

[[atlas/! themes/primary|Primary]] · [Репозиторий на момент проверки](https://github.com/primary-theme/obsidian/tree/789c99e357d8c0049058ef358a906ea9b350fb09)

Commit: `789c99e357d8c0049058ef358a906ea9b350fb09`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 75; документов: 4; CSS-файлов: 9; правил основного CSS разобрано: 1022.

## Результат сопоставления

Новых карточек: 13; ранее существовавших приёмов с найденными подтверждениями: 8.

- Цветовые группы папок в проводнике — новая карточка
- Вложенные папки наследуют цвет раздела — новая карточка
- Выделение активной строки редактора — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Связующие линии файлового дерева — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Строка состояния появляется при наведении — новая карточка
- Лента команд появляется при наведении — новая карточка
- Служебные элементы появляются при наведении — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- [[atlas/! hacks/meta-reduced-motion/meta-reduced-motion|Уважать уменьшение движения]] — существующая карточка
- [[atlas/! hacks/link-e004/link-e004|Только цвет — без линии]] — существующая карточка
- [[atlas/! hacks/note-selection/note-selection|Собственный цвет выделения мышью]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/tag-e064/tag-e064|Радуга по позиции]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Remove Jumpy Tab Animations | `zero-tab-anim` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/meta-reduced-motion/meta-reduced-motion\|Уважать уменьшение движения]] | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L370) |
| Remove Popup and Pop Down Animations | `zero-popup-popdown` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/meta-reduced-motion/meta-reduced-motion\|Уважать уменьшение движения]] | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L374) |
| Remove Popup Background Blur | `zero-popup-blur` | Есть карточка | Подтверждено правилом CSS. Размытие фона за всплывающими панелями | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L378) |
| Ribbon Style | `ribbon_styles` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Лента команд появляется при наведении | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L389) |
| Editor Background Type | `interface_editor-bg` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L457) |
| File Header | `editor-file-header` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Служебные элементы появляются при наведении | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L510) |
| Toggle Active Line Highlighting | `active-line-highlight` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L560) |
| Status Bar Style | `interface_status-bar-style` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Строка состояния появляется при наведении | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L580) |
| Status Bar Item Visibility | `interface_status-bar-item-display` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L602) |
| Vertically Align Header to Center | `h1-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L882) |
| Vertically Align Header to Center | `h2-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1015) |
| Vertically Align Header to Center | `h3-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1148) |
| Vertically Align Header to Center | `h4-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1281) |
| Vertically Align Header to Center | `h5-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1414) |
| Vertically Align Header to Center | `h6-vt-align-center` | Типографический параметр | Симметричные вертикальные отступы строки заголовка в редакторе; поправка выравнивания подложки.  | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1547) |
| Remove Link Underline | `no-decor-link` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/link-e004/link-e004\|Только цвет — без линии]] | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L1782) |
| Hide Note Embed Title | `embed-hide-title` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без повторного заголовка | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2329) |
| Toggle using Folders as Collapse Indicators | `alt-folder-icons` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2595) |
| Toggle Colored Folder Text | `colorful-folders_text` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2600) |
| Toggle Colored Folder Collapse Indicators | `colorful-folders_collapse-indicator` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Цветовые группы папок в проводнике | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2605) |
| Toggle Colored Folder Backgrounds | `colorful-folders_background` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Цветовые группы папок в проводнике | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2610) |
| Toggle Colored Folder Colored Indentation Guide | `colorful-folders_indentation-guide` | Есть карточка | Подтверждено правилом CSS. Связующие линии файлового дерева | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2615) |
| Toggle to Inherit Parent Folder Colors | `colorful-folders_inherit-color` | Есть карточка | Подтверждено правилом CSS. Вложенные папки наследуют цвет раздела | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L2620) |
| Custom Bookmarks Folders | `colorful-folders_different-bookmark-colors` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Цветовые группы папок в проводнике | [код](https://github.com/primary-theme/obsidian/blob/789c99e357d8c0049058ef358a906ea9b350fb09/theme.css#L3193) |

## Документация в репозитории

- [.github/CODE_OF_CONDUCT.md](https://github.com/primary-theme/obsidian/tree/789c99e357d8c0049058ef358a906ea9b350fb09/.github/CODE_OF_CONDUCT.md) — Contributor Covenant Code of Conduct; Our Pledge; Our Standards; Enforcement Responsibilities; Scope; Enforcement; Enforcement Guidelines; 1. Correction; 2. Warning; 3. Temporary Ban; 4. Permanent Ban; Attribution
- [.github/PULL_REQUEST_TEMPLATE.md](https://github.com/primary-theme/obsidian/tree/789c99e357d8c0049058ef358a906ea9b350fb09/.github/PULL_REQUEST_TEMPLATE.md) — 📕 Description; 🔖 Type of change; ✅ Checklist
- [.github/old_README.md](https://github.com/primary-theme/obsidian/tree/789c99e357d8c0049058ef358a906ea9b350fb09/.github/old_README.md) — Primary 🟨🟥🟦; 🚧 Primary is currently undergoing a 2.0 Rebuild; 📖 Table of Contents; 👁️ Goals; ⭐ Supported Plugins; ❓ How to Use Primary; ⚒️ Customizing Primary through Style Settings; ✅ Alternative Checkboxes; ⏹️ Exclusive Callouts; Gradient Party Callouts; Thinking Callouts; Meditation Callouts; 💯 Progress Bars; 🖼️ Screenshots; 🧠 Creating Primary; ❤️ Credits
- [README.md](https://github.com/primary-theme/obsidian/tree/789c99e357d8c0049058ef358a906ea9b350fb09/README.md) — 🧭 Navigation
; 🖼️ Previews
; Light Mode
; Desktop
; Tablet
; Mobile
; Dark Mode
; Desktop
; Tablet
; Mobile
; 🍭 Design Approach
; 🌞 Principles
; Opinionated but Open
; Functional Design
; Balance of Aesthetic and Optimization
; Top quality. Know you're in good hands.
; A Collection of Fashion Houses
; 📖 Installation
; Install Official Release
; Install Beta Version
; 🧸 Features, Customization, and Plugins
; 🚧 Disclaimer
; 🌺 Contributing
; Non-developers
; Developers
; Build Instructions
; Setting up your Theme Dev Environment
; Code, Build and Test
; License
; 🧠 Creating Primary
; 🩵 Credits

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
