## Implementation
- [x] Классифицировать 106 приёмов; параметризовать 103, сохранить 3 иерархических.
- [x] Переносить теги, обёртки и штатные переменные уровня в общем компиляторе.
- [x] Перестраивать копию примера без изменения Markdown и fenced code.
- [x] Сохранить независимость собственных параметров и исходные значения по умолчанию.

## Verification
- [x] npm --prefix plugin run check: typecheck/build; 285 тестов / 54 файла.
- [x] 618 комбинаций в heading-target.test.ts, идемпотентность и сохранение параметров.
- [x] verify-card-format: 1388 карточек; verify-recipe-catalog: 1387 рецептов, 128 компилируемых.
- [x] openspec validate parameterize-heading-levels --strict; git diff --check.
- [ ] Визуальная приёмка в установленном Obsidian (авторский vault не изменён).
