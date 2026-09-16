# Hacksidian localization

## Implemented

UI dictionaries live in `plugin/i18n/ru.ts` and `plugin/i18n/en.ts`; language resolution lives in `plugin/i18n/index.ts`. Dictionaries cover buttons, settings, statuses, local errors. Technical identifiers, CSS, and user messages are preserved. External API messages and system errors remain in their original language.

`interfaceLanguage` accepts `auto`, `ru`, or `en`. The default `auto` uses Obsidian's public `getLanguage()` API, falling back to English for unsupported languages. Obsidian 1.8.7 is the minimum version because it introduced this API. The plugin language can be changed independently of the app language.

`contentLanguage` accepts `auto`, `ru`, or `en`. By default it follows the resolved plugin interface language. Sample navigation selects only `playground/<language>/`, under the configured samples root. A missing or empty language folder produces a notice rather than silently substituting another language.

Each language folder contains ten samples, p000.md, and local attachments. Old root samples and shared attachments were removed; only language folders are used. CSS classes and program code are preserved; English Mermaid labels are translated. Links include the language directory and stay within the same localization. Link verification permits the deliberately missing target in the links demonstration.

The LLM instruction is to reply in the language of the latest user question, using the interface language only when that language cannot be determined. Content language and font coverage settings do not override this rule. Existing history is not translated. Actual model compliance requires a separate live check.

## Atlas

The atlas is Russian-only: a single `<id>.md` card with technical fields and description, `markdown.md`, `recipe.css` and `hack.json`. English atlas variants and navigation labels have been removed. Plugin interface localization and language settings remain available.

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
