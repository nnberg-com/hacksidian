# Исследование 100 тем

Дата: 2026-09-16. Исходная сотня зафиксирована в картотеке по скачиваниям; это не новая выборка.

## Полученные результаты

- 100 репозиториев получены и привязаны к commit.
- 373 Markdown-документов инвентаризировано; 51806 правил основного CSS разобрано.
- **179 новых карточек** с объяснением отличия от исходного каталога. Это возможности тем, без непроверенных применяемых сниппетов.
- Подтверждениями дополнены **137 существующих карточек**.
- **1729 пар «приём — тема»** подтверждены в этом проходе, охватывают **99 тем**. Несколько доказательств для одной пары не увеличивают счётчик.
- Существующие источники и CSS-рецепты сохранены.

## Завершённый объём и ограничения

Проверены **100 из 100 тем** исходной выборки. Реестр содержит **1889 переключателей и списков вариантов**; все получили результат. Остаток очереди: **0**. В продолжении разобраны все 1266 ранее отложенных настроек, включая палитры, типографические параметры и служебные пункты.

Это завершённый разбор зафиксированных исходников, а не гарантия обнаружения каждого возможного сочетания CSS. Проверены основной CSS, объявления настроек и текстовые инструкции; 373 Markdown-файла входят в инвентаризацию, среди них также changelog, лицензии и шаблоны issues. Внешние сайты, отдельные demo-vault и скриншоты не входят в закрываемый реестр. Визуальная проверка в установленном Obsidian не проводилась. У 4 тем строгий CSS-парсер встретил ошибки: засчитаны только отдельно разобранные правила; исходник и ограничение указаны на странице темы.

**Flexoki** — особый результат, а не пропуск: основной CSS содержит две палитры, без самостоятельных правил компоновки. У остальных 99 тем найдены подтверждённые связи с приёмами. Устаревшие настройки без текущего CSS помечены отдельно; они не рекламируются как работающие возможности.

Итоги 1266 решений: связано с карточками — 721; Переключатель не подтверждён CSS — 24; Вариант оформления — 181; Палитра — 222; Типографический параметр — 87; Служебная настройка — 31. Все решения и ссылки доступны на страницах тем.

## Новые карточки

