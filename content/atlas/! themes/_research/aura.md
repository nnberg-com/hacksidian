# Разбор: Aura

[[atlas/! themes/aura|Aura]] · [Репозиторий на момент проверки](https://github.com/shadowash8/obsidian-aura/tree/4a0888fc37caf88d98607c6fa2fd4cb35d32082e)

Commit: `4a0888fc37caf88d98607c6fa2fd4cb35d32082e`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 49; документов: 2; CSS-файлов: 3; правил основного CSS разобрано: 438.

## Результат сопоставления

Новых карточек: 15; ранее существовавших приёмов с найденными подтверждениями: 8.

- Цветовые группы папок в проводнике — новая карточка
- Значки файлов в проводнике — новая карточка
- Панели рабочего пространства отдельными карточками — новая карточка
- Выделение активной строки редактора — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Скрытые свойства в режиме чтения — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Размеры и перекрытие панелей в стопке вкладок — новая карточка
- Служебные элементы появляются при наведении — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- Строка состояния появляется при наведении — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/heading-e051/heading-e051|Неоновая вывеска]] — существующая карточка
- [[atlas/! hacks/unordered-e047/unordered-e047|Направляющая вложенности]] — существующая карточка
- [[atlas/! hacks/callout-technical-round/callout-technical-round|Большое скругление]] — существующая карточка
- [[atlas/! hacks/tag-e064/tag-e064|Радуга по позиции]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Light Theme Colorscheme | `aura-colorshemes-light` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3135) |
| Dark Theme Colorscheme | `aura-colorshemes-dark` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3169) |
| Active line highlight | `aura-active-line` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3221) |
| Neon List | `aura-neon-list` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/unordered-e047/unordered-e047\|Направляющая вложенности]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3351) |
| Colored Heading | `aura-heading-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3395) |
| Neon Heading | `aura-neon-headings` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e051/heading-e051\|Неоновая вывеска]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3400) |
| H1 color | `aura-h1-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3432) |
| H2 color | `aura-h2-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3498) |
| H3 color | `aura-h3-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3564) |
| H4 color | `aura-h4-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3630) |
| H5 color | `aura-h5-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3696) |
| H6 color | `aura-h6-color` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3762) |
| Enable Callout Styling | `aura-callouts` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-round/callout-technical-round\|Большое скругление]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3809) |
| Callout Styling | `aura-callouts-select` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-round/callout-technical-round\|Большое скругление]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3814) |
| Enable Custom Checkbox | `aura-custom-checkbox` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3845) |
| Toggle CSS Classes | `aura-css-classes` | Вариант оформления | Подключение набора CSS-классов с шрифтами, межстрочными интервалами и оформлением текста.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3857) |
| Enable Rainbow Tags | `aura-rainbow-tags` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/tag-e064/tag-e064\|Радуга по позиции]] | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3869) |
| Layout Style | `aura-layout-select` | Есть карточка | Подтверждено правилом CSS. Панели рабочего пространства отдельными карточками | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3889) |
| Disable borders | `aura-disable-borders` | Палитра | Вариант цветов темы: --divider-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3905) |
| Sliding Tabs | `aura-sliding-tabs` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Размеры и перекрытие панелей в стопке вкладок | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3916) |
| Enable shadows for cards | `aura-card-shadows` | Переключатель не подтверждён CSS | В настройках ID есть, но ни ID, ни значения class-select не используются в CSS после удаления комментариев. Не выдаём этот переключатель за реализованную возможность текущего commit.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3948) |
| Enable card format for left ribbon | `aura-card-layout-actions` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Панели рабочего пространства отдельными карточками | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3952) |
| Enable card format for file explorer | `aura-card-layout-fileexplorer` | Есть карточка | Подтверждено правилом CSS. Панели рабочего пространства отдельными карточками | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3956) |
| Tab Display | `tab-options` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Служебные элементы появляются при наведении | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3967) |
| Enable Backgound | `aura-workspace-background` | Есть карточка | Подтверждено правилом CSS. Фоновое изображение рабочего пространства | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L3991) |
| Select Background Image | `aura-workspace-background-image-dark` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Фоновое изображение рабочего пространства | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4002) |
| Enable File Icons | `aura-file-icons` | Есть карточка | Подтверждено правилом CSS. Значки файлов в проводнике | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4119) |
| Enable folder Icons | `aura-folder-icons` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4124) |
| Enable Colorful Frame | `aura-colorful-frame` | Вариант оформления | Цветные рамки и разделители рабочего пространства; декоративная вариация поверхностей.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4135) |
| Enable Rainbow Folders | `aura-rainbow-folders` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4154) |
| Floating Titlebar | `aura-floating-titlebar` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Плавающий заголовок панели заметки | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4167) |
| Floating Status Bar | `aura-floating-status-bar` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Строка состояния появляется при наведении | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4171) |
| Hide Status Bar | `aura-hide-status-bar` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4175) |
| Hide Scrollbar | `aura-scrollbar-toggle` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4179) |
| Hide Metadata | `aura-toggle-metadata` | Есть карточка | Подтверждено правилом CSS. Скрытые свойства в режиме чтения | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4183) |
| Hide Tooltips | `aura-tooltip-toggle` | Переключатель не подтверждён CSS | В настройках ID есть, но ни ID, ни значения class-select не используются в CSS после удаления комментариев. Не выдаём этот переключатель за реализованную возможность текущего commit.  | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4187) |
| Hide Vault Name | `aura-vault-name-toggle` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/shadowash8/obsidian-aura/blob/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/theme.css#L4191) |

## Документация в репозитории

- [Fonts Feature Remove.md](https://github.com/shadowash8/obsidian-aura/tree/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/Fonts%20Feature%20Remove.md) — Font Import Feature Remove ; Font Import; Style Settings
- [README.md](https://github.com/shadowash8/obsidian-aura/tree/4a0888fc37caf88d98607c6fa2fd4cb35d32082e/README.md) — Installation
; Features
; Custom Colorschemes
; Workspace Background
; Alternate Layout
; Colorful Frame
; And many more..
; Credits

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
