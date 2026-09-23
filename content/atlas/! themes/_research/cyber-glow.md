# Разбор: Cyber Glow

[[atlas/! themes/cyber-glow|Cyber Glow]] · [Репозиторий на момент проверки](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db)

Commit: `a9a9776d5cb68ce09bec36e29f1084da6757f6db`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 11; документов: 6; CSS-файлов: 1; правил основного CSS разобрано: 905.

## Результат сопоставления

Новых карточек: 13; ранее существовавших приёмов с найденными подтверждениями: 14.

- Цветовые группы папок в проводнике — новая карточка
- Номера строк внутри блока кода — новая карточка
- Обозначение уровня заголовка в редакторе — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Скорость и отключение анимации темы — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Согласованный набор значков интерфейса — новая карточка
- Срезанные углы панелей — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Выделение активной строки редактора — новая карточка
- Выделение активного файла в проводнике — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/note-ornament/note-ornament|Орнамент вместо горизонтальной черты]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/note-list-markers/note-list-markers|Цвет и форма маркеров]] — существующая карточка
- [[atlas/! hacks/list-e013/list-e013|Без видимых маркеров]] — существующая карточка
- [[atlas/! hacks/callout-margin/callout-margin|Заметка на полях]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e051/heading-e051|Неоновая вывеска]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка
- [[atlas/! hacks/table-e027/table-e027|Компактная таблица по центру]] — существующая карточка
- [[atlas/! hacks/image-e006/image-e006|По центру]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Disable Settings Colored Background | `CG-settings-background` | Вариант оформления | Цветная подложка и внутренняя тень окна настроек.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L18) |
| Enable Workspace Backgound | `CG-workspace-background` | Есть карточка | Подтверждено правилом CSS. Фоновое изображение рабочего пространства | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L31) |
| Select Background Image | `CG-workspace-background-image` | Палитра | Вариант цветов темы: --CGworkspace-background-image. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L37) |
| Disable Animations | `CG-disableAni` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Скорость и отключение анимации темы | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L112) |
| Disable Phone's Header Folder Path | `CG-header-crumbs` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L118) |
| Disable Full  Status-bar | `CG-Fullstatus-off` | Вариант оформления | Компактная строка состояния: поля, sticky-позиция и прозрачная подложка.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L126) |
| Enable Active Header Styling | `CG-active-header` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/interface-active-tab/interface-active-tab\|Выразительная активная вкладка]] | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L147) |
| Remove Active Page Highlight | `CG-active-background` | Переключатель не подтверждён CSS | В текущем разобранном CSS нет правила с классом переключателя; заявленный эффект не засчитан.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L153) |
| Remove Sidepanel Toggle Icon Color | `CG-SPColor` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L173) |
| Left Sidebar Toggle | `CG-workspace-sbt` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Согласованный набор значков интерфейса | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L179) |
| Colorful Folders | `CG-colorfulFolder` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L210) |
| Disable SciFi Folders | `CG-scifiFolder` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Срезанные углы панелей | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L216) |
| Hide Folder Icon | `CG-folder-icon` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Значки папок вместо стрелок дерева | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L229) |
| Show Chevron (Collapse Arrow) | `CG-chevron` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Значки папок вместо стрелок дерева | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L235) |
| Strikeout Text | `CG-strike` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/task-e13/task-e13\|Зачёркивание]] | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L248) |
| Custom Checkbox | `CG-custom-checkbox` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L254) |
| Bullet Style | `CG-bullet-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-list-markers/note-list-markers\|Цвет и форма маркеров]] | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L270) |
| Restore Callout | `calloutcut` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Срезанные углы панелей | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L299) |
| Disable Bullets in Callout | `CG-bulletcallout` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/list-e013/list-e013\|Без видимых маркеров]] | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L307) |
| Disable Codeblocks Gutter | `no-codeblock-line-numbers` | Есть карточка | Подтверждено правилом CSS. Номера строк внутри блока кода | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L326) |
| Scifi Codeblocks | `SciFiCode` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Срезанные углы панелей | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L330) |
| Restore Bold Header | `restore-header` | Типографический параметр | Настройка типографических параметров: --h1-weight, --h2-weight, --h3-weight, --h4-weight, --h5-weight, --h6-weight. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L343) |
| Show Header Indication | `mini-header-hide` | Есть карточка | Подтверждено правилом CSS. Обозначение уровня заголовка в редакторе | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L349) |
| Heading Dividing Line (---) | `CG-hr` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/note-ornament/note-ornament\|Орнамент вместо горизонтальной черты]] | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L355) |
| Enable Custom Inline Color | `inline-border` | Вариант оформления | Цвет и рамка inline-кода; локальная вариация оформления, без нового поведения.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L687) |
| Enable Custom Inline Color within Codeblocks | `inlineblock-border` | Вариант оформления | Цвет и рамка inline-кода; локальная вариация оформления, без нового поведения.  | [код](https://github.com/thepharaohart/Obsidian-CyberGlow/blob/a9a9776d5cb68ce09bec36e29f1084da6757f6db/theme.css#L693) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/FontIssue.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/.github/ISSUE_TEMPLATE/FontIssue.md)
- [.github/ISSUE_TEMPLATE/callouts-tags-additions.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/.github/ISSUE_TEMPLATE/callouts-tags-additions.md)
- [.github/ISSUE_TEMPLATE/desktop-bug-report.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/.github/ISSUE_TEMPLATE/desktop-bug-report.md)
- [.github/ISSUE_TEMPLATE/feature_request.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/.github/ISSUE_TEMPLATE/feature_request.md)
- [.github/ISSUE_TEMPLATE/mobile-bug-report.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/.github/ISSUE_TEMPLATE/mobile-bug-report.md)
- [README.md](https://github.com/thepharaohart/Obsidian-CyberGlow/tree/a9a9776d5cb68ce09bec36e29f1084da6757f6db/README.md) — Cyber Glow for Obsidian; Desktop View; Mobile View; Optional; Plugin Support; What to Expect in Cyber Glow; Special Thanks

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
