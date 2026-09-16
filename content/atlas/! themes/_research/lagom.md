# Разбор: Lagom

[[atlas/! themes/lagom|Lagom]] · [Репозиторий на момент проверки](https://github.com/leslyecream/Lagom-Obsidian-Theme/tree/826c84596d013ca1cd61cf144f7996e688df0ee4)

Commit: `826c84596d013ca1cd61cf144f7996e688df0ee4`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 4; документов: 1; CSS-файлов: 2; правил основного CSS разобрано: 261.

## Результат сопоставления

Новых карточек: 9; ранее существовавших приёмов с найденными подтверждениями: 16.

- Встроенная заметка без повторного заголовка — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Файловый проводник как всплывающая панель — новая карточка
- Панели рабочего пространства отдельными карточками — новая карточка
- Защита названия заметки от случайного клика — новая карточка
- Значения свойств в виде капсул — новая карточка
- Разделители файлов в корне хранилища — новая карточка
- Выделение активной строки редактора — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- [[atlas/! hacks/note-code-wrap/note-code-wrap|Длинные строки с переносом]] — существующая карточка
- [[atlas/! hacks/image-e028/image-e028|Чёрно-белая]] — существующая карточка
- [[atlas/! hacks/note-magazine/note-magazine|Текст в двух колонках]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e005/heading-e005|Прописные с разрядкой]] — существующая карточка
- [[atlas/! hacks/image-e019/image-e019|Приподнятая карточка]] — существующая карточка
- [[atlas/! hacks/note-quote-line/note-quote-line|Классическая цитата с линией]] — существующая карточка
- [[atlas/! hacks/note-code-scroll/note-code-scroll|Длинные строки с прокруткой]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/code-e018/code-e018|Мягкий перенос]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/image-e015/image-e015|Тонкая рамка]] — существующая карточка
- [[atlas/! hacks/note-list-tree/note-list-tree|Линии вложенного плана]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Style Page | `page-style-read-mode` | Есть карточка | В этой теме карточкой выглядит область отдельной заметки: рамка, поля и тень; это не весь layout приложения. Панели рабочего пространства отдельными карточками | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2487) |
| Style Page (Editor) | `page-style-editor-mode` | Есть карточка | В этой теме карточкой выглядит область отдельной заметки: рамка, поля и тень; это не весь layout приложения. Панели рабочего пространства отдельными карточками | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2493) |
| Inline title separator | `enable-inline-title-separator` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2632) |
| Magazine style | `magazine-style` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/note-magazine/note-magazine\|Текст в двух колонках]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2638) |
| Block Inline Title | `block-title-read-mode` | Есть карточка | Название настройки говорит о full-width block, но фактическое правило только pointer-events:none. В карточке отражено действие CSS. Защита названия заметки от случайного клика | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2663) |
| Uppercase lock | `inline-title-always-uppercase` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/heading-e005/heading-e005\|Прописные с разрядкой]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2701) |
| Wrap code (Read mode) | `wrap-code-blocks` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/note-code-wrap/note-code-wrap\|Длинные строки с переносом]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2713) |
| Hide  embed title | `hide-embed-title` | Есть карточка | Подтверждено правилом CSS. Встроенная заметка без повторного заголовка | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2925) |
| Enable shadows and borders | `enable-shadows-borders-img` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/image-e019/image-e019\|Приподнятая карточка]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2957) |
| Grayscale images | `grayscale-dark-mode` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/image-e028/image-e028\|Чёрно-белая]] | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L2963) |
| Pill-style alias | `pill-style-alias` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Значения свойств в виде капсул | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L3005) |
| Glass effect | `nav-bar-blur` | Есть карточка | Подтверждено правилом CSS. Размытие фона за всплывающими панелями | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L3083) |
| Enable icon file | `enable-icon-file` | Переключатель не подтверждён CSS | В настройках ID есть, но ни ID, ни значения class-select не используются в CSS после удаления комментариев. Не выдаём этот переключатель за реализованную возможность текущего commit.  | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L3107) |
| Hide separator on root files | `disable-root-file-lines` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Разделители файлов в корне хранилища | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L3159) |
| Pop-up style | `popup-explorer` | Есть карточка | Подтверждено правилом CSS. Файловый проводник как всплывающая панель | [код](https://github.com/leslyecream/Lagom-Obsidian-Theme/blob/826c84596d013ca1cd61cf144f7996e688df0ee4/theme.css#L3165) |

## Документация в репозитории

- [README.md](https://github.com/leslyecream/Lagom-Obsidian-Theme/tree/826c84596d013ca1cd61cf144f7996e688df0ee4/README.md) — Lagom; Screenshots; Fonts; Features; Note; Snippets; Grouping folders; Style Settings; Comparison ; Roadmap; Special thanks; Changelog; Contribution

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
