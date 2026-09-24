---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: GitHub-выноски
category: composition
sources:
  - https://docs.github.com/ru/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts
  - https://github.com/primer/octicons
format: markdown
themes: []
---

```hacksidian-id
composition-github-alerts
```

```hacksidian-live
composition-github-alerts
```

```hacksidian-details
> Зачем
Единый набор для документации: NOTE — полезный контекст, TIP — совет, IMPORTANT — необходимая информация, WARNING — срочное предупреждение, CAUTION — риск негативных последствий.

> Как работает
Используйте обычную цитату с типом в первой строке: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]` или `> [!CAUTION]`. Текст начинается со следующей строки с `>`.

Галочка «Выглядеть как в GitHub» включена по умолчанию: прозрачный фон, цветная левая линия, иконки GitHub Octicons и обязательные заголовки Note, Tip, Important, Warning, Caution. Собственный заголовок скрывается только визуально; исходный Markdown сохраняется. Стандартный контейнер иконки скрывается целиком, вместе с его украшениями.

Снимите галочку, чтобы оставить иконки GitHub Octicons и базовый цвет каждого типа: синий, зелёный, фиолетовый, жёлтый и красный из семантических переменных Obsidian. Заголовки, фон, рамки, отступы, размеры и размещение иконок, а также шрифт в этом режиме определяются обычным оформлением выносок и другими включёнными приёмами. Для каждого типа доступен отдельный параметр базового цвета: восемь семантических цветов Obsidian. Выбор действует в обоих режимах.

> Ограничения
Применение меняет все пять перечисленных стандартных типов; остальные типы выносок не затрагиваются. Для совместимости с GitHub не добавляйте маркеры сворачивания: в полном оформлении нет кнопки сворачивания. Цвета зависят от темы Obsidian; геометрия, шрифт заголовка и Octicons следуют оформлению GitHub. GitHub рекомендует не больше одной-двух выносок на статью и избегать их размещения подряд. Все пять собраны здесь только для сравнения. CSS не проверяет эти ограничения.
```

```hacksidian-sources
composition-github-alerts
```

Иконки — Primer Octicons (GitHub), лицензия MIT: [текст лицензии](assets/LICENSE). SVG включены в CSS как data URI, поэтому приём не требует сетевых запросов.

```hacksidian-files
composition-github-alerts
```
