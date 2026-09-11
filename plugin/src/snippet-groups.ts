import { t } from "../i18n";
import postcss, { type Rule } from 'postcss';
import type { ModularStyle } from './style-modules';

// The same IDs identify catalogue groups, snippet modules and variable sets.
export const GROUPS = [
 ['palette', 'Палитра и темы', ['--background-primary','--background-secondary','--text-normal','--text-muted','--interactive-accent']],
 ['meta', 'Платформы и метанастройки', ['--file-line-width','--font-text-size','--line-height-normal']],
 ['interface', 'Интерфейс Obsidian', ['--font-interface','--ribbon-width','--sidebar-width','--tab-font-size']],
 ['note', 'Заметка', ['--file-line-width','--file-margins']],
 ['text', 'Текст', ['--font-text','--font-text-size','--line-height-normal','--p-spacing']],
 ['heading', 'Заголовки', ['--h1-size','--h2-size','--h3-size','--heading-spacing']],
 ['hr', 'Горизонтальные разделители', ['--hr-color','--hr-thickness']],
 ['link', 'Ссылки', ['--link-color','--link-external-color','--link-decoration']],
 ['emphasis', 'Выделения', ['--bold-weight','--italic-color','--text-highlight-bg']],
 ['inline-code', 'Строчный код', ['--code-normal','--code-background','--code-size']],
 ['tag', 'Теги', ['--tag-color','--tag-background','--tag-radius']],
 ['list', 'Списки', ['--list-indent','--list-spacing','--list-marker-color']],
 ['task', 'Задачи', ['--checkbox-size','--checkbox-color','--checklist-done-color']],
 ['pseudo-task', 'Псевдозадачи', ['--checkbox-size','--checkbox-marker-color']],
 ['quote', 'Цитаты', ['--blockquote-border-color','--blockquote-border-thickness','--blockquote-font-style']],
 ['callout', 'Callout-блоки', ['--callout-color','--callout-radius','--callout-padding']],
 ['table', 'Таблицы', ['--table-border-color','--table-border-width','--table-text-size']],
 ['code', 'Блоки кода', ['--code-background','--code-normal','--code-size','--font-monospace']],
 ['image', 'Изображения', ['--image-radius']],
 ['iframe', 'Встроенные страницы', ['--embed-border-start','--embed-padding']],
 ['footnote', 'Сноски', ['--footnote-size']],
 ['metadata', 'Свойства заметки', ['--metadata-label-width','--metadata-gap','--metadata-padding']],
] as const;
export const groupManifest = { format: 1, structure: 2, modules: GROUPS.map(([group,title,nativeVariables],i) => ({
 id: `g-${group}`, component: group, group, title, file: `hacksidian-${String(i).padStart(2,'0')}-${group}.css`,
 nativeVariables: [...nativeVariables],
})) };

function owner(selector: string, source: string): string {
 if (source === 'm-90-hide-note-header') return /metadata|frontmatter/.test(selector) ? 'metadata' : 'interface';
 if (source === 'm-80-footnotes') return 'footnote';
 if (source === 'm-70-images') return 'image';
 if (source === 'm-60-code') return 'code';
 if (source === 'm-50-tables') return 'table';
 if (source === 'm-40-quotes-and-callouts') return selector.includes('blockquote') ? 'quote' : 'callout';
 if (source === 'm-30-lists-and-tasks') return /task-list|checkbox/.test(selector) && !selector.includes(':not(.contains-task-list)') ? 'task' : 'list';
 if (/a\.tag|multi-select-pill/.test(selector)) return 'tag';
 if (/:not\(pre\) > code/.test(selector)) return 'inline-code';
 if (/\bmark\b|\bdel\b|:is\(em, i\)/.test(selector)) return 'emphasis';
 if (source === 'm-20-links-and-highlights') return 'link';
 if (/h[1-6]|\.el-h[1-6]/.test(selector)) return 'heading';
 return 'text';
}
function nativeOwner(prop:string):string {
 if (prop.startsWith('--link-')) return 'link';
 if (prop.startsWith('--tag-')) return 'tag';
 if (prop.startsWith('--code-') || prop==='--font-monospace') return 'code';
 if (prop.startsWith('--indentation-')) return 'list';
 return 'text';
}

