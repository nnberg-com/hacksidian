# Требования Hacksidian

OpenSpec инициализирован стандартной схемой `spec-driven` (CLI 1.5.0).

- `changes/` — будущие изменения: причина, требования, проект решения и задачи.
- `specs/` — принятые спецификации после завершения изменений. Пока пусто.
- `changes/archive/` — завершённые изменения.

Первое будущее изменение: [оптимизация обновления поискового каталога](changes/optimize-search-catalog-updates/proposal.md). Его реализация не начата.

Из корня репозитория:

```sh
openspec list
openspec status --change optimize-search-catalog-updates
openspec validate --all --strict --no-interactive
openspec new change short-change-name
```

CLI уже установлен в системе. Для другой машины: `npm install -g @fission-ai/openspec` — см. [официальную установку](https://openspec.dev/docs/installation).

Проект инициализирован с `--tools none`: используются обычные файлы и CLI, без генерации дополнительных команд и skills в `.codex`. Фиксация требований не означает разрешение начать реализацию или публикацию.
