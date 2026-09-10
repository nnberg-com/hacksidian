"""One-time extraction; verifies exact atlas CSS roundtrip before replacing sources."""
from pathlib import Path
import json,re,hashlib
import tinycss2
from atlas_generator.render import split_frontmatter
ROOT=Path('/Users/op/vaults/op/! P R O/hacksidian/atlas')
TARGETS={'text':'10-reading','heading':'10-reading','hr':'10-reading','note':'10-reading','link':'20-links-and-highlights','emphasis':'20-links-and-highlights','tag':'20-links-and-highlights','list':'30-lists-and-tasks','task':'30-lists-and-tasks','pseudo-task':'30-lists-and-tasks','quote':'40-quotes-and-callouts','callout':'40-quotes-and-callouts','table':'50-tables','code':'60-code','inline-code':'60-code','image':'70-images','iframe':'70-images','footnote':'80-footnotes','metadata':'90-hide-note-header'}

def dependencies(text):
 out=[]
 for node in tinycss2.parse_stylesheet(text,skip_whitespace=True,skip_comments=True):
  if node.type=='qualified-rule':
   ds=[d for d in tinycss2.parse_declaration_list(node.content) if d.type=='declaration' and d.name.startswith('--')]
   if ds: out.append(tinycss2.serialize(node.prelude)+'{'+tinycss2.serialize(ds)+'}')
  elif node.type=='at-rule' and node.content:
   if node.lower_at_keyword.endswith('keyframes'):out.append(tinycss2.serialize([node]))
   elif node.lower_at_keyword in ('media','supports','layer','container'):
    child=dependencies(tinycss2.serialize(node.content))
    if child:out.append('@'+node.at_keyword+' '+tinycss2.serialize(node.prelude)+'{'+child+'}')
 return '\n'.join(out)

plans=[]
for directory in sorted((ROOT/'! hacks').iterdir()):
 if not directory.is_dir():continue
 uid=directory.name;f=directory/'snippet.css'
 if not f.exists():continue
 original=f.read_text();preview,recipe=original.split('/* Рецепт */',1)
 metadata,_=split_frontmatter((directory/(uid+'.md')).read_text())
 scope=f'.atlas-{uid}:is(.markdown-preview-view, .markdown-source-view)'
 runtime='.callmered-coloring:is(.markdown-preview-view, .markdown-source-view)'
 if metadata['category']=='metadata':
  match=re.search(r'\.markdown-source-view\.mod-cm6\.meta-[\w-]+',recipe)
  if match:scope=match.group();runtime='.markdown-source-view.mod-cm6.callmered-coloring'
 bindings={'scope':scope,'class':'.atlas-'+uid}
 def template(s):return s.replace(scope,'{{scope}}').replace('.atlas-'+uid,'{{class}}')
 tpl=template(recipe);deps=template(dependencies(preview))
 restored=preview+'/* Рецепт */'+tpl.replace('{{scope}}',scope).replace('{{class}}','.atlas-'+uid)
 assert restored==original,uid
 manifest={'format':1,'target':'m-'+TARGETS[metadata['category']],'atlas':bindings,'snippet':{'scope':runtime,'class':'.callmered-coloring'},'hasCss':any(n.type in ('qualified-rule','at-rule') for n in tinycss2.parse_stylesheet(recipe))}
 plans.append((directory,original,preview,tpl,deps,manifest))
for d,original,preview,tpl,deps,manifest in plans:
 assert (d/'snippet.css').read_text()==original
 (d/'preview.css').write_text(preview)
 (d/'recipe.template.css').write_text(tpl)
 (d/'dependencies.template.css').write_text(deps)
 (d/'hack.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
 card=d/(d.name+'.md');s=card.read_text();s=s.replace('snippet: "snippet.css"','template: "recipe.template.css"').replace('./snippet.css','./recipe.template.css').replace('CSS-сниппет','Шаблон CSS')
 s=s.replace('CSS лежит рядом как исходник картотеки; Obsidian не подключает его автоматически из этой папки. Для пробы сниппет нужно отдельно подключить через настройки оформления.','CSS рецепта хранится в recipe.template.css; привязки к примеру и рабочему сниппету — в hack.json. Кнопка «Применить hack» в Hacksidian добавляет рецепт в целевой сниппет без LLM.')
 card.write_text(s)
 (d/'snippet.css').unlink()
print(json.dumps({'converted':len(plans),'exact_atlas_roundtrip':len(plans),'without_css':sum(not p[-1]['hasCss'] for p in plans)}))
