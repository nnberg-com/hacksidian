---
tags:
  - hacksidian_technique
  - hacksidian_text
title: Буквица с обтеканием
category: text
sources: []
format: markdown
themes:
  - dune
---

```hacksidian-id
text-dropcap
```

```hacksidian-live
text-dropcap
```

```hacksidian-details
> Зачем
Для начала длинного повествования.

> Как работает
Буквица ×4 от шрифта абзаца; межстрочный коэффициент ×0.57; текущий цвет и семейство.

> Ограничения
Кавычка перед первой буквой может попасть в тот же псевдоэлемент.
```

```hacksidian-sources
text-dropcap
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/dune|Dune]]: описанный автором способ применения — [руководство](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/Wiki/Poetry.md#L14), [реализация](https://github.com/jopp-gh/Obsidian-Dune84/blob/9d24a27f53ac03dccccd4a4d211eda45320791ff/theme.css#L3691).
  Селектор: `a.tag:is([href="#red"], [href="#rot"], [href="#green"], [href="#grün"], [href="#blue"], [href="#blau"], [href="#gray"], [href="#grau"], [href="#cite-de"], [href="#cite-br"], [href="#cite-fr"], [href="#zitat-de"], [href="#zitat-br"], [href="#zitat-fr"], [href="#sub"], [href="#sup"], [href="#line-a"], [href="#line-b"], [href="#line-c"], [href="#strich-a"], [href="#strich-b"], [href="#strich-c"], [href="#indent"], [href="#einzug"], [href="#raisecap"], [href="#majuskel"], [href="#dropcap"], [href="#initiale"])`.
  Применение: Перед выделенной первой буквой поставьте `#dropcap`, например `#dropcap ==А==`. Это синтаксис Dune, а не встроенное поведение тега.

```hacksidian-files
text-dropcap
```
