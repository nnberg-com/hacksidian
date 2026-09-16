# Разбор: PLN

[[atlas/! themes/pln|PLN]] · [Репозиторий на момент проверки](https://github.com/pipeittodevnull/PLN/tree/85a60c8340ab74668f4c12e92f020aaacc122b8d)

Commit: `85a60c8340ab74668f4c12e92f020aaacc122b8d`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 14; документов: 3; CSS-файлов: 7; правил основного CSS разобрано: 311.

## Результат сопоставления

Новых карточек: 21; ранее существовавших приёмов с найденными подтверждениями: 11.

- Полоса вкладок раскрывается в несколько строк — новая карточка
- Компактные закреплённые вкладки — новая карточка
- Защита значка закрепления от случайного нажатия — новая карточка
- Выделение активной строки редактора — новая карточка
- Маркер строки под указателем — новая карточка
- Скрытие вложений из файлового дерева — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Скрытие первого заголовка внутри вставленной заметки — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Скрытые свойства в режиме чтения — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Пустые свойства без текста-подсказки — новая карточка
- Значения свойства отдельными строками — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Дополнительный наклон курсивного текста — новая карточка
- Согласованный набор значков интерфейса — новая карточка
- Размеры и перекрытие панелей в стопке вкладок — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Скрытие отдельных типов примечаний — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/table-e034/table-e034|Подсветка строки]] — существующая карточка
- [[atlas/! hacks/metadata-no-heading/metadata-no-heading|Без заголовка Properties]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/table-e033/table-e033|Вертикальные заголовки]] — существующая карточка
- [[atlas/! hacks/table-e021/table-e021|Иерархия первой колонки]] — существующая карточка
- [[atlas/! hacks/link-e004/link-e004|Только цвет — без линии]] — существующая карточка
- [[atlas/! hacks/note-highlight/note-highlight|Маркер за важным текстом]] — существующая карточка
- [[atlas/! hacks/tag-e022/tag-e022|Контурная капсула]] — существующая карточка
- [[atlas/! hacks/table-e072/table-e072|Карточки с фиксированными подписями]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/table-e027/table-e027|Компактная таблица по центру]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| More italic italics | `pln-italics` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Дополнительный наклон курсивного текста | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L301) |
| Link modifications | `pln-link-mods` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/link-e004/link-e004\|Только цвет — без линии]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L313) |
| Highlight (mark) modifications | `pln-hilite-mods` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-highlight/note-highlight\|Маркер за важным текстом]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L319) |
| Highlight active line | `pln-hi-line` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L325) |
| Highlight cursor line | `pln-hi-line-hover` | Есть карточка | Подтверждено правилом CSS. Маркер строки под указателем | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L331) |
| Highlight table rows when hovering | `pln-hi-tr` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/table-e034/table-e034\|Подсветка строки]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L337) |
| Enable hidden directories and files | `pln-hide-files` | Есть карточка | Подтверждено правилом CSS. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L343) |
| Use folder icons in the file tree | `pln-folder-icons` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L349) |
| Dataview modifications | `pln-dv-mods` | Вариант оформления | Компактные списки Dataview: отступы и видимость служебных элементов.  | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L355) |
| Dataview list count | `pln-dv-count` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L361) |
| Invert view icons | `pln-view-invert` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Согласованный набор значков интерфейса | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L367) |
| Box tags | `pln-boxed-tags` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/tag-e022/tag-e022\|Контурная капсула]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L373) |
| Multiple tab rows | `pln-tab-rows` | Есть карточка | Подтверждено правилом CSS. Полоса вкладок раскрывается в несколько строк | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L385) |
| Prettier pinned tabs | `pln-pretty-pinned` | Есть карточка | Подтверждено правилом CSS. Компактные закреплённые вкладки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L391) |
| Protect the Pin icon | `pln-pin-protect` | Есть карточка | Подтверждено правилом CSS. Защита значка закрепления от случайного нажатия | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L397) |
| Stacked tabs 100% width | `pln-stacked-100` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Размеры и перекрытие панелей в стопке вкладок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L403) |
| Hide attachments | `pln-attachments` | Есть карточка | Подтверждено правилом CSS. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L415) |
| Unhide canvas files | `pln-attachments-canvas` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L421) |
| Unhide pdf files | `pln-attachments-pdf` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L426) |
| Unhide docx files | `pln-attachments-docx` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L431) |
| Unhide xlsx files | `pln-attachments-xlsx` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L436) |
| Unhide image files | `pln-attachments-images` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие вложений из файлового дерева | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L441) |
| Header color toggle | `pln-hdcl` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L452) |
| Hide properties in reading mode | `hide-properties` | Есть карточка | Подтверждено правилом CSS. Скрытые свойства в режиме чтения | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L506) |
| Hide properties heading | `pln-props-heading` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/metadata-no-heading/metadata-no-heading\|Без заголовка Properties]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L512) |
| Hide placeholder text | `pln-props-emptyval` | Есть карточка | Подтверждено правилом CSS. Пустые свойства без текста-подсказки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L518) |
| List 'list' properties | `pln-props-list` | Есть карточка | Подтверждено правилом CSS. Значения свойства отдельными строками | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L524) |
| Embed modifications | `pln-embd-mods` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Встроенная заметка без отдельной рамки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L536) |
| Embeded note link icon | `pln-embd-link` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L542) |
| Embeded note titles | `pln-embd-title` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без повторного заголовка | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L548) |
| Hide the first header in embeds | `pln-embd-first` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L554) |
| Hide H1 in embeds | `pln-embd-h1` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L560) |
| Hide H2 in embeds | `pln-embd-h2` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L566) |
| Hide H3 in embeds | `pln-embd-h3` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L572) |
| Hide H4 in embeds | `pln-embd-h4` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L578) |
| Hide H5 in embeds | `pln-embd-h5` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L584) |
| Hide H6 in embeds | `pln-embd-h6` | Есть карточка | Подтверждено правилом CSS. Скрытие первого заголовка внутри вставленной заметки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L590) |
| Removals toggle | `pln-rm-mods` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L602) |
| Remove folder nav | `pln-rm-folder-nav` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L608) |
| Remove settings pane | `pln-rm-settings` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L614) |
| Remove sidebar indicators | `pln-rm-rside` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L620) |
| Remove mod top left | `pln-rm-win-lside-tl` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L626) |
| Remove statusbar | `pln-rm-status` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L632) |
| Remove tablist icon | `pln-rm-tablist` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L638) |
| Remove new tab icon | `pln-rm-nt` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L644) |
| Remove close icon | `pln-rm-clstab` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L650) |
| Remove nav icons | `pln-rm-nav` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L656) |
| Remove view actions | `pln-rm-act` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L662) |
| Remove note icon | `pln-rm-noteic` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L668) |
| Remove scroll bars | `pln-rm-scroll` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L674) |
| Hide top bar in MacOS | `pln-rm-mac-tside` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L680) |
| Hide search help | `pln-rm-srchSug` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L686) |
| Custom Checkboxes | `pln-checkboxes` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L698) |
| Hide Meta callout in reading mode | `pln-rm-co-meta` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие отдельных типов примечаний | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L710) |
| Hide Meta callout in PDF exports | `pln-pdf-rm-co-meta` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие отдельных типов примечаний | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L716) |
| Hide Links callout in reading mode | `pln-rm-co-links` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие отдельных типов примечаний | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L722) |
| Hide Links callout in PDF exports | `pln-pdf-rm-co-links` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытие отдельных типов примечаний | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L728) |
| Hide Remove sort icon | `pln-cards-sort` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L740) |
| Card border edits | `pln-cards-borders` | Вариант оформления | Фон и асимметричные границы карточек данных.  | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L746) |
| Add cards class to all files, and allow export. | `cards` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/table-e072/table-e072\|Карточки с фиксированными подписями]] | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L760) |
| High contrast toggle | `pln-vision` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/pipeittodevnull/PLN/blob/85a60c8340ab74668f4c12e92f020aaacc122b8d/theme.css#L772) |

