# HTML atlas generator

The Python CLI reads the Obsidian catalogue and creates a standalone static site. Source catalogue files are unchanged. The old HTML atlas and `migration-report.json` are not used.

## Running

From the repository root:

```sh
python3 -m venv .venv-atlas
.venv-atlas/bin/pip install -r atlas_generator/requirements.txt
.venv-atlas/bin/python -m atlas_generator check
.venv-atlas/bin/python -m atlas_generator build
.venv-atlas/bin/python -m atlas_generator serve --port 8765
```

Open the local address printed by `serve`. After changing catalogue files, rebuild and refresh the page. The default source is `/Users/op/vaults/op/! P R O/hacksidian/atlas`; output is `build/atlas` relative to the repository, independent of the launch directory.

```sh
.venv-atlas/bin/python -m atlas_generator build --source "/path/to/atlas" --output "/path/to/result" --lang ru
```

`check` validates data and local dependencies without building. `serve` serves an existing build on localhost only. `index.html` can also be opened from disk: search data is loaded through local JavaScript without fetch. Some external resources depend on network access and browser restrictions.

## Inputs

- `! hacks/<ID>/<ID>.md`: shared technical YAML metadata.
- `Description.ru.md` / `Description.en.md`: localized title, group label, and description; pending translations are explicit.
- `! hacks/<ID>/Markdown.ru.md`: current example.
- `recipe.template.css`: technique CSS template.
- `hack.json`: group, target snippet, and template bindings for the atlas and Obsidian.
- `dependencies.template.css`: recipe variables and animations.
- `preview.css`: additional styling for the earlier demonstration.
- `Model.ru.html` and `Model.css`: optional saved HTML model.
- `assets/`: local resources.
- `! categories/<category>.md`: category names and shared sources.

Required shared fields are `category`, `format`, and `interactive` (YAML boolean). Descriptions require `language` and `title`; `translation_status: pending` blocks a build. Format must be `markdown`, `html`, or `properties`. The ID comes from the folder name.

`--lang` selects `Markdown.<lang>.md` and `Model.<lang>.html`. `--ui-lang` selects the bilingual shell, descriptions, category names, and digest names. Missing or pending translations fail before replacing the previous build. Defaults come from the installed plugin, which records its effective interface language in `localization.interfaceLanguage` in data.json. Content follows the configured content language, or the UI for `auto`. Without plugin settings, the fallback is English. `--standalone` disables theme integration, not language selection.

## Output

Search covers titles, IDs, descriptions, examples, and CSS. Filters cover category, format, and interactivity. The right-hand feed adds matching cards in batches of eight and loads content near the visible area. Clicking the left list scrolls to the technique. Both lists share the same order; the current feed card is highlighted in navigation.

On wide screens the demonstration is on the left and the description and source on the right; narrow screens stack the columns. Sources come from card/category YAML and Markdown sections. Local provenance paths appear as text. Card heights update when source sections expand. Demonstrations remain isolated in iframes.

Every technique also has its own page, source files, and source links. Its CSS does not affect neighbouring cards or navigation. Saved models are available separately; Properties previews reuse model structure with current YAML values.

`build-report.json` records counts, dependency versions, and input hashes. Builds are prepared in a temporary directory first. Failure preserves the previous output. Only output marked as belonging to this generator may be overwritten; source directories are protected.

Rendering rules are documented in [Rendering contract](renderer.md) and tested with:

```sh
.venv-atlas/bin/python -m unittest discover -s atlas_generator/tests -v
```

This is a browser demonstration. It does not run Obsidian, its plugins, or the real CodeMirror editor.

## Obsidian styling

```sh
.venv-atlas/bin/python -m atlas_generator build --obsidian-config /Users/op/vaults/op/.obsidian --output build/atlas-obsidian
```

A regular build automatically uses the source vault's theme too. It reads the installed Obsidian `app.css`, current theme, and enabled snippets from `appearance.json` without changing Obsidian files. Local CSS resources are embedded in `obsidian.css`; source hashes are recorded in the build report. `--obsidian-app` selects a different `obsidian.asar`.

Examples receive `callmered-coloring`; recipe CSS uses the `atlas` bindings in `hack.json`. Old `preview.css` styling is not included in this mode. All cards share one snapshot of the real styles. Changes to themes, snippets, or settings require a rebuild. The CLI discovers the Obsidian config near the source catalogue and applies the styles to the main shell, recipe pages, and examples. Use `--standalone` to build explicitly without Obsidian styling.

This reuses CSS; it does not run Obsidian in a browser. CodeMirror, plugins, the app interface, and the exact Reading view structure are not reproduced. The real cascade applies, so base `!important` rules can override techniques. Browser/native visual parity requires separate verification.

## Translation status

All 1,395 Russian descriptions have been moved to Description.ru.md. English descriptions are explicit pending files; English examples still require translation. No CSS, hack.json, resources, Russian examples, or saved models were changed.

```sh
.venv-atlas/bin/python -m atlas_generator translations --output build/atlas-translations.json
```

To complete an English translation, set `language: en`, `translation_status: complete`, `title`, and optionally `group`, then add Markdown.en.md. English sections are Purpose, How it works, Demonstration, Limitations of the original technique, Notes from the HTML atlas, and Sources. Keep technical fields in the common card.

The Obsidian button opens Description.<ui-lang>.md. The plugin reads the shared card and hack.json; direct CSS application works from either the common card or a localized description.