- [[atlas/! hacks/interface-file-name-wrap/interface-file-name-wrap|Полные имена файлов в проводнике]]
- [[atlas/! hacks/interface-folder-colors/interface-folder-colors|Цветовые группы папок в проводнике]]
- [[atlas/! hacks/interface-folder-color-inheritance/interface-folder-color-inheritance|Вложенные папки наследуют цвет раздела]]
- [[atlas/! hacks/interface-file-type-icons/interface-file-type-icons|Значки файлов в проводнике]]
- [[atlas/! hacks/interface-sticky-folder-title/interface-sticky-folder-title|Заголовок папки остаётся видимым при прокрутке]]
- [[atlas/! hacks/interface-tabs-multiple-rows/interface-tabs-multiple-rows|Полоса вкладок раскрывается в несколько строк]]
- [[atlas/! hacks/interface-pinned-tab-compact/interface-pinned-tab-compact|Компактные закреплённые вкладки]]
- [[atlas/! hacks/interface-protect-tab-close/interface-protect-tab-close|Меньше случайных закрытий вкладок]]
- [[atlas/! hacks/interface-pin-control-protection/interface-pin-control-protection|Защита значка закрепления от случайного нажатия]]
- [[atlas/! hacks/interface-tabbar-single-hide/interface-tabbar-single-hide|Не показывать полосу единственной вкладки]]
- [[atlas/! hacks/interface-sidebar-hover/interface-sidebar-hover|Боковая панель появляется при наведении]]
- [[atlas/! hacks/interface-statusbar-hover/interface-statusbar-hover|Строка состояния появляется при наведении]]
- [[atlas/! hacks/interface-floating-note-header/interface-floating-note-header|Плавающий заголовок панели заметки]]
- [[atlas/! hacks/interface-workspace-cards/interface-workspace-cards|Панели рабочего пространства отдельными карточками]]
- [[atlas/! hacks/interface-mobile-drawer-full/interface-mobile-drawer-full|Проводник на весь экран телефона]]
- [[atlas/! hacks/interface-mobile-mode-button/interface-mobile-mode-button|Плавающая кнопка переключения чтения и редактирования]]
- [[atlas/! hacks/interface-active-editor-line/interface-active-editor-line|Выделение активной строки редактора]]
- [[atlas/! hacks/interface-hover-line-marker/interface-hover-line-marker|Маркер строки под указателем]]
- [[atlas/! hacks/interface-outline-threading/interface-outline-threading|Связующие линии в оглавлении заметки]]
- [[atlas/! hacks/interface-hidden-attachments/interface-hidden-attachments|Скрытие вложений из файлового дерева]]
- [[atlas/! hacks/interface-dim-inactive-panes/interface-dim-inactive-panes|Приглушение неактивных панелей]]
- [[atlas/! hacks/image-caption-from-alt/image-caption-from-alt|Подпись изображения из alt-текста]]
- [[atlas/! hacks/image-hold-zoom/image-hold-zoom|Крупный просмотр изображения при нажатии]]
- [[atlas/! hacks/image-dark-mode-dimming/image-dark-mode-dimming|Приглушение ярких изображений в тёмном режиме]]
- [[atlas/! hacks/interface-pdf-dark-invert/interface-pdf-dark-invert|Инверсия страниц PDF в тёмном режиме]]
- [[atlas/! hacks/interface-pdf-dimming/interface-pdf-dimming|Приглушение яркости встроенного PDF]]
- [[atlas/! hacks/code-editor-line-numbers/code-editor-line-numbers|Номера строк внутри блока кода]]
- [[atlas/! hacks/interface-kanban-wrap/interface-kanban-wrap|Колонки Kanban переходят на следующую строку]]
- [[atlas/! hacks/interface-kanban-search-collapse/interface-kanban-search-collapse|Пустые результаты поиска сворачивают колонки Kanban]]
- [[atlas/! hacks/interface-bases-density/interface-bases-density|Компактные таблицы Bases]]
- [[atlas/! hacks/interface-bases-clean-header/interface-bases-clean-header|Упрощённый заголовок Bases]]
- [[atlas/! hacks/interface-canvas-controls/interface-canvas-controls|Canvas без постоянно видимых кнопок]]
- [[atlas/! hacks/interface-canvas-text-center/interface-canvas-text-center|Текст карточки Canvas по центру]]
- [[atlas/! hacks/interface-explorer-density/interface-explorer-density|Компактный файловый проводник]]
- [[atlas/! hacks/interface-relative-line-numbers/interface-relative-line-numbers|Относительные номера строк для Vim]]
- [[atlas/! hacks/interface-hide-source-link-urls/interface-hide-source-link-urls|Скрытые URL ссылок в исходном режиме]]
- [[atlas/! hacks/interface-writing-wordcount/interface-writing-wordcount|Счётчик слов только в заметках для письма]]
- [[atlas/! hacks/interface-writing-focus/interface-writing-focus|Режим письма со скрытыми элементами интерфейса]]
- [[atlas/! hacks/note-seamless-embed/note-seamless-embed|Встроенная заметка без отдельной рамки]]
- [[atlas/! hacks/note-embed-title-hide/note-embed-title-hide|Встроенная заметка без повторного заголовка]]
- [[atlas/! hacks/note-embed-heading-hide/note-embed-heading-hide|Скрытие первого заголовка внутри вставленной заметки]]
- [[atlas/! hacks/note-embed-height/note-embed-height|Ограниченная высота встроенной заметки]]
- [[atlas/! hacks/interface-ribbon-hover/interface-ribbon-hover|Лента команд появляется при наведении]]
- [[atlas/! hacks/interface-markdown-syntax-hide/interface-markdown-syntax-hide|Приглушённая или скрытая разметка Markdown в редакторе]]
- [[atlas/! hacks/interface-heading-level-indicator/interface-heading-level-indicator|Обозначение уровня заголовка в редакторе]]
- [[atlas/! hacks/interface-stacked-tab-spine/interface-stacked-tab-spine|Направление подписей в сложенных вкладках]]
- [[atlas/! hacks/interface-colorblind-palette/interface-colorblind-palette|Палитры для различения цветов интерфейса]]
- [[atlas/! hacks/interface-pdf-background-blend/interface-pdf-background-blend|PDF вписывается в фон темы]]
- [[atlas/! hacks/interface-kanban-full-height/interface-kanban-full-height|Колонки Kanban на полную высоту]]
- [[atlas/! hacks/interface-kanban-sidebar-vertical/interface-kanban-sidebar-vertical|Kanban одной вертикальной колонкой в боковой панели]]
- [[atlas/! hacks/interface-calendar-month-year/interface-calendar-month-year|Перестановка элементов заголовка календаря]]
- [[atlas/! hacks/interface-properties-floating/interface-properties-floating|Свойства заметки в боковом блоке]]
- [[atlas/! hacks/interface-new-note-prominent/interface-new-note-prominent|Заметная кнопка создания заметки]]
- [[atlas/! hacks/interface-dark-sidebar/interface-dark-sidebar|Тёмная боковая панель при светлой заметке]]
- [[atlas/! hacks/interface-notification-position/interface-notification-position|Уведомления в нижнем правом углу]]
- [[atlas/! hacks/interface-settings-horizontal-navigation/interface-settings-horizontal-navigation|Горизонтальная навигация настроек]]
- [[atlas/! hacks/interface-resize-mermaid/interface-resize-mermaid|Изменяемый размер схемы Mermaid]]
- [[atlas/! hacks/interface-hide-editor-comments/interface-hide-editor-comments|Скрытие комментариев в редакторе]]
- [[atlas/! hacks/interface-mini-infobox-edit/interface-mini-infobox-edit|Компактный infobox при редактировании]]
- [[atlas/! hacks/interface-drag-window-area/interface-drag-window-area|Больше места для перетаскивания окна]]
- [[atlas/! hacks/interface-excalidraw-pen-mode/interface-excalidraw-pen-mode|Режим пера в интерфейсе Excalidraw]]
- [[atlas/! hacks/interface-memos-input-bottom/interface-memos-input-bottom|Поле ввода Memos внизу панели]]
- [[atlas/! hacks/interface-desktop-mode-button/interface-desktop-mode-button|Плавающий переключатель режима на компьютере]]
- [[atlas/! hacks/task-alternative-markers/task-alternative-markers|Состояния задач по символу в квадратных скобках]]
- [[atlas/! hacks/interface-dataview-trim/interface-dataview-trim|Обрезка длинных значений в таблице Dataview]]
- [[atlas/! hacks/interface-bases-readonly/interface-bases-readonly|Защита ячеек Bases от случайного редактирования]]
- [[atlas/! hacks/interface-sticky-backlinks/interface-sticky-backlinks|Обратные ссылки в закреплённой нижней области]]
- [[atlas/! hacks/interface-auto-wide-tables/interface-auto-wide-tables|Широкая заметка автоматически при наличии таблицы]]
- [[atlas/! hacks/interface-properties-hidden/interface-properties-hidden|Скрытые свойства в режиме чтения]]
- [[atlas/! hacks/interface-properties-before-title/interface-properties-before-title|Свойства перед заголовком заметки]]
- [[atlas/! hacks/interface-sidebar-overlay/interface-sidebar-overlay|Боковая панель поверх заметки]]
- [[atlas/! hacks/interface-folder-icons/interface-folder-icons|Значки папок вместо стрелок дерева]]
- [[atlas/! hacks/interface-filetree-lines/interface-filetree-lines|Связующие линии файлового дерева]]
- [[atlas/! hacks/interface-panel-blur/interface-panel-blur|Размытие фона за всплывающими панелями]]
- [[atlas/! hacks/interface-pdf-seamless/interface-pdf-seamless|PDF без рамок между страницами]]
- [[atlas/! hacks/interface-workspace-background/interface-workspace-background|Фоновое изображение рабочего пространства]]
- [[atlas/! hacks/interface-kanban-search-filter/interface-kanban-search-filter|Скрывать карточки Kanban вне результатов поиска]]
- [[atlas/! hacks/interface-image-no-drag/interface-image-no-drag|Изображение без случайного перетаскивания]]
- [[atlas/! hacks/interface-hide-scrollbars/interface-hide-scrollbars|Рабочая область без видимых полос прокрутки]]
- [[atlas/! hacks/interface-statusbar-top/interface-statusbar-top|Строка состояния у верхнего края окна]]
- [[atlas/! hacks/interface-terminal-prompts/interface-terminal-prompts|Терминальные подсказки вместо привычных значков]]
- [[atlas/! hacks/note-hover-sidenote/note-hover-sidenote|Примечание на полях раскрывается при наведении]]
- [[atlas/! hacks/note-footer-illustration/note-footer-illustration|Последнее изображение становится подвалом заметки]]
- [[atlas/! hacks/note-movie-script/note-movie-script|Заметка в формате киносценария]]
- [[atlas/! hacks/list-visual-reverse/list-visual-reverse|Визуальный разворот списка на выбранной глубине]]
- [[atlas/! hacks/callout-cards-fan/callout-cards-fan|Изображения колодой карт]]
- [[atlas/! hacks/callout-masonry-images/callout-masonry-images|Галерея с колонками разной высоты]]
- [[atlas/! hacks/callout-data-heading/callout-data-heading|Данные и портрет в шапке примечания]]
- [[atlas/! hacks/interface-audio-cassette/interface-audio-cassette|Аудиовложение в виде кассеты]]
- [[atlas/! hacks/callout-retro-device/callout-retro-device|Примечание в корпусе ретроустройства]]
- [[atlas/! hacks/interface-edit-links-on-click/interface-edit-links-on-click|Клик по ссылке для редактирования в Live Preview]]
- [[atlas/! hacks/interface-edit-tags-on-click/interface-edit-tags-on-click|Клик по тегу для редактирования]]
- [[atlas/! hacks/task-symbols-nonclickable/task-symbols-nonclickable|Символы задач без переключения кликом]]
- [[atlas/! hacks/metadata-no-placeholder/metadata-no-placeholder|Пустые свойства без текста-подсказки]]
- [[atlas/! hacks/metadata-list-vertical/metadata-list-vertical|Значения свойства отдельными строками]]
- [[atlas/! hacks/interface-hide-controls/interface-hide-controls|Выборочное скрытие служебных кнопок]]
- [[atlas/! hacks/code-syntax-palette/code-syntax-palette|Согласованная палитра синтаксиса кода]]
- [[atlas/! hacks/interface-oled-black/interface-oled-black|Полностью чёрный фон для OLED]]
- [[atlas/! hacks/interface-eink-mode/interface-eink-mode|Монохромный режим для E-ink]]
- [[atlas/! hacks/interface-floating-search/interface-floating-search|Плавающая строка поиска внутри заметки]]
- [[atlas/! hacks/interface-labeled-sidebar-tabs/interface-labeled-sidebar-tabs|Боковые вкладки с текстовыми подписями]]
- [[atlas/! hacks/interface-popup-file-explorer/interface-popup-file-explorer|Файловый проводник как всплывающая панель]]
- [[atlas/! hacks/interface-platform-adaptive/interface-platform-adaptive|Оформление интерфейса под операционную систему]]
- [[atlas/! hacks/text-stylistic-alternates/text-stylistic-alternates|Альтернативные формы букв шрифта]]
- [[atlas/! hacks/footnote-opentype-superscript/footnote-opentype-superscript|Настоящие надстрочные глифы в сносках]]
- [[atlas/! hacks/text-equation-number-style/text-equation-number-style|Единый вид номеров формул]]
- [[atlas/! hacks/interface-bases-embed-height/interface-bases-embed-height|Встроенная Bases ограниченной высоты]]
- [[atlas/! hacks/note-embed-underline/note-embed-underline|Подчёркнутый заимствованный текст]]
- [[atlas/! hacks/interface-vault-profile-position/interface-vault-profile-position|Расположение меню хранилища]]
- [[atlas/! hacks/interface-ribbon-floating/interface-ribbon-floating|Плавающая лента инструментов]]
- [[atlas/! hacks/interface-animation-control/interface-animation-control|Скорость и отключение анимации темы]]
- [[atlas/! hacks/interface-hide-duplicate-h1/interface-hide-duplicate-h1|Скрытие H1 после блока свойств]]
- [[atlas/! hacks/interface-kanban-card-min-height/interface-kanban-card-min-height|Минимальная высота карточек Kanban]]
- [[atlas/! hacks/table-no-wrap/table-no-wrap|Таблица без переноса содержимого ячеек]]
- [[atlas/! hacks/table-full-width/table-full-width|Таблица шире текстовой полосы]]
- [[atlas/! hacks/interface-folder-bold/interface-folder-bold|Полужирные имена папок]]
- [[atlas/! hacks/interface-progress-color/interface-progress-color|Цвет полосы прогресса по значению]]
- [[atlas/! hacks/table-column-lines/table-column-lines|Только вертикальные разделители таблицы]]
- [[atlas/! hacks/callout-no-title/callout-no-title|Примечание без заголовка]]
- [[atlas/! hacks/interface-header-actions-left/interface-header-actions-left|Кнопки заметки слева от заголовка]]
- [[atlas/! hacks/interface-panel-density/interface-panel-density|Компактные списки служебных панелей]]
- [[atlas/! hacks/interface-panel-transparency/interface-panel-transparency|Полупрозрачные панели]]
- [[atlas/! hacks/interface-open-folder-highlight/interface-open-folder-highlight|Фон у раскрытой папки]]
- [[atlas/! hacks/interface-stacked-pane-sizing/interface-stacked-pane-sizing|Размеры и перекрытие панелей в стопке вкладок]]
- [[atlas/! hacks/interface-floating-line-numbers/interface-floating-line-numbers|Плавающая колонка номеров строк]]
- [[atlas/! hacks/text-math-outline/text-math-outline|Рамка у математического блока]]
- [[atlas/! hacks/metadata-pill-values/metadata-pill-values|Значения свойств в виде капсул]]
- [[atlas/! hacks/interface-title-click-protection/interface-title-click-protection|Защита названия заметки от случайного клика]]
- [[atlas/! hacks/interface-root-file-separators/interface-root-file-separators|Разделители файлов в корне хранилища]]
- [[atlas/! hacks/interface-tabs-centered/interface-tabs-centered|Вкладки по центру полосы]]
- [[atlas/! hacks/interface-note-top-space/interface-note-top-space|Свободное место перед началом заметки]]
- [[atlas/! hacks/interface-ui-icons/interface-ui-icons|Согласованный набор значков интерфейса]]
- [[atlas/! hacks/interface-attachment-order/interface-attachment-order|Порядок подписи и расширения вложения]]
- [[atlas/! hacks/callout-quote-attribution/callout-quote-attribution|Цитата с подписью автора под текстом]]
- [[atlas/! hacks/interface-native-hover-preview/interface-native-hover-preview|Оформление всплывающего предпросмотра]]
- [[atlas/! hacks/interface-note-banner/interface-note-banner|Обложка в верхней части заметки]]
- [[atlas/! hacks/interface-settings-search-layout/interface-settings-search-layout|Компоновка окна настроек]]
- [[atlas/! hacks/interface-scrollbar-style/interface-scrollbar-style|Размер и форма полос прокрутки]]
- [[atlas/! hacks/interface-cursor-style/interface-cursor-style|Форма и цвет курсора редактора]]
- [[atlas/! hacks/interface-table-cell-wrap/interface-table-cell-wrap|Перенос длинного содержимого таблиц]]
- [[atlas/! hacks/interface-canvas-card-style/interface-canvas-card-style|Оформление карточек Canvas]]
- [[atlas/! hacks/interface-mobile-navbar/interface-mobile-navbar|Компоновка мобильной панели команд]]
- [[atlas/! hacks/interface-editor-width/interface-editor-width|Ширина текстовой полосы заметки]]
- [[atlas/! hacks/interface-heading-fold-control/interface-heading-fold-control|Положение маркера сворачивания заголовка]]
- [[atlas/! hacks/interface-inline-title-style/interface-inline-title-style|Оформление названия файла над заметкой]]
- [[atlas/! hacks/interface-controls-hover/interface-controls-hover|Служебные элементы появляются при наведении]]
- [[atlas/! hacks/interface-clipped-corners/interface-clipped-corners|Срезанные углы панелей]]
- [[atlas/! hacks/note-aside-counter/note-aside-counter|Автоматическая нумерация боковых примечаний]]
- [[atlas/! hacks/interface-corner-smoothing/interface-corner-smoothing|Непрерывное скругление углов Electron]]
- [[atlas/! hacks/interface-clickable-line-width/interface-clickable-line-width|Расширенная область клика по строке редактора]]
- [[atlas/! hacks/interface-vault-title-sticky/interface-vault-title-sticky|Название хранилища закреплено над проводником]]
- [[atlas/! hacks/interface-sidebar-actions-position/interface-sidebar-actions-position|Команды боковой панели сверху или снизу]]
- [[atlas/! hacks/interface-statusbar-position/interface-statusbar-position|Положение и выравнивание строки состояния]]
- [[atlas/! hacks/callout-fold-position/callout-fold-position|Кнопка сворачивания в углу примечания]]
- [[atlas/! hacks/interface-kanban-sort-expand/interface-kanban-sort-expand|Раскрытие Kanban на время сортировки]]
- [[atlas/! hacks/interface-print-neutral/interface-print-neutral|Нейтральные цвета при печати]]
- [[atlas/! hacks/metadata-position/metadata-position|Свойства до или после текста заметки]]
- [[atlas/! hacks/interface-focused-list-level/interface-focused-list-level|Подсветка текущего уровня списка]]
- [[atlas/! hacks/callout-selective-hide/callout-selective-hide|Скрытие отдельных типов примечаний]]
- [[atlas/! hacks/interface-plugin-cards/interface-plugin-cards|Список плагинов карточками]]
- [[atlas/! hacks/text-italic-skew/text-italic-skew|Дополнительный наклон курсивного текста]]
- [[atlas/! hacks/interface-note-bottom-space/interface-note-bottom-space|Свободное место после конца заметки]]
- [[atlas/! hacks/interface-pinned-tabs-first/interface-pinned-tabs-first|Закреплённые вкладки в начале полосы]]
- [[atlas/! hacks/note-embed-width/note-embed-width|Независимая ширина встроенных объектов]]
- [[atlas/! hacks/heading-clear-floats/heading-clear-floats|Заголовок завершает обтекание изображения]]
- [[atlas/! hacks/task-state-decoration/task-state-decoration|Оформление текста по состоянию задачи]]
- [[atlas/! hacks/interface-background-scroll/interface-background-scroll|Фон прокручивается вместе с заметкой]]
- [[atlas/! hacks/interface-folder-note-marker/interface-folder-note-marker|Отметка папки с собственной заметкой]]
- [[atlas/! hacks/note-embed-hover-lift/note-embed-hover-lift|Встроенная заметка приподнимается при наведении]]
- [[atlas/! hacks/interface-loading-animation/interface-loading-animation|Оформление экрана загрузки]]
- [[atlas/! hacks/interface-file-name-marquee/interface-file-name-marquee|Длинное имя файла прокручивается при наведении]]
- [[atlas/! hacks/interface-titlebar-button-order/interface-titlebar-button-order|Обратный порядок оконных кнопок]]
- [[atlas/! hacks/interface-active-file/interface-active-file|Выделение активного файла в проводнике]]
- [[atlas/! hacks/task-ascii-marker/task-ascii-marker|Текстовые отметки задач [ ] и [x]]]
- [[atlas/! hacks/interface-explorer-columns/interface-explorer-columns|Файловый проводник в несколько колонок]]
- [[atlas/! hacks/interface-sidebar-auto-narrow/interface-sidebar-auto-narrow|Боковые панели скрываются в узком окне]]
- [[atlas/! hacks/callout-toggle-minimal/callout-toggle-minimal|Сворачиваемое примечание как простой переключатель]]
- [[atlas/! hacks/interface-vim-mode-color/interface-vim-mode-color|Цвет режима Vim в строке состояния]]
- [[atlas/! hacks/emphasis-pseudo-redaction/emphasis-pseudo-redaction|Визуальная цензура фрагмента текста]]

