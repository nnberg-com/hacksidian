# Разбор: Composer

[[atlas/! themes/composer|Composer]] · [Репозиторий на момент проверки](https://github.com/vran-dev/obsidian-composer/tree/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd)

Commit: `b08629a587e91f46c30cbb9231e0ad5ec0cef5cd`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 9; документов: 2; CSS-файлов: 2; правил основного CSS разобрано: 285.

## Результат сопоставления

Новых карточек: 8; ранее существовавших приёмов с найденными подтверждениями: 11.

- Полные имена файлов в проводнике — новая карточка
- Значки файлов в проводнике — новая карточка
- Связующие линии файлового дерева — новая карточка
- Выделение активной строки редактора — новая карточка
- Связующие линии в оглавлении заметки — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Размер и форма полос прокрутки — новая карточка
- [[atlas/! hacks/note-indent/note-indent|Красная строка]] — существующая карточка
- [[atlas/! hacks/list-e047/list-e047|Направляющая вложенности]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/interface-quiet-actions/interface-quiet-actions|Тихая панель действий]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/callout-technical-outline/callout-technical-outline|Тонкая рамка]] — существующая карточка
- [[atlas/! hacks/table-e005/table-e005|Без линий]] — существующая карточка
- [[atlas/! hacks/tag-e022/tag-e022|Контурная капсула]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|02 · Цветной bold]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Color Scheme | `theme-variant-light` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L11) |
| Color Scheme | `theme-variant-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L28) |
| Callout Style | `callout-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-outline/callout-technical-outline\|Тонкая рамка]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L68) |
| Table Style | `table-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/table-e005/table-e005\|Без линий]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L93) |
| Hide Striped Background | `composer--HideStripedTableBackground` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. [[atlas/! hacks/table-e007/table-e007\|Зебра по строкам]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L110) |
| Paragraph Indent | `composer--ParagraphIndent` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/note-indent/note-indent\|Красная строка]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L120) |
| Remove Task Completed Decoration | `composer--RemoveTaskCompletedDecoration` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/task-e13/task-e13\|Зачёркивание]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L211) |
| Disable Heading Line Editing Highlight | `composer--DisableHeadingLineEditingHighlight` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выделение активной строки редактора | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L246) |
| Disable Heading Decoration (Reading View) | `composer--DisableHeadingDecoration-ReadingView` | Вариант оформления | Цветной декоративный маркер перед заголовком; не текстовое обозначение уровня H1–H6.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L254) |
| Disable Heading Decoration (Live Preview View) | `composer--DisableHeadingDecoration-LivePreview` | Вариант оформления | Цветной декоративный маркер перед заголовком; не текстовое обозначение уровня H1–H6.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L261) |
| Disable Nav Header Auto Hide | `composer--DisableNavHeaderAutoHide` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/interface-quiet-actions/interface-quiet-actions\|Тихая панель действий]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L367) |
| Disable File Folder Icon | `composer--DisableFileFolderIcon` | Есть карточка | Подтверждено правилом CSS. Значки файлов в проводнике | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L373) |
| Enable Indentation Guide Line | `composer--EnableIndentationGuidLine` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/list-e047/list-e047\|Направляющая вложенности]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L377) |
| Toggle Desktop View Header Title Parent | `composer--DisableDesktopViewHeaderTitleParent` | Переключатель не подтверждён CSS | В настройках ID есть, но ни ID, ни значения class-select не используются в CSS после удаления комментариев. Не выдаём этот переключатель за реализованную возможность текущего commit.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L392) |
| Enable Filename Line Feed | `composer--EnableFilenameLineFeed` | Есть карточка | Подтверждено правилом CSS. Полные имена файлов в проводнике | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L403) |
| Enable Hidden File Tag | `composer--EnableHiddenFileTag` | Есть карточка | Показывает/скрывает индикаторы свойств файла; не доказано скрытие файлов-вложений. Выборочное скрытие служебных кнопок | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L409) |
| Enable Hidden File Tag Hover | `composer--EnableHiddenFileTagHover` | Есть карточка | Показывает/скрывает индикаторы свойств файла; не доказано скрытие файлов-вложений. Выборочное скрытие служебных кнопок | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L415) |
| Outline Style | `outline-style` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Связующие линии в оглавлении заметки | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L427) |
| Disable Rainbow Tree | `composer--DisableRainbowTree` | Есть карточка | Подтверждено правилом CSS. Связующие линии файлового дерева | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L535) |
| Simple Tag Style | `composer--ComponentsSimpleTag` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/tag-e022/tag-e022\|Контурная капсула]] | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L598) |
| Notion Style Gallary Cover | `composer--ComponentsFilledGallaryCover` | Вариант оформления | Обложка карточки галереи без внутренних отступов, с обрезкой overflow:hidden. Оформление стороннего компонента, не новая структура заметки.  | [код](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L604) |

## Документация в репозитории

- [README.md](https://github.com/vran-dev/obsidian-composer/tree/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/README.md) — Brief; Screenshots; Color Scheme; Text Formatting; Table Style; Callout Style; Thanks; Development Workflow (settings.yml + composer.css Split)
- [README_zh.md](https://github.com/vran-dev/obsidian-composer/tree/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/README_zh.md) — 简介; 截图; 配色方案; 文字样式; 表格样式; Callout样式; 鸣谢

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
