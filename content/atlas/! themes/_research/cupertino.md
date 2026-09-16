# Разбор: Cupertino

[[atlas/! themes/cupertino|Cupertino]] · [Репозиторий на момент проверки](https://github.com/aaaaalexis/obsidian-cupertino/tree/080cea8d2c680c66e26b61b58970e56fd6f30ae4)

Commit: `080cea8d2c680c66e26b61b58970e56fd6f30ae4`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 57; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 1379.

## Результат сопоставления

Новых карточек: 18; ранее существовавших приёмов с найденными подтверждениями: 18.

- Боковая панель появляется при наведении — новая карточка
- Плавающая кнопка переключения чтения и редактирования — новая карточка
- Выделение активной строки редактора — новая карточка
- Крупный просмотр изображения при нажатии — новая карточка
- Режим письма со скрытыми элементами интерфейса — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Лента команд появляется при наведении — новая карточка
- Оформление интерфейса под операционную систему — новая карточка
- Таблица шире текстовой полосы — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Вкладки по центру полосы — новая карточка
- Компактные списки служебных панелей — новая карточка
- Обложка в верхней части заметки — новая карточка
- Альтернативные формы букв шрифта — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- Больше места для перетаскивания окна — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- [[atlas/! hacks/meta-reduced-motion/meta-reduced-motion|Уважать уменьшение движения]] — существующая карточка
- [[atlas/! hacks/note-image-fluid/note-image-fluid|Изображение по ширине заметки]] — существующая карточка
- [[atlas/! hacks/table-e072/table-e072|Карточки с фиксированными подписями]] — существующая карточка
- [[atlas/! hacks/link-e004/link-e004|Только цвет — без линии]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/table-e034/table-e034|Подсветка строки]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/image-e034/image-e034|Негатив]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/table-e003/table-e003|Только горизонтали]] — существующая карточка
- [[atlas/! hacks/table-e019/table-e019|Табличные цифры]] — существующая карточка
- [[atlas/! hacks/table-e027/table-e027|Компактная таблица по центру]] — существующая карточка
- [[atlas/! hacks/image-e015/image-e015|Тонкая рамка]] — существующая карточка
- [[atlas/! hacks/image-e019/image-e019|Приподнятая карточка]] — существующая карточка
- [[atlas/! hacks/image-e037/image-e037|Рисунок на цветной бумаге]] — существующая карточка
- [[atlas/! hacks/note-list-tree/note-list-tree|Линии вложенного плана]] — существующая карточка
- [[atlas/! hacks/metadata-no-icons/metadata-no-icons|Без иконок типов]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Tinted sidebar | `colorful-frame` | Палитра | Вариант цветов темы: background-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L13) |
| Dynamic color | `material-color` | Палитра | Выбор согласованной палитры и контраста темы. CSS задаёт цвета поверхностей, текста и акцентов; это контекст рекомендации темы.  | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L18) |
| Disable adaptive mode | `adaptive-mode-off` | Есть карточка | Подтверждено правилом CSS. Оформление интерфейса под операционную систему | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L23) |
| Disable centered tabs | `tab-floating` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок; Вкладки по центру полосы | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L28) |
| Hover ribbon | `hover-ribbon` | Есть карточка | Подтверждено правилом CSS. Лента команд появляется при наведении | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L38) |
| Hover sidebar | `hover-sidedock` | Есть карточка | Подтверждено правилом CSS. Боковая панель появляется при наведении | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L44) |
| Focus view | `focus-view` | Есть карточка | Подтверждено правилом CSS. Режим письма со скрытыми элементами интерфейса | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L50) |
| Disable compact panel actions | `nav-action-center` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Компактные списки служебных панелей | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L56) |
| Disable compact sidebar tabs | `tab-icon` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L60) |
| Disable compact status bar | `status-bar-baseline` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Выборочное скрытие служебных кнопок | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L64) |
| Disable media zoom | `zoom-off` | Есть карточка | Подтверждено правилом CSS. Крупный просмотр изображения при нажатии | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L68) |
| Disable active line highlight | `active-line-off` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L78) |
| Disable banner | `banner-off` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Обложка в верхней части заметки | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L82) |
| Disable block width | `block-width-off` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Таблица шире текстовой полосы | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L86) |
| Disable font variants | `font-variant-off` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Альтернативные формы букв шрифта | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L90) |
| Disable full-width elements | `full-width-media-off` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-image-fluid/note-image-fluid\|Изображение по ширине заметки]] | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L94) |
| Disable quick mode switcher | `mode-switcher-off` | Есть карточка | Подтверждено правилом CSS. Плавающая кнопка переключения чтения и редактирования | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L98) |
| Reduce contrast change | `reduce-contrast-change` | Вариант оформления | Приглушение контраста разделителей и подсветки при наведении; настройка фонового шума интерфейса.  | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L108) |
| Reduce motion | `reduce-motion` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/meta-reduced-motion/meta-reduced-motion\|Уважать уменьшение движения]] | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L113) |
| Standard font size | `dynamic-type-off` | Типографический параметр | Размеры интерфейсного шрифта и значков; стандартные значения вместо динамических.  | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L118) |
| Underlined links | `clean-link-off` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/link-e004/link-e004\|Только цвет — без линии]] | [код](https://github.com/aaaaalexis/obsidian-cupertino/blob/080cea8d2c680c66e26b61b58970e56fd6f30ae4/theme.css#L143) |

## Документация в репозитории

- [README.md](https://github.com/aaaaalexis/obsidian-cupertino/tree/080cea8d2c680c66e26b61b58970e56fd6f30ae4/README.md) — Crafted for the way you think.; Overview; Fresh. Familiar. Focused.; Philosophy; Less is more.; Plugins; [Style Settings](https://github.com/mgmeyers/obsidian-style-settings); [Pseudo Mica](https://github.com/aaaaalexis/obsidian-pseudo-mica); Features; Banner; [Block width](https://minimal.guide/features/block-width); [Cards](https://minimal.guide/Block+types/Cards); Embeds; [Image filters](https://minimal.guide/images#Image+filters); [Image grids](https://minimal.guide/Block+types/Image+grids); [Tables](https://minimal.guide/tables); [Bases](https://minimal.guide/tables); [Alternate checkboxes](https://github.com/damiankorcz/Alternative-Checkboxes-Reference-Set); Credits; License

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
