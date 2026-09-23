# Разбор: Things

[[atlas/! themes/things|Things]] · [Репозиторий на момент проверки](https://github.com/colineckert/obsidian-things/tree/9b8bef93d3919f7693ac78597beaa35bbbd4cfff)

Commit: `9b8bef93d3919f7693ac78597beaa35bbbd4cfff`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 5; документов: 1; CSS-файлов: 2; правил основного CSS разобрано: 172.

## Результат сопоставления

Новых карточек: 7; ранее существовавших приёмов с найденными подтверждениями: 12.

- Плавающая кнопка переключения чтения и редактирования — новая карточка
- Выделение активной строки редактора — новая карточка
- Полностью чёрный фон для OLED — новая карточка
- Номера строк внутри блока кода — новая карточка
- Цвет полосы прогресса по значению — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Состояния задач по символу в квадратных скобках — новая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/heading-e006/heading-e006|Капитель]] — существующая карточка
- [[atlas/! hacks/emphasis-s13/emphasis-s13|Полоса под нижней частью букв]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/code-scroll/code-scroll|Длинные строки с прокруткой]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка
- [[atlas/! hacks/image-e016/image-e016|Мягкое скругление]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/image-e019/image-e019|Приподнятая карточка]] — существующая карточка
- [[atlas/! hacks/unordered-tree/unordered-tree|Линии вложенного плана]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Black mobile background | `mobile-black-background` | Есть карточка | Подтверждено правилом CSS. Полностью чёрный фон для OLED | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1475) |
| Disable mobile floating-action button | `floating-button-off` | Есть карточка | Подтверждено правилом CSS. Плавающая кнопка переключения чтения и редактирования | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1481) |
| Highlight active line | `active-line` | Есть карточка | Подтверждено правилом CSS. Выделение активной строки редактора | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1487) |
| Fancy code blocks | `fancy-code` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Номера строк внутри блока кода | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1493) |
| Fancy highlighting | `fancy-highlight` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/emphasis-s13/emphasis-s13\|13 · Полоса под нижней частью букв]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1499) |
| Disable Kanban board styles | `no-kanban-styles` | Вариант оформления | Пакет оформления Kanban: точечный фон, рамки, отступы и цвета; переключатель возвращает стандартное оформление. Отдельной операции над карточками нет.  | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1505) |
| Default font colors | `default-font-color` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/emphasis-s02/emphasis-s02\|02 · Цветной bold]]; [[atlas/! hacks/emphasis-s03/emphasis-s03\|03 · Цвет вместо курсива]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1533) |
| Progress colorful mode switcher | `progress-color` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Цвет полосы прогресса по значению | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1624) |
| Match underline color to heading color | `heading-underline-color` | Есть карточка | Цвет нижней линии наследуется от соответствующего заголовка; вариант уже имеющегося приёма. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1671) |
| H1 small caps | `h1-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1701) |
| H1 underline | `h1-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1707) |
| H2 underline | `h2-no-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1737) |
| H2 small caps | `h2-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1743) |
| H3 small caps | `h3-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1773) |
| H3 underline | `h3-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1779) |
| H4 small caps | `h4-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1822) |
| H4 underline | `h4-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1828) |
| H5 small caps | `h5-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1858) |
| H5 underline | `h5-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1864) |
| H6 small caps | `h6-small-caps` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e006/heading-e006\|Капитель]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1894) |
| H6 underline | `h6-underline` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/colineckert/obsidian-things/blob/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/theme.css#L1900) |

## Документация в репозитории

- [README.md](https://github.com/colineckert/obsidian-things/tree/9b8bef93d3919f7693ac78597beaa35bbbd4cfff/README.md) — Notes on V1 of this theme; Things 2; Features; Supported Plugins; Checkbox Styling; Basic; Extras; Installation; Obsidian Marketplace (Recommended); Manual; Feedback; Credits; Support

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
