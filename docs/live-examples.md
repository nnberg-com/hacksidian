# Live atlas examples in Obsidian

`hacksidian-live` Markdown code blocks contain a recipe ID. The processor reads
`Markdown.<language>.md`, `hack.json` and `recipe.css` from that atlas directory.
It renders content through Obsidian's MarkdownRenderer, without generated HTML pages.

The switch installs/removes a copy of the CSS scoped to one unique sample ID.
The CSS used by Apply is unchanged. Current theme/snippet priorities still apply.
Editor-only selector branches are omitted. Interface/property models are excluded.
Animations and counter styles are renamed per sample. Relative CSS asset URLs use
Obsidian resource paths. Simple width media queries become preview container queries.
The viewport contains positioned content and scrolls tall examples. Task checkbox
clicks update local state without modifying the source file.

Generate the inventory and embed supported blocks:

```sh
node tools/embed-live-examples.mjs '/path/to/atlas'
```

This uses the same capability check as the runtime. Coverage and individual reasons
are written to `! defaults/live-examples-coverage.json` and the companion Markdown
report. Missing language examples are not silently replaced with another language.
The script is repeatable and updates only the reserved live-example section.

Validation: plugin typecheck, tests and build; full-source capability scan and
one-block-per-supported-card audit. Two pilot examples were accepted by the user;
this does not establish visual/behavioral acceptance for the entire catalogue.