/** Split the known ten-module structure, preserving values (including user edits).
 * Private settings become group-local so changing a quote cannot change a callout.
 * Palette variables stay shared. Unknown structures are never guessed.
 */
export function splitLegacyStyle(style: ModularStyle): ModularStyle {
 if (style.modules.map(m=>m.id).join('|') !== ['00-settings','10-reading','20-links-and-highlights','30-lists-and-tasks','40-quotes-and-callouts','50-tables','60-code','70-images','80-footnotes','90-hide-note-header'].map(s=>'m-'+s).join('|')) throw new Error(t("snippet-groups.unknown_source_snippet_structure"));
 const roots = new Map(GROUPS.map(([id])=>[id,postcss.root()]));
 const settings = new Map<string, {value:string;important:boolean}>();
 let scope='.markdown-preview-view.callmered-coloring';
 const append=(group:string,rule:Rule)=> roots.get(group as typeof GROUPS[number][0])!.append(rule);
 for (const module of style.modules) {
  const root=postcss.parse(module.css);
  for (const node of root.nodes) {
   if(node.type==='comment')continue;
   if(node.type!=='rule')throw new Error(t("snippet-groups.explicitly_assign_from", { p0: node.type, p1: module.id }));
   if(module.id==='m-00-settings') {
    if(root.nodes.filter(n=>n.type==='rule').length!==1)throw new Error(t("snippet-groups.explicitly_assign_additional_settings_rules"));
    scope=node.selector;
    node.walkDecls(d=>{
     if(d.prop.startsWith('--cmr-'))settings.set(d.prop,{value:d.value,important:!!d.important});
     else {const r=postcss.rule({selector:scope});r.append(d.clone());append(nativeOwner(d.prop),r);}
    });
   } else {
    const byGroup=new Map<string,string[]>();
    for(const selector of node.selectors){const group=owner(selector,module.id);byGroup.set(group,[...(byGroup.get(group)??[]),selector]);}
    for(const [group,selectors] of byGroup){
     const clone=node.clone({selector:selectors.join(',\n')});
     if(module.id==='m-10-reading' && clone.selector===scope){
      const layout=clone.clone();layout.walkDecls(d=>{if(!d.prop.startsWith('padding'))d.remove();});
      clone.walkDecls(d=>{if(d.prop.startsWith('padding'))d.remove();});append('note',layout);
     }
     append(group,clone);
    }
   }
  }
 }
 const palette=postcss.rule({selector:scope});
 for(const [name,d] of settings)if(name.startsWith('--cmr-color-'))palette.append({prop:name,...d});
 roots.get('palette')!.prepend(palette);
 return {format:1,modules:groupManifest.modules.map(entry=>{
  const root=roots.get(entry.group)!;
  const needed=new Set<string>();
  const collect=(value:string)=>{for(const match of value.matchAll(/var\(\s*(--[\w-]+)/g))if(settings.has(match[1])&&!match[1].startsWith('--cmr-color-')&&!needed.has(match[1])){needed.add(match[1]);collect(settings.get(match[1])!.value);}};
  root.walkDecls(d=>collect(d.value));
  const vars=postcss.rule({selector:scope});
  for(const name of needed)vars.append({prop:name,...settings.get(name)!});
  if(vars.nodes.length)root.prepend(vars);
  const renamed=(name:string)=>needed.has(name)?`--hs-${entry.group}-${name.slice(6)}`:name;
  root.walkDecls(d=>{d.prop=renamed(d.prop);d.value=d.value.replace(/var\(\s*(--[\w-]+)/g,(full,name:string)=>full.replace(name,renamed(name)));});
  return {id:entry.id,component:entry.group,css:`/* ${entry.title}. Базовый сниппет группы; приёмы добавляются ниже. */\n`+root.toString()+'\n'};
 })};
}
