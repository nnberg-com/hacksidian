# Live atlas examples in Obsidian

`hacksidian-live` Markdown code blocks contain a recipe ID. The processor reads
`markdown.md`, `recipe.css` and `hack.json` from that atlas directory.
It renders content through Obsidian's MarkdownRenderer, without generated HTML pages.

The switch installs/removes a copy of the CSS scoped to one unique sample ID.
The CSS used by Apply is unchanged. Current theme/snippet priorities still apply.
Editor-only selector branches are omitted. Interface/property models are excluded.
Animations and counter styles are renamed per sample. Relative CSS asset URLs use
Obsidian resource paths. Simple width media queries become preview container queries.
The viewport contains positioned content and scrolls tall examples. Task checkbox
clicks update local state without modifying the source file.

Cards are edited as Markdown. The old generator is retired.

`hacksidian-files` displays the current CSS and Markdown side by side; the separate
`hacksidian-css` and `hacksidian-markdown` blocks remain supported. They display files
literally and refresh on file changes. See [Card format](card-format.md).

Validation: plugin typecheck, tests and build; full-source capability scan and
one-block-per-supported-card audit. Two pilot examples were accepted by the user;
this does not establish visual/behavioral acceptance for the entire catalogue.
