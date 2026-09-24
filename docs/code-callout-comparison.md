# Сопоставление callout и code

Проверка исходников: 2026-09-24. Просмотрены все 31 приём callout и все текущие карточки code. Это сопоставление механизмов оформления, а не утверждение о пиксельном совпадении.

Добавлено 12 приёмов. Общие параметры цвета новых декоративных элементов выбирают --color-* и следуют за семантической палитрой.

| Callout | Code | Результат |
| --- | --- | --- |
| `callout-no-background` | code-no-background | Добавлен |
| `callout-technical-band` | code-e048 | Существующий аналог; добавлены цвет палитры и размер, исправлен селектор обёртки |
| `callout-technical-compact` | code-e048 | Настраиваемый размер заголовка |
| `callout-technical-corner` | code-e039 | Существующий аналог |
| `callout-technical-dark` | code-panel | Существующий аналог с цветами интерфейса |
| `callout-technical-dashed` | code-e008 | Существующий аналог |
| `callout-technical-dots` | code-dots | Добавлен |
| `callout-technical-double-border` | code-e007 | Существующий аналог |
| `callout-technical-double-rail` | code-double-rail | Добавлен |
| `callout-technical-focus` | code-e044 | Расширен: наведение и focus-within |
| `callout-technical-gradient` | code-gradient | Добавлен |
| `callout-technical-hatch` | code-hatch | Добавлен |
| `callout-technical-header-divider` | code-title-divider | Добавлен; H3 непосредственно перед кодом |
| `callout-technical-icon-disc` | — | Не переносился: у обычного fenced code нет декоративного значка; кнопка копирования — действие |
| `callout-technical-inset` | code-e006 | Существующий аналог утопленной поверхности; отдельного заголовка у pre нет |
| `callout-technical-label` | — | Не переносился: ярлык на общей рамке требует общего контейнера заголовка и кода |
| `callout-technical-large-icon` | — | Не переносился: нет декоративного значка |
| `callout-technical-line` | code-e003 | Существующий аналог левой линии; отдельное скругление линии пока отсутствует |
| `callout-technical-long-title` | code-e048 | Добавлен сбалансированный перенос и перенос непрерывных слов |
| `callout-technical-mobile` | code-e055 | Существующая адаптация полей и переноса на узком экране |
| `callout-technical-no-icon` | — | Не переносился: обычный блок кода уже без декоративного значка |
| `callout-technical-outline` | code-e002 | Существующая тонкая рамка |
| `callout-technical-padding` | code-padding | Добавлен |
| `callout-technical-right` | code-right | Добавлен |
| `callout-technical-round` | code-round | Добавлен |
| `callout-technical-shadow` | code-e005, code-e044 | Постоянная тень уже есть; e044 получает точную тень callout при наведении/фокусе |
| `callout-technical-side-label` | — | Не переносился: две колонки требуют общей обёртки, которой нет у соседних H3/pre |
| `callout-technical-square` | code-square | Добавлен |
| `callout-technical-tint` | code-panel | Существующая поверхность --background-secondary |
| `callout-technical-title-underline` | code-title-underline | Добавлен; H3 непосредственно перед кодом |
| `callout-technical-top` | code-top | Добавлен |

Все новые примеры используют обычный fenced code. Заголовочные приёмы используют H3 непосредственно перед блоком, с поддержкой обёрток `.el-h3` / `.el-pre`. Правила для `pre` не обещают оформления исходных строк CodeMirror.

Проверки: формат карточек, компиляция каталога, изоляция CSS встроенных примеров, разбор и изменение параметров. Визуальная проверка в приложении и печать PDF не выполнены.
