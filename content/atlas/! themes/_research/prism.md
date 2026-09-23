# Разбор: Prism

[[atlas/! themes/prism|Prism]] · [Репозиторий на момент проверки](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a)

Commit: `d1b0b2fad28778b96a19777020e42961e293d90a`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 106; документов: 6; CSS-файлов: 4; правил основного CSS разобрано: 1393.

## Результат сопоставления

Новых карточек: 18; ранее существовавших приёмов с найденными подтверждениями: 11.

- Цветовые группы папок в проводнике — новая карточка
- Вложенные папки наследуют цвет раздела — новая карточка
- Компактные закреплённые вкладки — новая карточка
- Режим письма со скрытыми элементами интерфейса — новая карточка
- PDF вписывается в фон темы — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Размытие фона за всплывающими панелями — новая карточка
- Альтернативные формы букв шрифта — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Фоновое изображение рабочего пространства — новая карточка
- Вкладки по центру полосы — новая карточка
- Команды боковой панели сверху или снизу — новая карточка
- Положение и выравнивание строки состояния — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Размер и форма полос прокрутки — новая карточка
- Выделение активного файла в проводнике — новая карточка
- Фон у раскрытой папки — новая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/code-e012/code-e012|Без программных лигатур]] — существующая карточка
- [[atlas/! hacks/note-highlight/note-highlight|Маркер за важным текстом]] — существующая карточка
- [[atlas/! hacks/callout-technical-round/callout-technical-round|Большое скругление]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/image-e034/image-e034|Негатив]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/metadata-no-icons/metadata-no-icons|Без иконок типов]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Color Scheme | `color-schemes-lt` | Палитра | Вариант цветов темы: --background-primary-alt-hsl, --background-primary-hsl, --background-secondary-alt-hsl, --background-secondary-blur-hsl, --background-secondary-hsl, --color-blue-base-hsl, --color-blue-text-hsl, --color-blue-tint-hsl, --color-cyan-base-hsl, --color-cyan-text-hsl, --color-cyan-tint-hsl, --color-green-base-hsl, --color-green-text-hsl, --color-green-tint-hsl, --color-grey-base-hsl, --color-grey-text-hsl, --color-grey-tint-hsl, --color-mint-base-hsl, --color-mint-text-hsl, --color-mint-tint-hsl, --color-orange-base-hsl, --color-orange-text-hsl, --color-orange-tint-hsl, --color-pink-base-hsl, --color-pink-text-hsl, --color-pink-tint-hsl, --color-purple-base-hsl, --color-purple-text-hsl, --color-purple-tint-hsl, --color-red-base-hsl, --color-red-text-hsl, --color-red-tint-hsl, --color-yellow-base-hsl, --color-yellow-text-hsl, --color-yellow-tint-hsl, --shadow-color-hsl, --shadow-l, --shadow-s, --text-faint-hsl, --text-muted-hsl, --text-normal-hsl. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7792) |
| Color Scheme Style | `color-scheme-style-lt` | Вариант оформления | Пресеты цвета, контраста и границ поверхностей интерфейса.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7818) |
| Accent Style | `accent-style-lt` | Вариант оформления | Пресеты цвета, контраста и границ поверхностей интерфейса.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7835) |
| Accent Color Preset | `light-accent-color-preset` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7858) |
| Accent Text Color Preset | `highlight-text-accent-lt` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7899) |
| Color Scheme | `color-schemes-dt` | Палитра | Вариант цветов темы: --background-primary-alt-hsl, --background-primary-hsl, --background-secondary-alt-hsl, --background-secondary-blur-hsl, --background-secondary-hsl, --color-blue-base-hsl, --color-blue-text-hsl, --color-blue-tint-hsl, --color-cyan-base-hsl, --color-cyan-text-hsl, --color-cyan-tint-hsl, --color-green-base-hsl, --color-green-text-hsl, --color-green-tint-hsl, --color-grey-base-hsl, --color-grey-text-hsl, --color-grey-tint-hsl, --color-mint-base-hsl, --color-mint-text-hsl, --color-mint-tint-hsl, --color-orange-base-hsl, --color-orange-text-hsl, --color-orange-tint-hsl, --color-pink-base-hsl, --color-pink-text-hsl, --color-pink-tint-hsl, --color-purple-base-hsl, --color-purple-text-hsl, --color-purple-tint-hsl, --color-red-base-hsl, --color-red-text-hsl, --color-red-tint-hsl, --color-yellow-base-hsl, --color-yellow-text-hsl, --color-yellow-tint-hsl, --shadow-color-hsl, --shadow-l, --shadow-s, --text-faint-hsl, --text-muted-hsl, --text-normal-hsl. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7964) |
| Color Scheme Style | `color-scheme-style-dt` | Вариант оформления | Пресеты цвета, контраста и границ поверхностей интерфейса.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L7990) |
| Accent Style | `accent-style-dt` | Вариант оформления | Пресеты цвета, контраста и границ поверхностей интерфейса.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L8007) |
| Accent Color Preset | `dark-accent-color-preset` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L8030) |
| Accent Text Color Preset | `highlight-text-accent-dt` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L8071) |
| Enable Custom Vault Banner | `pt-custom-vault-banner` | Вариант оформления | Изображение в шапке хранилища, не баннер внутри заметки.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9188) |
| Enable Focused Mode | `pt-focused-mode` | Есть карточка | Подтверждено правилом CSS. Режим письма со скрытыми элементами интерфейса | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9207) |
| Focused Mode Style | `focused-mode-style` | Есть карточка | Подтверждено правилом CSS. Режим письма со скрытыми элементами интерфейса | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9214) |
| Alternative lower case 'a' appearance | `pt-font-alt-a` | Есть карточка | Подтверждено правилом CSS. Альтернативные формы букв шрифта | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9277) |
| Alternative lower case 'g' appearance | `pt-font-alt-g` | Есть карточка | Подтверждено правилом CSS. Альтернативные формы букв шрифта | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9282) |
| Alternative '0' appearance (Slashed Zero) | `pt-font-slashed-zero` | Типографический параметр | Настройка типографических параметров: font-variant. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9287) |
| Disable Ligatures | `pt-font-disable-ligatures` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/code-e012/code-e012\|Без программных лигатур]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L9292) |
| Mark Highlight Style | `light-mark-highlight-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-highlight/note-highlight\|Маркер за важным текстом]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11155) |
| Mark Highlight Text Color Preset | `light-mark-highlight-text-color-preset` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11174) |
| Mark Highlight Style | `dark-mark-highlight-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-highlight/note-highlight\|Маркер за важным текстом]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11193) |
| Mark Highlight Text Color Preset | `dark-mark-highlight-text-color-preset` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11212) |
| Left Sidebar Tab Label Alignment | `left-sidebar-tab-label-alignment` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Вкладки по центру полосы | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11268) |
| Right Sidebar Tab Label Alignment | `right-sidebar-tab-label-alignment` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Вкладки по центру полосы | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11285) |
| Left Sidebar Nav Header Position | `nav-header-left-sidebar-position` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Команды боковой панели сверху или снизу | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11309) |
| Left Sidebar Nav Header Alignment | `nav-header-left-sidebar-alignment` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Команды боковой панели сверху или снизу | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11323) |
| Right Sidebar Nav Header Position | `nav-header-right-sidebar-position` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Команды боковой панели сверху или снизу | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11340) |
| Right Sidebar Nav Header Alignment | `nav-header-right-sidebar-alignment` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Команды боковой панели сверху или снизу | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11354) |
| Tab Header Alignment | `tab-header-alignment` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Вкладки по центру полосы | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11378) |
| Enable Folder Dropdown Icon | `pt-file-explorer-folder-icon` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11402) |
| Folder Dropdown Icon Color | `pt-file-explorer-folder-icon-color` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Цветовые группы папок в проводнике | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11408) |
| Enable Colored Folders | `pt-colored-folders` | Есть карточка | Подтверждено правилом CSS. Цветовые группы папок в проводнике | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11432) |
| Folder Dropdown Style | `pt-colored-folders-style` | Палитра | Вариант цветов темы: --nav-indentation-guide-color, --rainbow-background-color, --rainbow-indent-color, --rainbow-text-color, background-color, color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11438) |
| Apply to Nested Files | `pt-colored-folders-files-match` | Есть карточка | Подтверждено правилом CSS. Вложенные папки наследуют цвет раздела | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11452) |
| Hide Titlebar Title Text | `pt-titlebar-hide-text` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11464) |
| Status Bar Style | `pt-status-bar-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Положение и выравнивание строки состояния | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11477) |
| Fixed Status Bar Horizontal Alignment | `pt-fixed-status-bar-align` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Положение и выравнивание строки состояния | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11494) |
| Status Bar Preset | `status-bar-preset-lt` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11517) |
| Status Bar Text/Icons Color | `status-bar-text-color-lt` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11538) |
| Status Bar Preset | `status-bar-preset-dt` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11560) |
| Status Bar Text/Icons Color | `status-bar-text-color-dt` | Палитра | Вариант цветов темы: color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11582) |
| Disable Kanban Title Card Count | `pt-disable-kanban-title-count` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11628) |
| Center Kanban Title Text | `pt-center-kanban-title-text` | Типографический параметр | Выравнивание названия колонки Kanban по центру; align-items и width.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11634) |
| Light Theme Kanban Background | `pt-kanban-background-lt` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11640) |
| Dark Theme Kanban Background | `pt-kanban-background-dt` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Фоновое изображение рабочего пространства | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11657) |
| Use UI Accent Color for Icon Folder | `pt-icon-folder-accent` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11681) |
| Use UI Accent Color for Icons | `pt-icons-accent` | Палитра | Все связанные декларации меняют только цвета/цветовые переменные. Это вариант палитры темы; новая операция над заметкой не появляется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11694) |
| Fade Inactive Tabs | `pt-fade-inactive-tabs` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/interface-active-tab/interface-active-tab\|Выразительная активная вкладка]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11707) |
| Disable Blurred Background Effect | `pt-disable-blur` | Есть карточка | Подтверждено правилом CSS. Размытие фона за всплывающими панелями | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11713) |
| Collapsed Pinned Tabs | `pt-collapsed-pinned-tab` | Есть карточка | Подтверждено правилом CSS. Компактные закреплённые вкладки | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11719) |
| Enable PDF Dark Theme | `pt-pdf-dark-theme` | Есть карточка | Подтверждено правилом CSS. PDF вписывается в фон темы | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11725) |
| Disable Prism Callout Styling | `pt-disable-callout-styling` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-round/callout-technical-round\|Большое скругление]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11731) |
| Disable Prism Mark Highlight Styling | `pt-disable-mark-highlight-styling` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-highlight/note-highlight\|Маркер за важным текстом]] | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11737) |
| Enable Prism Alternative Checkboxes | `enable-alternative-checkboxes` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11751) |
| Enable Color Icons | `pt-alternative-checkboxes-color-icon` | Палитра | Вариант цветов темы: --icon-mask-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11757) |
| Enable Color Text | `pt-alternative-checkboxes-color-text` | Палитра | Вариант цветов темы: --line-text-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11762) |
| Enable Color Backgrounds | `pt-alternative-checkboxes-color-background` | Палитра | Вариант цветов темы: --line-background. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11767) |
| Prism Theme Class | `prism-theme` | Служебная настройка | Служебный класс идентификации темы; отдельного визуального эффекта в CSS не найдено.  | [код](https://github.com/damiankorcz/Prism-Theme/blob/d1b0b2fad28778b96a19777020e42961e293d90a/theme.css#L11796) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/bug-report.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/.github/ISSUE_TEMPLATE/bug-report.md)
- [.github/ISSUE_TEMPLATE/documentation-request---issue.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/.github/ISSUE_TEMPLATE/documentation-request---issue.md)
- [.github/ISSUE_TEMPLATE/feature-request.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/.github/ISSUE_TEMPLATE/feature-request.md)
- [README.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/README.md) — ✨ Key Features; 💯 Complete Platform Support; ☀️ 5 Light Colour Schemes; 🌑 5 Dark Colour Schemes; 📚 3 Colour Scheme Styles; 🌈 5 Accent Styles and 10 Preset Colours + Option for Custom Colours; 📑 Highlight System based on the `<mark>` tag; 🧰 Customisation Options; 🚀 Getting Started; ⚒️ Install the Style Settings Plugin **(⚠️ Required)**; 💎 Install the Prism Theme; 🧩 Supported Plugins; ✂️ Snippets; 📖 Wiki; 🛠 Contributing; 📬 Contact; 📣 Acknowledgments; 📝 License
- [src/scss/Fonts/License for JetBrains Mono.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/src/scss/Fonts/License%20for%20JetBrains%20Mono.md)
- [src/scss/Fonts/License for Source Sans.md](https://github.com/damiankorcz/Prism-Theme/tree/d1b0b2fad28778b96a19777020e42961e293d90a/src/scss/Fonts/License%20for%20Source%20Sans.md)

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
