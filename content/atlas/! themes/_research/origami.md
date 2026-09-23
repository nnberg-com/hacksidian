# Разбор: Origami

[[atlas/! themes/origami|Origami]] · [Репозиторий на момент проверки](https://github.com/7368697661/Origami/tree/8779debf0eedf8f33b68c22ac50a37c0759caaa3)

Commit: `8779debf0eedf8f33b68c22ac50a37c0759caaa3`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 3; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 494.

## Результат сопоставления

Новых карточек: 7; ранее существовавших приёмов с найденными подтверждениями: 12.

- Строка состояния появляется при наведении — новая карточка
- Колонки Kanban переходят на следующую строку — новая карточка
- Обозначение уровня заголовка в редакторе — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Выделение активного файла в проводнике — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/text-justify/text-justify|Выравнивание по ширине]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/note-hierarchy/note-hierarchy|Шкала заголовков H1–H6]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/callout-margin/callout-margin|Заметка на полях]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/note-list-tree/note-list-tree|Линии вложенного плана]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| accent | `o-color-accent` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L35) |
| themes, light | `o-theme-light` | Палитра | Согласованные цветовые варианты (включая режим смешивания highlight); отдельные карточки на каждый skin не создаются.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L58) |
| themes, dark | `o-theme-dark` | Палитра | Согласованные цветовые варианты (включая режим смешивания highlight); отдельные карточки на каждый skin не создаются.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L93) |
| top level lists | `o-list-distinct` | Вариант оформления | В редакторе верхний уровень списка получает фон и рамку, а пункты — интервалы. Это комбинация имеющихся оформления списка и плотности; Reading View не поддержан.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L146) |
| change bold-italic to accent color | `o-bold-italic` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/emphasis-s02/emphasis-s02\|02 · Цветной bold]]; [[atlas/! hacks/emphasis-s03/emphasis-s03\|03 · Цвет вместо курсива]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L215) |
| justify text | `o-justify` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/text-justify/text-justify\|Выравнивание по ширине]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L220) |
| rainbow headers | `o-colorful-headings` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e007/heading-e007\|Цвет всего заголовка]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L233) |
| header size arrays | `o-header-size` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-hierarchy/note-hierarchy\|Шкала заголовков H1–H6]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L238) |
| header underline color | `o-header-line-accent` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L264) |
| header 1 underline | `o-header-line-h1` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L280) |
| header 2 underline | `o-header-line-h2` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L284) |
| header 3 underline | `o-header-line-h3` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L288) |
| header 4 underline | `o-header-line-h4` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L292) |
| header 5 underline | `o-header-line-h5` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L296) |
| header 6 underline | `o-header-line-h6` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L300) |
| frontmatter card | `o-frontmatter` | Вариант оформления | Карточное оформление Properties и кнопки добавления: фон, рамки, отступы, гарнитура. Порядок/значения свойств не меняются.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L313) |
| header lapels | `o-header-lapel` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Обозначение уровня заголовка в редакторе | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L318) |
| status bar hover | `o-hover-status-bar` | Есть карточка | Подтверждено правилом CSS. Строка состояния появляется при наведении | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L324) |
| wrap kanban lanes | `o-kanban-wrap` | Есть карточка | Подтверждено правилом CSS. Колонки Kanban переходят на следующую строку | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L337) |
| kanban Style | `o-kanban-style` | Вариант оформления | Две декоративные схемы карточек Kanban: контур и пунктир слева, с разными отступами и шрифтом.  | [код](https://github.com/7368697661/Origami/blob/8779debf0eedf8f33b68c22ac50a37c0759caaa3/theme.css#L342) |

## Документация в репозитории

- [README.md](https://github.com/7368697661/Origami/tree/8779debf0eedf8f33b68c22ac50a37c0759caaa3/README.md) — 📄 origami; 🤔 what is origami?; table of contents; 📝 typography; title fonts; body fonts; 🎨 color schemes; ⚙️ nifty things; 🖤 credits; 👋 it’s been a while; 📕 other; about; some resources:

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
