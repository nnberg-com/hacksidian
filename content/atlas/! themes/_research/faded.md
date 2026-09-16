# Разбор: Faded

[[atlas/! themes/faded|Faded]] · [Репозиторий на момент проверки](https://github.com/joshkasap/Obsidian-Faded-Theme/tree/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2)

Commit: `4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2`. Основной файл: `theme.css`. Текстовых файлов в инвентаризации: 4; документов: 1; CSS-файлов: 2; правил основного CSS разобрано: 433.

## Результат сопоставления

Новых карточек: 10; ранее существовавших приёмов с найденными подтверждениями: 10.

- Значки файлов в проводнике — новая карточка
- Обозначение уровня заголовка в редакторе — новая карточка
- Значки папок вместо стрелок дерева — новая карточка
- Размеры и перекрытие панелей в стопке вкладок — новая карточка
- Согласованная палитра синтаксиса кода — новая карточка
- Встроенная заметка без повторного заголовка — новая карточка
- Встроенная заметка без отдельной рамки — новая карточка
- Плавающий заголовок панели заметки — новая карточка
- Выделение активного файла в проводнике — новая карточка
- Примечание без заголовка — новая карточка
- [[atlas/! hacks/list-e047/list-e047|Направляющая вложенности]] — существующая карточка
- [[atlas/! hacks/interface-active-tab/interface-active-tab|Выразительная активная вкладка]] — существующая карточка
- [[atlas/! hacks/callout-margin/callout-margin|Заметка на полях]] — существующая карточка
- [[atlas/! hacks/note-quote-line/note-quote-line|Классическая цитата с линией]] — существующая карточка
- [[atlas/! hacks/table-e007/table-e007|Зебра по строкам]] — существующая карточка
- [[atlas/! hacks/heading-e007/heading-e007|Цвет всего заголовка]] — существующая карточка
- [[atlas/! hacks/code-e002/code-e002|Контур без заливки]] — существующая карточка
- [[atlas/! hacks/note-list-tree/note-list-tree|Линии вложенного плана]] — существующая карточка
- [[atlas/! hacks/heading-e046/heading-e046|Градиент внутри букв]] — существующая карточка
- [[atlas/! hacks/tag-e084/tag-e084|Скрытая решётка в покое]] — существующая карточка

## Реестр настроек

Это полный извлечённый список переключателей и вариантов основного CSS. Не каждая настройка является новым приёмом: здесь есть палитры, параметры уже известных механизмов, служебные пункты и варианты оформления плагинов. Каждый переключатель получил результат. Наличие карточки подтверждает общий механизм, а не полное совпадение внешнего вида.

| Настройка | ID | Результат | Обоснование / карточки | Источник |
|---|---|---|---|---|
| Font | `fonts` | Типографический параметр | Переключаются только значения переменной font.  | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L6) |
| Gradient Bullet Point Lines | `Gradient-Bullet-Point-Lines` | Есть карточка | Подтверждено правилом CSS. [[atlas/! hacks/list-e047/list-e047\|Направляющая вложенности]] | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L29) |
| Check List Strikeout (In Development) | `Check-List-Strikeout` | Переключатель не подтверждён CSS | В настройках ID есть, но ни ID, ни значения class-select не используются в CSS после удаления комментариев. Не выдаём этот переключатель за реализованную возможность текущего commit.  | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L43) |
| Header Icons | `Header-Icons` | Есть карточка | Подтверждено правилом CSS. Обозначение уровня заголовка в редакторе | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L57) |
| Folder Icons | `Folder-Icons` | Есть карточка | Подтверждено правилом CSS. Значки папок вместо стрелок дерева | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L71) |
| File Icons | `File-Icons` | Есть карточка | Подтверждено правилом CSS. Значки файлов в проводнике | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L85) |
| Custom Vault Title | `Vault-Title` | Вариант оформления | Декоративная рамка, тень и отступы названия хранилища; не новое действие или структура данных.  | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L99) |
| Enable Stacked Panes | `Enable-Stacked-Panes` | Есть карточка | Механизм уже описан в каталоге; добавлено подтверждение для этой темы. Размеры и перекрытие панелей в стопке вкладок | [код](https://github.com/joshkasap/Obsidian-Faded-Theme/blob/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/theme.css#L120) |

## Документация в репозитории

- [README.md](https://github.com/joshkasap/Obsidian-Faded-Theme/tree/4dc3b9ba1abe8fb150873bf9c55a7e6d410214a2/README.md) — Obsidian-Faded-Theme; IMPORTANT; Features ; Advanced Sliding Panes; Highlight And Indent/Depress Active Note; Tables; Headers (Header Icons Optional With Style Settings Plugin); Headers Can Also Contain Links To Other Notes Or Tags; Bullet Lists, Numbered Lists, And Checkboxes; Obsidian Admonition/Callouts:; File Tree:; Outliner:; Better Popovers; Support For efemkay's MCL Multi Column Css Snippet; Custom HTML Snippets; Style Settings Options; Supported Plugins; Plugins Planned For Support; Todo List (As of 11-19-2022); Kudos

## Границы проверки

Выполнены инвентаризация документации, извлечение настроек и разбор CSS. Подтверждения в карточках требуют одновременно объявления настройки и применяющего её правила либо явного CSS-механизма. Скриншоты, внешние сайты документации и отдельные demo-vault не просмотрены полностью; поведение на устройстве не проверено. Разбор всех извлечённых переключателей и списков вариантов завершён. Числовые, цветовые и текстовые параметры и заголовки разделов отдельно сохранены в coverage.json; они не считаются новыми приёмами сами по себе.




[[atlas/! themes/_research/! обзор|Общий обзор]]
