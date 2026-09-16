# Разбор: Encore

[[atlas/! themes/encore|Encore]] · [Репозиторий на момент проверки](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755)

Commit: `5365650dceaa5e3ae545017253d6f40316d26755`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 52; документов: 9; CSS-файлов: 2; правил основного CSS разобрано: 336.

## Результат сопоставления

Новых карточек: 6; ранее существовавших приёмов с найденными подтверждениями: 13.

- Полностью чёрный фон для OLED — новая карточка
- Полупрозрачные панели — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Расширенная область клика по строке редактора — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- [[atlas/! hacks/emphasis-s16/emphasis-s16|16 · Рамка]] — существующая карточка
- [[atlas/! hacks/note-ornament/note-ornament|Орнамент вместо горизонтальной черты]] — существующая карточка
- [[atlas/! hacks/interface-header-surface/interface-header-surface|Отдельная поверхность заголовка]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|02 · Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|03 · Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/table-e034/table-e034|Подсветка строки]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/table-e035/table-e035|Подсветка отдельной ячейки]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| 🌚 Theme • Dark Mode | `theme-dark` | Вариант оформления | Палитры вместе с формой вкладок, прозрачностью поверхностей и декоративными фонами; варианты целостной темы.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L7) |
| 🌞 Theme • Light Mode | `theme-light` | Вариант оформления | Палитры вместе с формой вкладок, прозрачностью поверхностей и декоративными фонами; варианты целостной темы.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L54) |
| 🎨 Colors in Text | `colors` | Палитра | Вариант цветов темы: --bold-color, --h1-color, --h2-color, --h3-color, --h4-color, --h5-color, --h6-color, --highlight-hue, --italic-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L71) |
| 👑 Encore Translucency | `encore-translucency` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Полупрозрачные панели | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L88) |
| Translucency Background | `encore-translucency-background` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства; Полупрозрачные панели | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L114) |
| ✨ Fancy View Headers | `encore-fancy-headers` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/interface-header-surface/interface-header-surface\|Отдельная поверхность заголовка]] | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L249) |
| OLED Mode For Mobile | `encore-mobile-oled-mode` | Есть карточка | Подтверждено правилом CSS. Полностью чёрный фон для OLED | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L254) |
| Mobile Translucency | `encore-mobile-translucency` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Полупрозрачные панели | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L259) |
| Coloured Tooltip | `encore-coloured-tooltip` | Палитра | Вариант цветов темы: --tooltip-edge-colour. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L264) |
| Highlighted Text Border | `encore-highlight-border` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/emphasis-s16/emphasis-s16\|16 · Рамка]] | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L269) |
| Use Bright Accent Colour | `encore-bright-accent` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L274) |
| Blur Amount | `blur-amount` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Размытие фона за всплывающими панелями | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L279) |
| Disable Grainy Background | `encore-disable-grain` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L309) |
| Disable Clickability Fix | `encore-disable-clickability-fix` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Расширенная область клика по строке редактора | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L314) |
| Disable Logo on Horizontal Rule | `encore-disable-logo-on-hr` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/note-ornament/note-ornament\|Орнамент вместо горизонтальной черты]] | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L319) |
| Disable Calendar Integration | `encore-no-calendar` | Вариант оформления | Интеграция Calendar: значки навигации и отступы, без новой календарной функции.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L324) |
| Disable Excalidraw Integration | `encore-no-excalidraw` | Вариант оформления | Интеграция Excalidraw: рамки, слои и полупрозрачный фон панелей.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L329) |
| Disable MAKE.md Integration | `encore-no-makemd` | Вариант оформления | Интеграция MAKE.md: градиентная подложка, высота и z-index.  | [код](https://github.com/carbonateb/obsidian-encore-theme/blob/5365650dceaa5e3ae545017253d6f40316d26755/theme.css#L334) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/bug_report.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/.github/ISSUE_TEMPLATE/bug_report.md)
- [.github/ISSUE_TEMPLATE/feature_request.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/.github/ISSUE_TEMPLATE/feature_request.md)
- [.verb.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/.verb.md)
- [Markdown Tests/Another Test File.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/Markdown%20Tests/Another%20Test%20File.md)
- [Markdown Tests/Dataview File.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/Markdown%20Tests/Dataview%20File.md) — Table; List; TODO List; No Results; Parse Error
- [Markdown Tests/Generic File.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/Markdown%20Tests/Generic%20File.md) — A typical markdown file; The Blank Line Problem; The Solution: Respect Standards; Make Other Styles of Markdown Nice Still; Header 1; Header 2; Header 3; Header 4; Header 5; Header 6; **Bullet** Lists; ~~More Bullet Lists~~ *Actually, Numbered Lists*; Variation: ==Checklist==; Horizontal Rule; Embedded Notes; Table
- [Markdown Tests/Kanban Board.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/Markdown%20Tests/Kanban%20Board.md)
- [Old README.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/Old%20README.md) — Encore - A Fresh Take on Obsidian; Typography Changes; Colours; Obsidian Redux; Cobalt; Mercury; Iron; Carbon; Blackout; Obsidian; Atom; RGB; Sterling; Dev Setup; Building & Deploying
- [README.md](https://github.com/carbonateb/obsidian-encore-theme/tree/5365650dceaa5e3ae545017253d6f40316d26755/README.md) — Encore • Obsidian Remade; 👑 Encore Translucency; Standard Colour Themes; Some More Features

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
