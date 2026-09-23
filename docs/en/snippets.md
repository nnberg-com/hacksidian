# Hacksidian snippets: a clean start

The plugin creates 25 empty CSS files, one per group. They contain no rules or variable values, so enabling them does not change Obsidian or notes, including notes with `cssclasses: callmered-coloring`. Styling is added only when the user applies a technique or edits a snippet.

`hacksidian-manifest.json` maps groups to files. Its `nativeVariables` lists are reference names, not assignments. Templates are bundled into the plugin; working files live in `<vault>/<configDir>/snippets`. First load creates and enables only missing files. Existing files and their enabled state are preserved. Updates do not erase user CSS. Migration of the earlier ten-file structure preserves its working values.

| Group | Base file |
| --- | --- |
| Palette and themes (`palette`) | `hacksidian-00-palette.css` |
| Platforms and meta settings (`meta`) | `hacksidian-01-meta.css` |
| Obsidian interface (`interface`) | `hacksidian-02-interface.css` |
| Note (`note`) | `hacksidian-03-note.css` |
| Text (`text`) | `hacksidian-04-text.css` |
| Headings (`heading`) | `hacksidian-05-heading.css` |
| Horizontal rules (`hr`) | `hacksidian-06-hr.css` |
| Links (`link`) | `hacksidian-07-link.css` |
| Emphasis (`emphasis`) | `hacksidian-08-emphasis.css` |
| Inline code (`inline-code`) | `hacksidian-09-inline-code.css` |
| Tags (`tag`) | `hacksidian-10-tag.css` |
| Lists (`list`) | `hacksidian-11-list.css` |
| Tasks (`task`) | `hacksidian-12-task.css` |
| Pseudo tasks (`pseudo-task`) | `hacksidian-13-pseudo-task.css` |
| Quotes (`quote`) | `hacksidian-14-quote.css` |
| Callouts (`callout`) | `hacksidian-15-callout.css` |
| Compositions (`composition`) | `hacksidian-22-composition.css` |
| Tables (`table`) | `hacksidian-16-table.css` |
| Code blocks (`code`) | `hacksidian-17-code.css` |
| Images (`image`) | `hacksidian-18-image.css` |
| Embedded pages (`iframe`) | `hacksidian-19-iframe.css` |
| Footnotes (`footnote`) | `hacksidian-20-footnote.css` |
| Note properties (`metadata`) | `hacksidian-21-metadata.css` |

## An individual technique

Each technique lives in `atlas/! hacks/<id>/`, with its card, `recipe.css`, `hack.json`, and optional example files. Applying a technique adds its CSS to the target group file. Disabling it removes that marked block and preserves other content. Conflicts follow the ordinary CSS cascade.

Strikethrough techniques use `hacksidian-23-strikethrough.css`; combined emphasis techniques use `hacksidian-24-emphasis-combinations.css`. Existing blocks move from emphasis only on explicit technique update.
