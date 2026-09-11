"""One-time source markup migration: mock controls use native Obsidian classes."""
from pathlib import Path
import json
import re
import shutil

repo = Path(__file__).resolve().parents[2]
root = Path('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks')
backup = repo / 'build/recipe-migration-originals'
classes = {
    'hx-pair': 'hacksidian-interface-model', 'hx-caption': 'hacksidian-model-caption',
    'hx-tabs': 'workspace-tabs', 'hx-tabbar': 'workspace-tab-header-container',
    'hx-tab': 'workspace-tab-header', 'hx-pane': 'workspace-leaf',
    'hx-header': 'view-header', 'hx-breadcrumb': 'view-header-breadcrumbs view-header-title-container',
    'hx-actions': 'view-actions', 'hx-icon': 'clickable-icon',
    'hx-note': 'hacksidian-model-note', 'hx-note-baseline': 'hacksidian-model-baseline',
}
changed = []
for directory in sorted(root.iterdir()):
    spec = directory / 'hack.json'
    if not spec.exists() or json.loads(spec.read_text()).get('group') != 'interface':
        continue
    def replace(match):
        names = []
        for name in match[1].split():
            names.extend((classes.get(name) or ('markdown-preview-view markdown-rendered' if name.startswith('hx-note-') else name)).split())
        return 'class="' + ' '.join(dict.fromkeys(names)) + '"'
    for file in directory.glob('Markdown.*.md'):
        original = file.read_text()
        updated = re.sub(r'class="([^"]*)"', replace, original)
        if updated != original:
            saved = backup / directory.name / file.name
            if not saved.exists():
                shutil.copyfile(file, saved)
            file.write_text(updated)
            changed.append(str(file.relative_to(root)))
print(json.dumps({'updated_models': changed}, ensure_ascii=False))
