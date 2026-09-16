# Разбор: Material Flat

[[atlas/! themes/material-flat|Material Flat]] · [Репозиторий на момент проверки](https://github.com/threethan/obsidian-material-flat-theme/tree/bb6671a44b400c05c2ff8331aea7ec2839401cc7)

Commit: `bb6671a44b400c05c2ff8331aea7ec2839401cc7`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 21; документов: 3; CSS-файлов: 2; правил основного CSS разобрано: 387.

## Результат сопоставления

Новых карточек: 14; ранее существовавших приёмов с найденными подтверждениями: 4.

- Плавающая кнопка переключения чтения и редактирования — новая карточка
- Больше места для перетаскивания окна — новая карточка
- Режим пера в интерфейсе Excalidraw — новая карточка
- Плавающий переключатель режима на компьютере — новая карточка
- Скорость и отключение анимации темы — новая карточка
- Полупрозрачные панели — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Компоновка мобильной панели команд — новая карточка
- Свободное место перед началом заметки — новая карточка
- Оформление интерфейса под операционную систему — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Выделение активного файла в проводнике — новая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Hide left toolbar with left panel (Desktop) | `hide-toolbar-desktop` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2501) |
| Drag window more easily (Desktop) | `more-drag-desktop` | Есть карточка | Подтверждено правилом CSS. Больше места для перетаскивания окна | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2507) |
| Drag window with active tab (Desktop) | `tab-drag-desktop` | Есть карточка | Подтверждено правилом CSS. Больше места для перетаскивания окна | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2513) |
| Pen Mode (for Excalidraw) | `pen-mode` | Есть карточка | Подтверждено правилом CSS. Режим пера в интерфейсе Excalidraw | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2519) |
| Increase Accent Color Vibrancy | `vibrant` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2531) |
| Dim Light Mode | `dim-light-mode` | Палитра | Вариант цветов темы: --background, --surface. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2537) |
| Add scroll space above document | `space-above-document` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Свободное место перед началом заметки | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2543) |
| Disable tooltip animation | `disable-tooltip-animation` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2549) |
| Enable transparency support (Desktop) | `enable-mica` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Полупрозрачные панели | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2555) |
| Native Windows Right-Click Menus (Desktop) | `win-menu` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Оформление интерфейса под операционную систему | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2561) |
| Remove top padding (Desktop) | `no-top-space` | Типографический параметр | Убирает 7px пространства над вкладками компенсацией margin-top и height.  | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2567) |
| Hide sidebar header (Mobile) | `hide-sidebar-header` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2573) |
| Button shapes (Mobile) | `button-shapes-mobile` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Компоновка мобильной панели команд | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2579) |
| Enable FAB (Mobile) | `fab-enabled-mobile` | Есть карточка | Подтверждено правилом CSS. Плавающая кнопка переключения чтения и редактирования | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2615) |
| Enable FAB (Desktop) | `fab-enabled-desktop` | Есть карточка | Подтверждено правилом CSS. Плавающий переключатель режима на компьютере | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2621) |
| Hide tab-status-bar buttons on mobile | `hide-buttons-mobile` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2627) |
| Customizable FAB action | `custom-page-header` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Плавающая кнопка переключения чтения и редактирования | [код](https://github.com/threethan/obsidian-material-flat-theme/blob/bb6671a44b400c05c2ff8331aea7ec2839401cc7/theme.css#L2633) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/bug_report.md](https://github.com/threethan/obsidian-material-flat-theme/tree/bb6671a44b400c05c2ff8331aea7ec2839401cc7/.github/ISSUE_TEMPLATE/bug_report.md)
- [.github/ISSUE_TEMPLATE/feature_request.md](https://github.com/threethan/obsidian-material-flat-theme/tree/bb6671a44b400c05c2ff8331aea7ec2839401cc7/.github/ISSUE_TEMPLATE/feature_request.md)
- [README.md](https://github.com/threethan/obsidian-material-flat-theme/tree/bb6671a44b400c05c2ff8331aea7ec2839401cc7/README.md) — Material Flat, for Obsidian 🎨; Features; Customizable Color Palette; Floating Action Button; Specially Supported Plugins; Better Translucency; Acknowledgements

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
