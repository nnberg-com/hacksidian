# Hacksidian CSS grooming plugin

The plugin source is in `plugin/`. The installed copy for the author's vault is `/Users/op/vaults/op/.obsidian/plugins/hacksidian`. The installer migrates an existing Hacksidian installation while preserving settings and history.

## CSS source

The reference set in `snippets/` contains 22 `hacksidian-*.css` files and `hacksidian-manifest.json`. The build bundles them into the plugin. Working files live directly in `${app.vault.configDir}/snippets`. The prefix and numeric part preserve grouping and the native Obsidian loading order.

On first load, the plugin creates only missing files, enables its set, and saves `snippetsInstalled` in `data.json`. Later loads and updates do not copy templates, recreate deleted files, or change snippet toggles. Changes to the set require a separate migration. The running plugin does not modify the reference set in the repository.

The plugin reads working files at startup and before and after a model response. It refreshes its internal context once per second to detect manual edits. A model response replaces one file after comparing it with the original state. Read or syntax errors never restore files from `data.json`. Plugin data contains settings, the installation marker, and Undo history.

Obsidian's native snippet manager applies the CSS. Its toggles work; there is no separate plugin style element or combined `callmered-current.css`. Integration with internal Obsidian APIs is isolated in `plugin/src/snippets.ts`.

Samples are in the configured playground root, with `ru/` and `en/` subfolders. Installation does not recreate them. `plugin/templates` contains historical test fixtures, not the working playground source.

## Languages

Interface language defaults to the Obsidian language, with English for unsupported languages. Russian and English can also be selected explicitly. Content language is independent and defaults to the plugin interface language. Sample navigation uses only the selected language folder; it does not silently substitute samples in another language.

UI dictionaries are in `plugin/i18n/`. Changing the interface language updates the settings and open conversation panel without clearing a draft. Existing conversation messages retain their original language. The chat instructions tell the model to reply in the language of the latest question; if that language is unclear, use the interface language. The document language is preserved unless translation is requested. Font coverage languages are a separate setting.

## Model context

Settings let you toggle “Send a page screenshot to the LLM” (enabled by default), select a provider and model, and save an API key. OpenAI, Anthropic (Claude), Google (Gemini), and xAI (Grok) are available. Each provider stores its own key, model, and manual prices. The custom model ID field appears only when “Custom model” is selected, including after restart.

“Calculate costs automatically” is enabled by default. Pricing is loaded from the model's official page and cached for 24 hours with its source and retrieval date. Manual fields are disabled in this mode. “Refresh” forces a reload. Standard paid text/image rates are used, including recognised long-context tiers and promotional expiry dates. Unknown models, network failures, or source format changes result in an unknown cost. Turn off automatic pricing to enter your own rates. Past costs are not recalculated.

Pricing sources: [OpenAI](https://developers.openai.com/api/docs/models), [Claude](https://platform.claude.com/docs/en/about-claude/pricing), [Gemini](https://ai.google.dev/gemini-api/docs/pricing), and [Grok](https://docs.x.ai/developers/models). Parsers are tested against saved extracts of official tables. Arbitrary IDs require a recognisable pricing row or page; Claude currently recognises IDs from the built-in list.

OpenAI uses the Responses API; Gemini and Grok use compatible Chat Completions APIs. Claude uses native Messages with `output_config.format` because its compatibility layer ignores `response_format`. All responses undergo shared structure and CSS validation. Settings changes apply to the next request.

When screenshots are enabled, the plugin captures the current Reading view and sends it alongside the user's text, Markdown, CSS modules, computed styles, and conversation history. When disabled, no image is created or sent. Screenshots exist only in memory and are not stored on disk or in turn history. There is no after-capture, manual camera command, or preview. Conversation history is stored only in plugin `data.json`.

## History and Undo boundaries

“Clear history” deletes the entire chat and all previous Undo steps. Current CSS, model, keys, and other settings remain intact. Clearing is unavailable while a request or Undo is running.

CSS history and conversation turns live only in `.obsidian/plugins/hacksidian/data.json`. The old CallMeRed note directory is no longer used. The original data file is retained locally in `migration-backup/callmered-obsidian`; it contains private settings and a key and is not a publication source.

History retains at most 50 Undo steps plus the current version. Older snapshots are discarded during startup, saving, and new changes. The conversation log stores text and statistics without CSS copies.

Undo works within the current structure and survives restarting the plugin. At the boundary with the old structure, it reports the beginning of the current set's history without changing files. Restoring the old structure is intentionally unsupported. Undo does not automatically overwrite manual edits. Git is not connected or required. Legacy monolithic CSS migration commands remain as text in `plugin/scripts/legacy`; the current runtime verification script checks the new structure only.

## Build and installation

Run `npm run check` from `plugin/` for types, tests, and production build. `npm run install:plugin` builds and installs the plugin into the existing vault explicitly selected with `HACKSIDIAN_VAULT` and `HACKSIDIAN_CONFIG_DIR` selects a custom config folder. First load creates missing snippets. Reload the installed plugin in Obsidian to use a new build.

The old `callmered` vault's saved configuration no longer enables this plugin. This does not unload an instance already running in that vault. Live LLM verification remains a separate check; unit tests do not make billable requests.

## Atlas techniques

The structural rule is one group, one base snippet, and one variable set; see [Snippets](snippets.md). Opening a card tagged `hacksidian_technique` with a local `hack.json` shows “Apply hack” in the conversation panel. It adds one CSS block to the associated file without calling an LLM, avoids duplicate application, and participates in the same 50-step Undo history. Templates and their bindings remain in the technique directory.

## Installation and plugin identity migration

Quit Obsidian completely before updating, then run:

```sh
HACKSIDIAN_VAULT="/absolute/path/to/vault" npm --prefix /absolute/path/to/hacksidian/plugin run install:plugin
```

The installer discovers the previous installation by the Hacksidian manifest name. It moves it to `.obsidian/plugins/hacksidian`, preserves `data.json` and other additional files byte-for-byte, and updates enabled plugins, hotkeys, and workspace configuration references. Working CSS snippets are unchanged. If both previous and current installations exist, migration stops before making changes. Start Obsidian after installation.

## Single-source recipes

All 1,411 catalogue entries use format 2 and one `recipe.css`. The atlas and
plugin consume its contents unchanged. 1,389 entries contain CSS; 22 are
markup-only examples with empty CSS. The plugin no longer compiles templates
or substitutes scope classes. Reapplying updates the recipe block through Undo.
Recipe-specific markup and editor/Properties modes still matter.
