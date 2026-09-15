# Интерфейс и метанастройки: отбор практик

Дата: 2026-09-11. Результат: 16 новых приёмов, по 8 в `interface` и `meta`. Полный список с описаниями и источниками — в `interface-meta-selection.json` и карточках Obsidian.

Отбор редакционный: практическая польза, понятный эффект, небольшой CSS, отсутствие обязательных сторонних плагинов и возможность ограничить действие оформленной заметкой. Это не рейтинг популярности и не утверждение, что подборка исчерпывающая.

## Что вошло

**Интерфейс:** рамка панели с DOM-фокусом; различимая активная вкладка; увеличенная ширина названий вкладок; приглушение действий до hover/focus; перенос длинного пути; увеличенные области нажатия; отдельная поверхность заголовка; клавиатурный фокус.

Основы — [переменные вкладок Obsidian](https://docs.obsidian.md/Reference/CSS%20variables/Components/Tabs), [стилизация через переменные](https://docs.obsidian.md/Reference/CSS%20variables/About%20styling), [семантические цвета](https://docs.obsidian.md/Reference/CSS%20variables/Foundations/Colors) и [focus-visible](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:focus-visible). [Focus mode в Minimal](https://github.com/kepano/obsidian-minimal/blob/master/docs/Plugins/Minimal%20Theme%20Settings.md) использован как источник практики уменьшения шума. Реализация для атласа самостоятельная: она приглушает действия одной панели и восстанавливает видимость с клавиатуры; код Minimal не скопирован.

**Платформы:** container query для узкой панели; системное уменьшение движения; coarse pointer; адреса внешних ссылок в печати; правила разбиения на страницы; повышенный контраст; следование теме Obsidian; progressive enhancement через @supports.

Принципы проверены по первичным справочным материалам MDN: [container queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Containment/Container_queries), [reduced motion](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion), [pointer](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/pointer), [contrast](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-contrast), [печать](https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Media_queries/Printing), [@supports](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@supports).

## Что отложено

- Автоматизация workspace, горячих клавиш и переключения режимов: CSS не выполняет команды Obsidian.
- Глобальное скрытие ribbon/status bar: требует иной области действия и может убрать нужное управление.
- Имитация устройства по ширине экрана: ширина окна не определяет способ ввода.
- Загрузка CSS по @import и внешних ресурсов: не соответствует локальному контракту apply-hack.
- Утверждения о соответствии WCAG по одному цвету или размеру кнопки: требуется отдельная проверка результата.

## Доказательства и пределы

Все 16 шаблонов проходят действующий `compileHack` плагина, включая ограничения области действия и внешних ресурсов. Валидатор атласа видит 1411 приёмов. Новые описания и примеры есть на русском и английском. Приёмы для печатных материалов добавлены в `teach`, сенсорные задачи — в `todo`.

У интерфейсных приёмов два отдельных набора привязок в hack.json: компактная HTML-модель и реальные селекторы Obsidian. Модель помечена на экране; её кнопки показывают фокус, но не выполняют команды. Наличие `.workspace-leaf`, `.workspace-tabs`, `.view-header`, `.view-header-title-container`, `.view-actions`, `.clickable-icon` проверено в импортированном локальном app.css. Это внутренний DOM, не стабильный публичный API.

Проверка в браузере подтверждает работу моделей и фильтров. Она не доказывает нативное отображение в установленном Obsidian, поведение физического сенсорного устройства, системных настроек доступности или экспорта PDF. Эти ограничения указаны в карточках вместе с конкретными действиями для проверки.
