# Текстовая система: варианты

[[atlas/! hacks/text-system/text-system|Карточка приёма]]

Все примеры независимы. Просмотр не меняет выбранные параметры. «Выбрать этот вариант» сохраняет выбор; установленный стиль обновляется отдельно на карточке.

## Carbon — фиксированная шкала

Точные токены heading-06…01: 42/50/300, 32/40/400, 28/36/400, 20/28/400, 16/24/600, 14/20/600 (px/px/weight). body-02: 16/24. Сопоставление токенов H1–H6 и отбивки 1.5 размера заголовка / 0.25 базового размера — адаптация Hacksidian; Carbon не предписывает это соответствие HTML.

[Источник](https://carbondesignsystem.com/elements/typography/type-sets/)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"carbon"}
```

## ДМК Пресс — Цифровой свет и рендеринг

PDF, стр. 14 (9-я страница файла): реальные размеры текста 10pt, двух заголовков 17pt и 14pt проверены по текстовым объектам PDF. H2/H3 = 1.7/1.4. H1,H4–H6 — адаптация: продолжение отношения 17/14 с нижней границей 1; H6 regular. Интерлиньяж 1.19 и отбивки — адаптация по образцу, не издательский норматив.

[Источник](https://www.dmkpress.com/upload/iblock/b5f/ajo1tfftyk2yebgba53x9k9jdms1dor1.pdf#page=9)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"dmk"}
```

## Fluent 2 — Web

Точные Web-токены Title 1, Title 2, Title 3, Subtitle 1, Subtitle 2, Body 1 Strong: 32/40, 28/36, 24/32, 20/26, 16/22, 14/20 px, semibold. Текст Body 1: 14/20. Назначение этих токенов H1–H6 и отбивки — адаптация Hacksidian.

[Источник](https://fluent2.microsoft.design/typography)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"fluentcompact"}
```

## memoir — ntglike без курсива

memoir.dtx, ntglike: chapter Large bold, section large bold, subsection normalsize bold, следующие уровни normalsize slanted. В секции 10pt этого источника: Large 12/14.5pt, large 10.95/13.6pt, normalsize 10/12pt. H1–H6 = chapter…subparagraph. Сохранена адаптация «без курсива»; run-in paragraph/subparagraph превращены в блоки с ритмом subsubsection; гибкие TeX-отбивки фиксированы. H1: до 50pt, после 40pt; нормирование к 10pt.

[Источник](https://ctan.org/pkg/memoir)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"memoir"}
```

## По Мортенсену — четыре ступени

Источник задаёт формулу fᵢ=f₀·r^(i/n), а не готовые HTML-заголовки. Адаптация Hacksidian: r=2,n=4; H1–H6 = 2^(4/4),2^(3/4),2^(2/4),2^(1/4),1,2^(-1/4). Body leading 1.6, насыщенность и отбивки — наша сборка. Все шесть уровней — применение формулы, не авторская таблица H1–H6.

[Источник](https://spencermortensen.com/articles/typographic-scale/)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"mortensen"}
```

## No Starch Press — The Modern Web

The Modern Web, стр. 111 (6-я страница PDF): Fullscreen 12pt Futura Bold, основной текст 10pt NewBaskerville, шаг строк 12pt. H2 = 1.2. H1 = 1.2²; H3–H6 сохраняют размер текста и разделены насыщенностью/курсивом — адаптация Hacksidian. Все отбивки и line-height заголовков — адаптация, не универсальные правила No Starch.

[Источник](https://nostarch.com/download/samples/modernweb_ch6.pdf#page=6)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"nostarch"}
```

## O’Reilly Technical — EPUB

epub.css: p 0.9em/125%; chapter 2em/120%, margin 70/50px; A/B/C 1.5/1.25/1em, margin 40/10,30/10,20/10px. H1–H4 соответствуют chapter/A/B/C; базовая сетка 16px (p=14.4px) выбрана для пересчёта px. H5/H6 — адаптация, размер текста, bold/italic. Шрифты и выравнивание книги не переносятся.

[Источник](https://github.com/oreillymedia/atlas_tech1c_theme/blob/master/epub/epub.css)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"oreillyepub"}
```

## Primer — базовая типографика

@primer/css 22.3.1 base.css: H1–H6 32,24,20,16,14,12 px; weight 600; body 14px/1.5. Размеры и насыщенность из CSS. Вертикальные интервалы — адаптация Hacksidian: исходный base.css обнуляет margin заголовков.

[Источник](https://cdn.jsdelivr.net/npm/@primer/css@22.3.1/dist/base.css)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"primer"}
```

## По Раттеру — ритм строки

Раттер §2.2.2: интервалы кратны базовой строке; разрешены асимметричные отбивки 1.5/0.5 строки. H1–H6 и насыщенность — адаптация Hacksidian, источник не задаёт такую шкалу. База 1.5; H5/H6 занимают строку с отбивками 2.25/0.75 базового размера. CSS-ритм не компенсирует переносы заголовков JavaScript-кодом.

[Источник](https://webtypography.net/2.2.2)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"rutter"}
```

## USWDS — стандартная сборка

@uswds/uswds 3.14.0: .usa-prose 1.06rem/1.5; H1–H6 2.44,1.95,1.34,.98,.91,.87rem. H1–H5 700/1.2; H6 normal/1.1, .025em, uppercase. Нормализация относительно 1.06rem и перевод отступов соседних элементов в локальные отбивки — адаптация; гарнитуры не переносятся.

[Источник](https://cdn.jsdelivr.net/npm/@uswds/uswds@3.14.0/dist/css/uswds.css)

```hacksidian-expanded
{"--hacksidian-text-system-choice":"uswds"}
```
