# Разбор: Typomagical

[[atlas/! themes/typomagical|Typomagical]] · [Репозиторий на момент проверки](https://github.com/hungsu/typomagical-obsidian/tree/403987c83fb8a70e0d0ce480799e2dadfda4da6f)

Commit: `403987c83fb8a70e0d0ce480799e2dadfda4da6f`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 33; документов: 4; CSS-файлов: 1; правил основного CSS разобрано: 191.

## Результат сопоставления

Новых карточек: 6; ранее существовавших приёмов с найденными подтверждениями: 9.

- Подпись изображения из alt-текста — новая карточка
- Крупный просмотр изображения при нажатии — новая карточка
- Выборочное скрытие служебных кнопок — новая карточка
- Оформление названия файла над заметкой — новая карточка
- Цитата с подписью автора под текстом — новая карточка
- Полные имена файлов в проводнике — новая карточка
- [[atlas/! hacks/heading-e046/heading-e046|Градиент внутри букв]] — существующая карточка
- [[atlas/! hacks/heading-e074/heading-e074|Лигатуры]] — существующая карточка
- [[atlas/! hacks/note-hierarchy/note-hierarchy|Шкала заголовков H1–H6]] — существующая карточка
- [[atlas/! hacks/list-ordered-o017/list-ordered-o017|Круглый номер]] — существующая карточка
- [[atlas/! hacks/note-quote-pull/note-quote-pull|Крупная цитата-врезка]] — существующая карточка
- [[atlas/! hacks/callout-technical-gradient/callout-technical-gradient|Градиентная рамка]] — существующая карточка
- [[atlas/! hacks/emphasis-s17/emphasis-s17|17 · Градиентная подложка]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/image-e006/image-e006|По центру]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Title alignment | `alignment-title` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. Оформление названия файла над заметкой | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L618) |
| Title gradient | `title-gradient` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e046/heading-e046\|Градиент внутри букв]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L631) |
| Heading scale | `text-scale` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. [[atlas/! hacks/note-hierarchy/note-hierarchy\|Шкала заголовков H1–H6]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L654) |
| Source mode heading size reset | `source-mode-headings-regular` | Есть карточка | Настройка сопоставлена с механизмом каталога по назначению и действующим CSS-свойствам. Конкретный селектор и свойство сохранены для проверки. [[atlas/! hacks/note-hierarchy/note-hierarchy\|Шкала заголовков H1–H6]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L677) |
| Heading ligatures | `heading-ligatures` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/heading-e074/heading-e074\|Лигатуры]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L691) |
| Image captions | `ss-image-caption` | Есть карточка | Подтверждено правилом CSS. Подпись изображения из alt-текста | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L806) |
| Disable image zoom | `ss-zoom-off` | Есть карточка | Подтверждено правилом CSS. Крупный просмотр изображения при нажатии | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L811) |
| Text Ligatures | `body-ligatures` | Типографический параметр | Включение стандартных лигатур liga; это не стилистические альтернативы букв.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1859) |
| MathJax font | `mjx-font` | Типографический параметр | Настройка типографических параметров: font-family. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1864) |
| List numbers | `ordered-lists` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/list-ordered-o017/list-ordered-o017\|Круглый номер]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1877) |
| Link font | `link-font` | Типографический параметр | Настройка типографических параметров: --font-links. Отдельного способа взаимодействия или структуры блока не добавляет.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1930) |
| Blockquotes | `blockquote` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/note-quote-pull/note-quote-pull\|Крупная цитата-врезка]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1946) |
| Callout style | `callout-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/callout-technical-gradient/callout-technical-gradient\|Градиентная рамка]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1962) |
| Quote Callout style | `callout-quote-style` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Цитата с подписью автора под текстом | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1977) |
| Alignment | `alignment` | Типографический параметр | Выключка абзацев по ширине через text-align: justify; типографический вариант.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1983) |
| Hide external link icons | `ss-hide-external-link-icon` | Есть карточка | Подтверждено правилом CSS. Выборочное скрытие служебных кнопок | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L1996) |
| Solid background for highlights | `ss-revert-highlight` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. [[atlas/! hacks/emphasis-s17/emphasis-s17\|17 · Градиентная подложка]] | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L2000) |
| Theme variant | `theme-variant` | Вариант оформления | Палитры, контраст и декоративная SVG-текстура фона; объединённый внешний вид темы.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L2048) |
| Allow Background color override | `background-color-enable` | Палитра | Вариант цветов темы: --background-primary, --ss-background-color. Механизм размещения и взаимодействия не изменяется.  | [код](https://github.com/hungsu/typomagical-obsidian/blob/403987c83fb8a70e0d0ce480799e2dadfda4da6f/theme.css#L2080) |

## Документация в репозитории

- [.github/ISSUE_TEMPLATE/bug_report.md](https://github.com/hungsu/typomagical-obsidian/tree/403987c83fb8a70e0d0ce480799e2dadfda4da6f/.github/ISSUE_TEMPLATE/bug_report.md)
- [CONTRIBUTING.md](https://github.com/hungsu/typomagical-obsidian/tree/403987c83fb8a70e0d0ce480799e2dadfda4da6f/CONTRIBUTING.md) — How to contribute to this repository
- [README.md](https://github.com/hungsu/typomagical-obsidian/tree/403987c83fb8a70e0d0ce480799e2dadfda4da6f/README.md) — Typomagical for Obsidian; Features; How to use it; Installing extra font weights; Recent changes; Further reading
- [decisions.md](https://github.com/hungsu/typomagical-obsidian/tree/403987c83fb8a70e0d0ce480799e2dadfda4da6f/decisions.md) — Decisions
; 1. Decision log
; Options
; Decision
; Reasoning
; 2. CSS Preprocessor
; Options
; Decision
; Reasoning
; Consequences
; 3. File watcher and mover
; Options
; Decision
; Reasoning
; Consequences

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.


Для отдельных блоков настроек потребовалось извлечение строк после ошибки YAML; такие строки также получили итоговый результат; наличие настройки без применяющего её правила не засчитывается как подтверждение.

[[atlas/! themes/_research/! обзор|Общий обзор]]
