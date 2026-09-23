# Разбор: Tokyo Night

[[atlas/! themes/tokyo-night|Tokyo Night]] · [Репозиторий на момент проверки](https://github.com/tcmmichaelb139/obsidian-tokyonight/tree/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633)

Commit: `a0dcf21666d8a7a1b178f7b8d01648a0fa72a633`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 6; документов: 1; CSS-файлов: 1; правил основного CSS разобрано: 70.

## Результат сопоставления

Новых карточек: 1; ранее существовавших приёмов с найденными подтверждениями: 6.

- Состояния задач по символу в квадратных скобках — новая карточка
- [[atlas/! hacks/heading-e019/heading-e019|Черта на всю ширину]] — существующая карточка
- [[atlas/! hacks/callout-technical-outline/callout-technical-outline|Тонкая рамка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/emphasis-s02/emphasis-s02|Цветной bold]] — существующая карточка
- [[atlas/! hacks/emphasis-s03/emphasis-s03|Цвет вместо курсива]] — существующая карточка
- [[atlas/! hacks/task-e13/task-e13|Зачёркивание]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| disable H1 divider | `h1-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1173) |
| disable H2 divider | `h2-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1209) |
| disable H3 divider | `h3-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1245) |
| disable H4 divider | `h4-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1281) |
| disable H5 divider | `h5-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1317) |
| disable H6 divider | `h6-divider-on` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e019/heading-e019\|Черта на всю ширину]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1353) |
| Disable Alternative Checkboxes | `disable-alternative-checkboxes` | Есть карточка | Подтверждено правилом CSS. Состояния задач по символу в квадратных скобках | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1787) |
| Callout Style | `callout-style-select` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-outline/callout-technical-outline\|Тонкая рамка]] | [код](https://github.com/tcmmichaelb139/obsidian-tokyonight/blob/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/theme.css#L1845) |

## Документация в репозитории

- [README.md](https://github.com/tcmmichaelb139/obsidian-tokyonight/tree/a0dcf21666d8a7a1b178f7b8d01648a0fa72a633/README.md) — Obsidian and Tokyonight; Versions; Light; Storm; Moon; Night; Checkbox Styling ; Credit 

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.


Для отдельных блоков настроек потребовалось извлечение строк после ошибки YAML; такие строки также получили итоговый результат; наличие настройки без применяющего её правила не засчитывается как подтверждение.

[[atlas/! themes/_research/! обзор|Общий обзор]]
