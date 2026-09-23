# Разбор: Underwater

[[atlas/! themes/underwater|Underwater]] · [Репозиторий на момент проверки](https://github.com/seniblue/Underwater/tree/8e1c7429e227083438be61f511557879df388b7d)

Commit: `8e1c7429e227083438be61f511557879df388b7d`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 3; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 345.

## Результат сопоставления

Новых карточек: 15; ранее существовавших приёмов с найденными подтверждениями: 17.

- Компактные закреплённые вкладки — новая карточка
- Выделение активной строки редактора — новая карточка
- Режим письма со скрытыми элементами интерфейса — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Рабочая область без видимых полос прокрутки — новая карточка
- Символы задач без переключения кликом — новая карточка
- Согласованный набор значков интерфейса — новая карточка
- Упрощённый заголовок Bases — новая карточка
- Скорость и отключение анимации темы — новая карточка
- Скрытые свойства в режиме чтения — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/text-justify/text-justify|Выравнивание по ширине]] — существующая карточка
- [[atlas/! hacks/strike-s37/strike-s37|Псевдоспойлер]] — существующая карточка
- [[atlas/! hacks/callout-technical-solid/callout-technical-solid|Плотная цветная панель]] — существующая карточка
- [[atlas/! hacks/task-e04/task-e04|Круг с галочкой]] — существующая карточка
- [[atlas/! hacks/image-e006/image-e006|По центру]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/table-e002/table-e002|Полная сетка]] — существующая карточка
- [[atlas/! hacks/table-e022/table-e022|Короткая шапка капителью]] — существующая карточка
- [[atlas/! hacks/table-e027/table-e027|Компактная таблица по центру]] — существующая карточка
- [[atlas/! hacks/unordered-tree/unordered-tree|Линии вложенного плана]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Dark theme | `underwater-colors-dark` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2280) |
| Light Theme | `underwater-colors-light` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2320) |
| Callout style | `callout` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-solid/callout-technical-solid\|Плотная цветная панель]] | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2601) |
| Table style | `table` | Палитра | Вариант цветов темы: --table-header-background, --table-header-background-hover, --table-header-color, --table-row-alt-background, --table-row-alt-background-hover. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2620) |
| Checkboxes style | `checkbox` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/task-e04/task-e04\|Круг с галочкой]] | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2633) |
| Vault icon | `vault-icon` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Согласованный набор значков интерфейса | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2652) |
| Internal links styling | `links-styling` | Вариант оформления | Ссылка с рамкой либо простой цветной текст; локальные рамки и отступы.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2683) |
| Disable styling for Bases | `no-bases` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Упрощённый заголовок Bases | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2714) |
| Disable h5 header centering | `no-h5` | Типографический параметр | Выравнивание H5 по центру; text-align.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2719) |
| Disable image/videos/embeds/etc. + Tables centering | `no-center` | Есть карточка | Сопоставление уточнено после проверки конкретной цели CSS. [[atlas/! hacks/image-e006/image-e006\|По центру]] | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2724) |
| Disable slight button zoom on hover | `no-button` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скорость и отключение анимации темы | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2734) |
| Allow properties to be visible in reading mode as well | `visible-properties` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Скрытые свойства в режиме чтения | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2739) |
| Disable checkboxes | `no-checkboxes` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Состояния задач по символу в квадратных скобках | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2744) |
| Disable checkbox click (allows you to use checkboxes as bullets) | `no-click` | Есть карточка | Подтверждено правилом CSS. Символы задач без переключения кликом | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2750) |
| Disable active line higlight | `no-activeline` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2755) |
| Remove tooltips | `no-tooltips` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Выборочное скрытие служебных кнопок | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2760) |
| Remove scrollbar in sidebars | `no-scrollbar` | Есть карточка | Подтверждено правилом CSS. Рабочая область без видимых полос прокрутки | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2765) |
| Disable justified text | `no-justify` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/text-justify/text-justify\|Выравнивание по ширине]] | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2770) |
| Disable smaller pinned tabs | `no-pin` | Есть карточка | Подтверждено правилом CSS. Компактные закреплённые вкладки | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2775) |
| Disable properties styling | `no-properties` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2780) |
| 🎯 Full focus mode | `focus-mode` | Есть карточка | Подтверждено правилом CSS. Режим письма со скрытыми элементами интерфейса | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2791) |
| Enable background image | `workspace-bg` | Есть карточка | Подтверждено правилом CSS. Фоновое изображение рабочего пространства | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2812) |
| KANBAN board style | `kanban` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2855) |
| Enable a dotted background for EXCALIDRAW drawings | `dotted` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2868) |
| Disable CALENDAR styling | `no-calendar` | Палитра | Вариант цветов темы: --color-background-weekend, --color-background-weeknum. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2873) |
| Enable seamless DATAVIEW tables | `seamless-dataview` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2879) |
| Disable TODOIST SYNC styling | `no-todoist` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2885) |
| Disable WIDGETS styling | `no-widgets` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2890) |
| Disable POMODORO TIMER styling | `no-pomodoro` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2896) |
| Disable CARDBOARD styling | `no-cardboard` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2902) |
| Disable FILE TREE ALTERNATIVE styling | `no-fta` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2907) |
| Enable TOKEI styling | `tokei-plugin` | Вариант оформления | Оформление существующих компонентов: фон, рамки, отступы, размеры и типографика. Проверены CSS-правила; новые функции внешних плагинов не заявлены.  | [код](https://github.com/seniblue/Underwater/blob/8e1c7429e227083438be61f511557879df388b7d/theme.css#L2912) |

## Документация в репозитории

- [README.md](https://github.com/seniblue/Underwater/tree/8e1c7429e227083438be61f511557879df388b7d/README.md) — Underwater for Obsidian; 🎨 Color schemes; Popular color schemes; 🌊 Underwater color schemes; Formatting; Cssclasses; ✨ Features; Snippets; 🧩 Plugins support; Credit; Tasks

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
