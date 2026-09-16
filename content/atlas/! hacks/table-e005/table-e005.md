---
tags:
  - hacksidian_technique
  - hacksidian_table
title: Без линий
category: table
sources:
  - https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Tables
format: markdown
themes:
  - composer
---

```hacksidian-id
table-e005
```

```hacksidian-live
table-e005
```

```hacksidian-details
> Зачем
Небольшие таблицы, которые читаются за счёт колонок и воздуха.

> Как работает
Границы убраны; ширины и внутренние отступы сохранены.
```

```hacksidian-sources
table-e005
```

###### Подтверждения в темах — исследование 2026-09-16

Ниже подтверждено присутствие механизма в исходниках темы, не тождественность всех деталей с рецептом атласа. Указаны условия селектора; некоторые варианты включаются настройкой или классом. Проверка отрисовки в текущем Obsidian не проводилась.

- [[atlas/! themes/composer|Composer]]: **Table Style** (`table-style`) — [описание настройки](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L93), [реализация](https://github.com/vran-dev/obsidian-composer/blob/b08629a587e91f46c30cbb9231e0ad5ec0cef5cd/theme.css#L1996).
  Селектор: `.composer--BorderlessTableStyle .el-table table, .composer--BorderlessTableStyle .table-wrapper table`.
  Проверяемое свойство: `--table-border-width`.
  Варианты: Default 默认 (composer--DefaultTableStyle); Obsidian (composer--ObsidianTableStyle); Borderless 无边框 (composer--BorderlessTableStyle); Three Line(Academic) 三线表(学术) (composer--AcademicTableStyle)

```hacksidian-files
table-e005
```
