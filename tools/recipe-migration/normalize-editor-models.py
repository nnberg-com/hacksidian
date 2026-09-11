"""One-time migration of editor-only tag examples to native token markup."""
from pathlib import Path
import html,json,re,shutil
repo=Path(__file__).resolve().parents[2]
root=Path('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks')
changed=[]
for d in sorted(root.iterdir()):
    p=d/'recipe.css'
    if not p.exists():continue
    css=p.read_text()
    if '.cm-hashtag' not in css or re.search(r'\.tag(?:[^\w-]|$)',css):continue
    if json.loads((d/'hack.json').read_text()).get('group')!='tag':continue
    for file in d.glob('Markdown.*.md'):
        before=file.read_text()
        if 'hacksidian-source-model' in before:continue
        saved=repo/'build/recipe-migration-originals'/d.name/file.name
        if not saved.exists():shutil.copyfile(file,saved)
        match=re.match(r'^(---\n.*?\n---\n)(.*)$',before,re.S)
        front,body=(match[1],match[2]) if match else ('',before)
        content=html.escape(body.strip())
        def tag(m):
            name=m[1];cls='cm-tag-'+name.replace('/','-')
            return f'<span class="cm-hashtag cm-hashtag-begin {cls}">#</span><span class="cm-hashtag cm-hashtag-end {cls}">{name}</span>'
        content=re.sub(r'(?<!\w)#([\w/-]+)',tag,content)
        note='Модель неактивной и активной строк CodeMirror; приём предназначен для редактора Obsidian.' if '.ru.' in file.name else 'Model of inactive and active CodeMirror lines; this technique targets the Obsidian editor.'
        file.write_text(front+'\n> '+note+'\n\n<div class="hacksidian-source-model markdown-source-view mod-cm6"><div class="cm-editor"><div class="cm-scroller"><div class="cm-content"><div class="cm-line" tabindex="0">'+content+'</div><div class="cm-line cm-active" tabindex="0">'+content+'</div></div></div></div></div>\n')
    common=d/(d.name+'.md');common.write_text(common.read_text().replace('format: markdown','format: html'))
    changed.append(d.name)
print('Editor models:',changed)