## Покрытие по темам

| № | Тема | Новые | Существующие | Без результата |
|---|---|---:|---:|---:|
| 1 | [[atlas/! themes/_research/minimal|Minimal]] | 21 | 28 | 0 |
| 2 | [[atlas/! themes/_research/things|Things]] | 7 | 12 | 0 |
| 3 | [[atlas/! themes/_research/anuppuccin|AnuPpuccin]] | 26 | 17 | 0 |
| 4 | [[atlas/! themes/_research/blue-topaz|Blue Topaz]] | 52 | 50 | 0 |
| 5 | [[atlas/! themes/_research/obsidian-nord|Obsidian Nord]] | 1 | 6 | 0 |
| 6 | [[atlas/! themes/_research/atom|Atom]] | 1 | 1 | 0 |
| 7 | [[atlas/! themes/_research/obsidianite|Obsidianite]] | 3 | 9 | 0 |
| 8 | [[atlas/! themes/_research/wasp|Wasp]] | 0 | 2 | 0 |
| 9 | [[atlas/! themes/_research/typewriter|Typewriter]] | 3 | 1 | 0 |
| 10 | [[atlas/! themes/_research/its-theme|ITS Theme]] | 25 | 32 | 0 |
| 11 | [[atlas/! themes/_research/obsidian-gruvbox|Obsidian gruvbox]] | 1 | 6 | 0 |
| 12 | [[atlas/! themes/_research/primary|Primary]] | 13 | 8 | 0 |
| 13 | [[atlas/! themes/_research/shimmering-focus|Shimmering Focus]] | 16 | 14 | 0 |
| 14 | [[atlas/! themes/_research/catppuccin|Catppuccin]] | 7 | 6 | 0 |
| 15 | [[atlas/! themes/_research/willemstad|Willemstad]] | 31 | 16 | 0 |
| 16 | [[atlas/! themes/_research/prism|Prism]] | 18 | 11 | 0 |
| 17 | [[atlas/! themes/_research/border|Border]] | 28 | 17 | 0 |
| 18 | [[atlas/! themes/_research/tokyo-night|Tokyo Night]] | 1 | 6 | 0 |
| 19 | [[atlas/! themes/_research/dracula-for-obsidian|Dracula for Obsidian]] | 2 | 4 | 0 |
| 20 | [[atlas/! themes/_research/sanctum|Sanctum]] | 15 | 23 | 0 |
| 21 | [[atlas/! themes/_research/everforest|Everforest]] | 1 | 1 | 0 |
| 22 | [[atlas/! themes/_research/github-theme|GitHub Theme]] | 4 | 4 | 0 |
| 23 | [[atlas/! themes/_research/cybertron|Cybertron]] | 2 | 4 | 0 |
| 24 | [[atlas/! themes/_research/solarized|Solarized]] | 3 | 1 | 0 |
| 25 | [[atlas/! themes/_research/cupertino|Cupertino]] | 18 | 18 | 0 |
| 26 | [[atlas/! themes/_research/notation|Notation]] | 2 | 4 | 0 |
| 27 | [[atlas/! themes/_research/typomagical|Typomagical]] | 6 | 9 | 0 |
| 28 | [[atlas/! themes/_research/terminal|Terminal]] | 4 | 0 | 0 |
| 29 | [[atlas/! themes/_research/ono-sendai|Ono Sendai]] | 4 | 8 | 0 |
| 30 | [[atlas/! themes/_research/shiba-inu|Shiba Inu]] | 16 | 16 | 0 |
| 31 | [[atlas/! themes/_research/encore|Encore]] | 6 | 13 | 0 |
| 32 | [[atlas/! themes/_research/pln|PLN]] | 21 | 11 | 0 |
| 33 | [[atlas/! themes/_research/pink-topaz|Pink Topaz]] | 2 | 16 | 0 |
| 34 | [[atlas/! themes/_research/dracula-official|Dracula Official]] | 2 | 5 | 0 |
| 35 | [[atlas/! themes/_research/cyber-glow|Cyber Glow]] | 13 | 14 | 0 |
| 36 | [[atlas/! themes/_research/obuntu|Obuntu]] | 3 | 8 | 0 |
| 37 | [[atlas/! themes/_research/ukiyo|Ukiyo]] | 9 | 9 | 0 |
| 38 | [[atlas/! themes/_research/baseline|Baseline]] | 38 | 33 | 0 |
| 39 | [[atlas/! themes/_research/material-gruvbox|Material Gruvbox]] | 1 | 6 | 0 |
| 40 | [[atlas/! themes/_research/yin-and-yang|Yin and Yang]] | 18 | 17 | 0 |
| 41 | [[atlas/! themes/_research/red-graphite|Red Graphite]] | 1 | 1 | 0 |
| 42 | [[atlas/! themes/_research/royal-velvet|Royal Velvet]] | 2 | 8 | 0 |
| 43 | [[atlas/! themes/_research/golden-topaz|Golden Topaz]] | 2 | 16 | 0 |
| 44 | [[atlas/! themes/_research/obsidianotion|Obsidianotion]] | 2 | 4 | 0 |
| 45 | [[atlas/! themes/_research/lyt-mode|LYT Mode]] | 4 | 11 | 0 |
| 46 | [[atlas/! themes/_research/retroma|Retroma]] | 6 | 14 | 0 |
| 47 | [[atlas/! themes/_research/maple|Maple]] | 40 | 28 | 0 |
| 48 | [[atlas/! themes/_research/dark-moss|Dark Moss]] | 0 | 2 | 0 |
| 49 | [[atlas/! themes/_research/sodalite|Sodalite]] | 4 | 2 | 0 |
| 50 | [[atlas/! themes/_research/flexoki|Flexoki]] | 0 | 0 | 0 |
| 51 | [[atlas/! themes/_research/ultra-lobster|Ultra Lobster]] | 25 | 31 | 0 |
| 52 | [[atlas/! themes/_research/reverie|Reverie]] | 1 | 1 | 0 |
| 53 | [[atlas/! themes/_research/dune|Dune]] | 21 | 28 | 0 |
| 54 | [[atlas/! themes/_research/light-bright|Light & Bright]] | 0 | 6 | 0 |
| 55 | [[atlas/! themes/_research/vanilla-amoled|Vanilla AMOLED]] | 1 | 0 | 0 |
| 56 | [[atlas/! themes/_research/discordian|Discordian]] | 3 | 5 | 0 |
| 57 | [[atlas/! themes/_research/notation-2|Notation 2]] | 5 | 8 | 0 |
| 58 | [[atlas/! themes/_research/kakano|Kakano]] | 14 | 10 | 0 |
| 59 | [[atlas/! themes/_research/sandstorm|Sandstorm]] | 6 | 16 | 0 |
| 60 | [[atlas/! themes/_research/wy-console|WY Console]] | 1 | 4 | 0 |
| 61 | [[atlas/! themes/_research/wikipedia|Wikipedia]] | 4 | 9 | 0 |
| 62 | [[atlas/! themes/_research/obsidiania|obsidian_ia]] | 0 | 3 | 0 |
| 63 | [[atlas/! themes/_research/underwater|Underwater]] | 15 | 17 | 0 |
| 64 | [[atlas/! themes/_research/typora-vue|Typora-Vue]] | 1 | 4 | 0 |
| 65 | [[atlas/! themes/_research/velocity|Velocity]] | 18 | 10 | 0 |
| 66 | [[atlas/! themes/_research/blackbird|Blackbird]] | 0 | 1 | 0 |
| 67 | [[atlas/! themes/_research/wyrd|Wyrd]] | 1 | 8 | 0 |
| 68 | [[atlas/! themes/_research/nier|Nier]] | 2 | 5 | 0 |
| 69 | [[atlas/! themes/_research/everforest-enchanted|Everforest Enchanted]] | 19 | 18 | 0 |
| 70 | [[atlas/! themes/_research/aura|Aura]] | 15 | 8 | 0 |
| 71 | [[atlas/! themes/_research/apex|Apex]] | 5 | 0 | 0 |
| 72 | [[atlas/! themes/_research/gitsidian|Gitsidian]] | 0 | 5 | 0 |
| 73 | [[atlas/! themes/_research/dracula-lyt|Dracula + LYT]] | 5 | 11 | 0 |
| 74 | [[atlas/! themes/_research/vauxhall|Vauxhall]] | 0 | 2 | 0 |
| 75 | [[atlas/! themes/_research/moonlight|Moonlight]] | 0 | 2 | 0 |
| 76 | [[atlas/! themes/_research/fancy-a-story|Fancy-a-Story]] | 23 | 23 | 0 |
| 77 | [[atlas/! themes/_research/origami|Origami]] | 7 | 12 | 0 |
| 78 | [[atlas/! themes/_research/vicious|Vicious]] | 4 | 10 | 0 |
| 79 | [[atlas/! themes/_research/transparent|Transparent]] | 6 | 5 | 0 |
| 80 | [[atlas/! themes/_research/comfort-color-dark|Comfort color dark]] | 1 | 3 | 0 |
| 81 | [[atlas/! themes/_research/material-flat|Material Flat]] | 14 | 4 | 0 |
| 82 | [[atlas/! themes/_research/dawn|Dawn]] | 2 | 7 | 0 |
| 83 | [[atlas/! themes/_research/nebula|Nebula]] | 1 | 3 | 0 |
| 84 | [[atlas/! themes/_research/ebullientworks|Ebullientworks]] | 8 | 10 | 0 |
| 85 | [[atlas/! themes/_research/pisum|Pisum]] | 4 | 4 | 0 |
| 86 | [[atlas/! themes/_research/faded|Faded]] | 10 | 10 | 0 |
| 87 | [[atlas/! themes/_research/simple|Simple]] | 4 | 4 | 0 |
| 88 | [[atlas/! themes/_research/dark-graphite-pie|Dark Graphite Pie]] | 1 | 3 | 0 |
| 89 | [[atlas/! themes/_research/soft-paper|Soft Paper]] | 11 | 7 | 0 |
| 90 | [[atlas/! themes/_research/bolt|Bolt]] | 2 | 2 | 0 |
| 91 | [[atlas/! themes/_research/kanagawa|Kanagawa]] | 0 | 6 | 0 |
| 92 | [[atlas/! themes/_research/pine-forest-berry|Pine Forest Berry]] | 3 | 7 | 0 |
| 93 | [[atlas/! themes/_research/sparkling-night|Sparkling Night]] | 2 | 4 | 0 |
| 94 | [[atlas/! themes/_research/material-ocean|Material Ocean]] | 2 | 2 | 0 |
| 95 | [[atlas/! themes/_research/adwaita|Adwaita]] | 2 | 1 | 0 |
| 96 | [[atlas/! themes/_research/zen|Zen]] | 7 | 7 | 0 |
| 97 | [[atlas/! themes/_research/retronotes|RetroNotes]] | 0 | 3 | 0 |
| 98 | [[atlas/! themes/_research/autotape|Autotape]] | 0 | 3 | 0 |
| 99 | [[atlas/! themes/_research/composer|Composer]] | 8 | 11 | 0 |
| 100 | [[atlas/! themes/_research/lagom|Lagom]] | 9 | 16 | 0 |

