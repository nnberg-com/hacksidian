"""One-time lossless split of shared cards and Russian descriptions.

Default is a read-only plan. --apply requires --backup outside the catalogue.
Existing translations and technical assets are never overwritten.
"""
from pathlib import Path
import argparse
import hashlib
import json
import re
import sys
import zipfile
import yaml

def split_frontmatter(text: str) -> tuple[dict, str]:
    if not text.startswith('---\n'):
        return {}, text
    match = re.match(r'\A---\n(.*?)\n---(?:\n|$)', text, re.S)
    if not match:
        raise ValueError('Unclosed YAML frontmatter')
    class UniqueLoader(yaml.SafeLoader):
        pass
    def mapping(loader, node, deep=False):
        result = {}
        for key_node, value_node in node.value:
            key = loader.construct_object(key_node, deep=deep)
            if key in result:
                raise ValueError(f'Duplicate YAML field: {key}')
            result[key] = loader.construct_object(value_node, deep=deep)
        return result
    UniqueLoader.add_constructor(yaml.resolver.BaseResolver.DEFAULT_MAPPING_TAG, mapping)
    data = yaml.load(match[1], Loader=UniqueLoader)
    if not isinstance(data, dict):
        raise ValueError('YAML frontmatter must be a mapping')
    return data, text[match.end():]

CATEGORY_NAMES = {
 'callout':'Callouts', 'code':'Code blocks', 'emphasis':'Emphasis', 'footnote':'Footnotes',
 'heading':'Headings', 'hr':'Horizontal rules', 'iframe':'Embedded pages', 'image':'Images',
 'inline-code':'Inline code', 'interface':'Obsidian interface', 'link':'Links', 'list':'Lists',
 'meta':'Platforms and settings', 'metadata':'Note properties', 'note':'Notes', 'palette':'Palette and themes',
 'pseudo-task':'Pseudo tasks', 'quote':'Quotes', 'table':'Tables', 'tag':'Tags', 'task':'Tasks', 'text':'Text',
}

def dump(metadata, body):
    return '---\n'+yaml.safe_dump(metadata,allow_unicode=True,sort_keys=False).rstrip()+'\n---\n'+body


def plan(source):
    changes = []
    for directory in sorted((source/'! hacks').iterdir()):
        card = directory/(directory.name+'.md')
        if not directory.is_dir() or not card.is_file(): continue
        original = card.read_bytes()
        metadata, body = split_frontmatter(original.decode('utf-8'))
        if 'title' not in metadata:
            continue
        russian = directory/'Description.ru.md'
        english = directory/'Description.en.md'
        if russian.exists() or english.exists():
            raise ValueError(f'Refusing to overwrite existing descriptions: {directory}')
        translated = {'language':'ru','translation_status':'complete','title':metadata.pop('title')}
        if 'group' in metadata: translated['group'] = metadata.pop('group')
        metadata['id'] = directory.name
        metadata['example'] = 'Markdown.{lang}.md'
        metadata['description'] = 'Description.{lang}.md'
        # Body and all historical code/source excerpts are retained verbatim.
        changes += [(russian, None, dump(translated,body).encode()),
                    (english, None, dump({'language':'en','translation_status':'pending'},'').encode()),
                    (card, original, dump(metadata, '\n# '+directory.name+'\n\n[Русский](Description.ru.md) · [English](Description.en.md)\n').encode())]
    for card in sorted((source/'! categories').glob('*.md')):
        if card.stem not in CATEGORY_NAMES:continue
        original=card.read_bytes(); metadata,body=split_frontmatter(original.decode('utf-8'))
        if 'title_en' in metadata:continue
        metadata['title_en']=CATEGORY_NAMES[card.stem]
        changes.append((card,original,dump(metadata,body).encode()))
    return changes


def main():
    cli=argparse.ArgumentParser(description=__doc__)
    cli.add_argument('--source',type=Path,required=True)
    cli.add_argument('--apply',action='store_true')
    cli.add_argument('--backup',type=Path)
    args=cli.parse_args();source=args.source.resolve();changes=plan(source)
    if args.apply:
        if not args.backup or args.backup.resolve().is_relative_to(source):
            cli.error('--apply requires --backup outside the catalogue')
        args.backup.parent.mkdir(parents=True,exist_ok=True)
        with zipfile.ZipFile(args.backup,'x',compression=zipfile.ZIP_DEFLATED) as archive:
            for path,before,after in changes:
                if before is not None:archive.writestr(str(path.relative_to(source)),before)
        for path,before,after in changes:
            if (path.read_bytes() if path.exists() else None)!=before:
                raise ValueError(f'Source changed during migration: {path}')
        for path,before,after in changes:path.write_bytes(after)
    print(json.dumps({'apply':args.apply,'files':len(changes),'sharedCards':sum(p.name==p.parent.name+'.md' for p,_,_ in changes),'backup':str(args.backup) if args.apply else None}))

if __name__=='__main__':main()