## Документация в репозитории

- [LICENSE.md](https://github.com/pipeittodevnull/PLN/tree/85a60c8340ab74668f4c12e92f020aaacc122b8d/LICENSE.md)
- [README.md](https://github.com/pipeittodevnull/PLN/tree/85a60c8340ab74668f4c12e92f020aaacc122b8d/README.md) — PLN (Pipe Loves Nord); Overview; Colours; Unique changes in this theme; Notable basics; Embeds; Dataview; Custom checkboxes (Requires Style Settings community plugin); Unique tables; Examples from the image; Tab related Style Settings; Prettier pinned tabs; Protect the Pin icon; Stacked tabs 100% width; Multi-row tabs; Callouts; Calendar plugin; Highlights and text colours; CSS Classes; hide-properties; lock; Bonus; FAQ; Why remove things when [Kepano's Hider](https://github.com/kepano/obsidian-hider) exists?; How do you have columns?
- [StyleSettings.md](https://github.com/pipeittodevnull/PLN/tree/85a60c8340ab74668f4c12e92f020aaacc122b8d/StyleSettings.md) — Style Settings; Colours; Font modifications; General modifications; Tab modifications; Header colors; Properties modifications; Embed modifications; Removals; Checkbox modifications; Callout modifications; Kepano Cards modificationss; High contrast modifications

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
