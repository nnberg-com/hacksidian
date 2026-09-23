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
Используйте обычную цитату с типом в первой строке: `> [!NOTE]`, `> [!TIP]`, `> [!IMPORTANT]`, `> [!WARNING]` или `> [!CAUTION]`. Текст начинается со следующей строки с `>`. В Obsidian это стандартные callouts: CSS оформляет пять типов цветной левой линией, заголовком и соответствующей иконкой GitHub Octicons. Фон прозрачный. Синий, зелёный, фиолетовый, жёлтый и красный берутся из переменных текущей темы Obsidian.

> Ограничения
Это адаптация GitHub Alerts: геометрия и иконки воспроизводят образец, а оттенки и шрифт зависят от темы Obsidian. Применение меняет все пять стандартных типов в заметках, остальные типы выносок не затрагиваются. Для совместимости с GitHub не добавляйте собственные заголовки и маркеры сворачивания; не вкладывайте выноски в другие элементы. GitHub рекомендует не больше одной-двух выносок на статью и избегать их размещения подряд. Все пять собраны здесь только для сравнения. CSS не проверяет эти ограничения.
```

```hacksidian-sources
composition-github-alerts
```

Иконки — Primer Octicons (GitHub), лицензия MIT: [текст лицензии](assets/LICENSE). SVG включены в CSS как data URI, поэтому приём не требует сетевых запросов.

```hacksidian-files
composition-github-alerts
```
