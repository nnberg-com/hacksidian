---
tags:
  - hacksidian_technique
  - hacksidian_composition
title: Чек экспедиции
category: composition
sources:
  - https://github.com/emarpiee/Retroma/blob/main/assets/examples/retroma-retro-callouts.md
format: markdown
themes:
  - retroma
---

```hacksidian-id
callout-receipt
```

```hacksidian-live
callout-receipt
```

```hacksidian-details
> Зачем
Показать короткий итог расходов в узнаваемой форме бумажного чека.

> Как работает
Таблица хранит позиции и суммы. Моноширинный шрифт выравнивает цифры; clip-path формирует отрывной край, а разделители Markdown становятся пунктирными линиями.

> Ограничения
Суммы и итог введены вручную: CSS не выполняет бухгалтерские вычисления. Чек учебный.
```

```hacksidian-sources
callout-receipt
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/retroma|Retroma]]: описанный автором способ применения — [руководство](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/assets/examples/retroma-retro-callouts.md#L127), [реализация](https://github.com/emarpiee/Retroma/blob/cf9c544c4950529e0ce87587127e6b72d5451848/theme.css#L8793).
  Селектор: `body.rtm-ss-retro-callout .callout[data-callout="receipt-1"], body.rtm-ss-retro-callout .callout[data-callout="receipt-1-s"], body.rtm-ss-retro-callout .callout[data-callout="receipt-1-m"], body.rtm-ss-retro-callout .callout[data-callout="receipt-1-l"]`.
  Применение: Типы `receipt-1` и `receipt-2` оформляют содержание чеком; CSS не вычисляет суммы.

```hacksidian-files
callout-receipt
```