## Воспроизведение

Зафиксированные репозитории и commit находятся в inventory.json. Исходники временно лежат в /tmp/hacksidian-theme-survey; в проект не копируются. fetch.py повторно использует зафиксированные commit.

1. Установить зависимости plugin согласно проекту.
2. Выполнить python3 tools/theme-survey/fetch.py.
3. Выполнить node tools/theme-survey/index.mjs (полный индекс создаётся в /tmp).
4. Сопоставления заданы в tools/theme-survey/features.json, static-rules.json и docs/research/theme-survey/decisions.json; проверять и настройку, и действующую реализацию, а для примеров — документ и CSS.
5. Выполнить node tools/theme-survey/review.mjs, затем node tools/theme-survey/document-review.mjs и node tools/theme-survey/publish.mjs /path/to/atlas.
6. Выполнить node tools/theme-catalog/build.mjs /path/to/atlas.
7. Проверить node tools/theme-survey/verify.mjs, node tools/verify-recipe-catalog.mjs и node plugin/scripts/catalog-check.mjs.

coverage.json содержит полный извлечённый реестр настроек, findings.json — опубликованные доказательства. decisions.json содержит обоснования всех 1266 решений продолжения; remaining.json пуст. documentation-review.json хранит хеши документов и итог по каждой теме. Отчёты не индексируются как карточки приёмов. Перед расширением правил сопоставления проверяйте ложные совпадения: CSS настроек самого Style Settings, обратные переключатели, мобильные условия, вложенные селекторы и правила-исключения.
