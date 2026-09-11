# Rendering contract, version 1

The contract is implemented in `atlas_generator/render.py` and `atlas_generator/tests/test_generator.py`. This document explains the rules; individual builds do not require a prompt. Parser and extension versions are pinned in `atlas_generator/requirements.txt`.

## Markdown and HTML

The foundation is CommonMark with tables, strikethrough, footnotes, and definition lists. HTML in examples is preserved, while scripts and event handlers are removed. User JavaScript does not execute; native details, links, forms, and CSS remain.

The example root is `.atlas-<ID>.markdown-preview-view.markdown-rendered`. `snippet.css` follows the shared base styles. Headings receive `data-heading` and IDs prefixed by `source_anchor`, when available, or the technique ID. Repeated headings receive numeric suffixes. Footnotes use the same prefix and retain separate backlinks for repeated references. Tables receive both `style="text-align:…"` and `align` for selector compatibility.

Highlighting, tags, wikilinks, and embeds are supported. Inline and fenced code are not interpreted as tags or highlighting. Wikilinks demonstrate markup but do not resolve arbitrary notes across the vault.

Task markers are preserved in `data-task`; ordinary checkboxes can be toggled, updating `data-task` and `is-checked`.

Callouts become `.callout` elements with `data-callout`, a title, an icon, and `.callout-content`. Formatted titles are preserved. Nested blocks are processed from the inside out. Collapsible callouts use details/summary; `+` and `-` determine the initial state. The `callout-technical-gh` family uses the `markdown-alert` structure.

Missing internal-link destinations receive demonstration targets outside the example root so that `nth-child` and other structural selectors are not changed.

## Properties and saved models

YAML in `Markdown.<lang>.md` supplies Properties values. A saved `Model.<lang>.html` supplies the panel structure: rows are updated, added, or removed to match the current YAML. Example text is rebuilt too. Without a model, a basic Properties structure is used.

Environment styling comes from `Model.css`. Old technique-specific rules and keyframes are removed before current `snippet.css` is added. The original model is separately available as a reference; it does not replace current Markdown for ordinary markdown/html techniques.

CodeMirror in saved models is a static DOM imitation. This contract does not promise identical output across every Obsidian version, theme, or plugin.

## Shell

`preview.css` defines shared fonts, dimensions, basic Markdown elements, and environment variables. This environment belongs to the generator and is distinct from individual snippets. Every demonstration lives in a separate iframe. `preview.js` handles only task and collapsible-block states. Automated GIF recording scripts are outside the generator.

## CSS templates and Obsidian mode

CSS is assembled from the technique directory: `preview.css` plus the bound `recipe.template.css`, with bindings from `hack.json`. Obsidian mode uses real `app.css`, the theme, enabled snippets, and `dependencies.template.css` instead of `preview.css`. CSS does not create missing editor structure. Building never changes the source catalogue.
