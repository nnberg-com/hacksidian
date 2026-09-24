# Hacksidian

- [Русский](../docs/ru/plugin.md)
- [English](../docs/en/plugin.md)

## Обновление только кода

Из корня репозитория:

```sh
npm --prefix plugin run update:code -- /Users/op/vaults/hacksidian
```

Команда собирает плагин и атомарно заменяет только `main.js` в существующей установке указанного vault. `styles.css`, пользовательские CSS-сниппеты, `data.json`, `manifest.json`, настройки и ссылки остаются без изменений. Другие vault не затрагиваются. Для нестандартной папки конфигурации задайте `HACKSIDIAN_CONFIG_DIR` (например, `.obsidian-dev`).

Без повторной сборки:

```sh
node plugin/scripts/update-code.mjs /Users/op/vaults/hacksidian
```

После обновления перезагрузите плагин в Obsidian. Скрипт сам не перезапускает плагин и не выполняет миграции; обычная логика запуска плагина выполняется при последующей перезагрузке. Изменения интерфейсного `styles.css` этим способом не доставляются.
