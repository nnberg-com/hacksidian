# Hacksidian base snippets

One group corresponds to one CSS file and one variable set. There are currently 22 groups: 19 markup groups and three supporting groups (`interface`, `meta`, `palette`). The new supporting groups introduce no extra techniques or forced setting values. Some base files are placeholders for future rules.

`hacksidian-manifest.json` connects group IDs, modules, files, and native Obsidian variables (`nativeVariables`). Custom variable values live in the group CSS as `--hs-<group>-…`; shared colours live in `palette` as `--cmr-color-*`. Native variable lists describe possible adjustment points, not unconditional theme overrides.

The files in `snippets/` are bundled into the plugin. Working copies live in `<vault>/<configDir>/snippets`. First load creates missing copies. Migration from the earlier ten-file set splits the working values, then removes old files. Historical Undo snapshots are regrouped too. Chat and settings stay in plugin data.

Existing styling covers Reading view notes with `cssclasses: callmered-coloring`. Technique templates specify Reading/Live Preview support separately. The palette retains the earlier colours; adding a group does not change the existing light/dark scheme.

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
| Tables (`table`) | `hacksidian-16-table.css` |
| Code blocks (`code`) | `hacksidian-17-code.css` |
| Images (`image`) | `hacksidian-18-image.css` |
| Embedded pages (`iframe`) | `hacksidian-19-iframe.css` |
| Footnotes (`footnote`) | `hacksidian-20-footnote.css` |
| Note properties (`metadata`) | `hacksidian-21-metadata.css` |

## An individual technique

All technique files belong to `atlas/! hacks/<id>/`: the card, `Markdown.ru.md`, `recipe.template.css`, `dependencies.template.css`, `preview.css`, `hack.json`, local `assets/`, and optional models. `hack.json` contains `group`, `target: g-<group>`, `atlas`, and `snippet`: two sets of literal bindings for one template, plus optional `requirements`.

“Apply hack” adds CSS to the group file without an LLM. CSS markers prevent duplicate additions. Undo removes the block. Conflicts with other techniques are not resolved automatically: the ordinary CSS cascade applies, including `!important` in base styles.
