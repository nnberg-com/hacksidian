# Hacksidian localization

## Implemented

UI dictionaries live in `plugin/i18n/ru.ts` and `plugin/i18n/en.ts`; language resolution lives in `plugin/i18n/index.ts`. Dictionaries cover buttons, settings, statuses, local errors. Technical identifiers, CSS, and user messages are preserved. External API messages and system errors remain in their original language.

`interfaceLanguage` accepts `auto`, `ru`, or `en`. The default `auto` uses Obsidian's public `getLanguage()` API, falling back to English for unsupported languages. Obsidian 1.8.7 is the minimum version because it introduced this API. The plugin language can be changed independently of the app language.

`contentLanguage` accepts `auto`, `ru`, or `en`. By default it follows the resolved plugin interface language. Sample navigation selects only `playground/<language>/`, under the configured samples root. A missing or empty language folder produces a notice rather than silently substituting another language.

Each language folder contains ten samples, p000.md, and local attachments. Old root samples and shared attachments were removed; only language folders are used. CSS classes and program code are preserved; English Mermaid labels are translated. Links include the language directory and stay within the same localization. Link verification permits the deliberately missing target in the links demonstration.

The LLM instruction is to reply in the language of the latest user question, using the interface language only when that language cannot be determined. Content language and font coverage settings do not override this rule. Existing history is not translated. Actual model compliance requires a separate live check.

## Atlas: implemented structure

Each technique has a shared `<id>.md` card containing technical metadata and separate `Description.ru.md` / `Description.en.md` files. Localized title and group labels are no longer in the common card. Russian descriptions were moved in full, including links and source evidence. All 8,512 existing example, CSS, parameter, and attachment files were preserved byte for byte.

For the 1,395 migrated techniques, English descriptions are marked pending and Markdown.en.md files are still missing. The generator never substitutes Russian for missing English translations. The `translations` command reports completeness per technique: after 16 new bilingual techniques were added concurrently, the current totals are ru: 1,411, en: 16. This is the prepared structure, not a completed English atlas.

The shell, buttons, search, filters, and detail labels are bilingual. `--ui-lang` selects interface and description language; `--lang` selects example language. By default, the generator reads the installed plugin's settings. The plugin saves the effective Obsidian language on startup and settings changes. Without settings, English is used. Explicit CLI arguments take precedence.

CSS, hack.json, identifiers, categories, digest memberships, and assets stay shared. Category and digest names follow the UI language. Live examples use Markdown in the selected language without silently substituting missing translations. See [Live examples](../live-examples.md).

## Documentation

Current guides live in docs/ru/ and docs/en/. Historical STYLE-SYSTEM-*, SOURCE-README, and legacy instructions remain as records of previous states, not current bilingual guides.

## Checks

From the repository root:

```sh
npm run check --prefix plugin
node tools/verify-playground.mjs
```

The second command accepts an optional playground root. It checks all 20 samples and local links without modifying files. Unit tests cover language fallback, independent content selection, dictionary key/parameter parity, language changes in helpers, and chat instructions. They make no billable LLM calls.


Note files use identical codes p001–p010 in both languages; p000 is the entry page. Human-readable names live only in headings and link labels. Codes remain stable when titles or translations change.

## Verified on 11 September 2026

88 unit tests, TypeScript, and the build passed. All 20 samples and 42 local links were checked. Live Obsidian checks confirmed both settings languages, panel placeholders and commands, independent content selection (10 samples per language), and 32 links through metadataCache. Original language settings were restored. No live LLM call was made.

The historical browser verification predates removal of that implementation. The current atlas runs inside Obsidian; see [Live examples](../live-examples.md) for validation.
