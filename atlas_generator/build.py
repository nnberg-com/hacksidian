from __future__ import annotations

import argparse
from collections import Counter
from dataclasses import dataclass
from functools import partial
import hashlib
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import importlib.metadata
import json
import os
from pathlib import Path
import re
import shutil
import sys
import tempfile
from urllib.parse import unquote, urlsplit

from lxml import html
import tinycss2

from . import VERSION
from .templates import atlas_css
from .render import (ESC, CONTRACT_VERSION, clean_dom, model_foundation, parser,
                     render_markdown, render_properties, serialize_inner, split_frontmatter)

HERE = Path(__file__).resolve().parent
DEFAULT_SOURCE = Path('/Users/op/vaults/op/! P R O/hacksidian/atlas')
DEFAULT_OUTPUT = HERE.parent / 'build' / 'atlas'
OWNER = 'hacksidian-atlas-generator'


@dataclass
class Technique:
    id: str
    directory: Path
    metadata: dict
    card: str
    markdown: str
    yaml: dict
    body: str
    css: str
    model: str | None
    model_css: str


def safe_file(path: Path, source: Path) -> Path:
    resolved = path.resolve()
    if not resolved.is_relative_to(source.resolve()):
        raise ValueError(f'Resource escapes the catalogue: {path}')
    if not resolved.is_file():
        raise ValueError(f'Missing file: {path}')
    return resolved


def read(path: Path, source: Path) -> str:
    return safe_file(path, source).read_text(encoding='utf-8')


def load(source: Path, language: str):
    hacks = source / '! hacks'
    if not hacks.is_dir():
        raise ValueError(f'Missing technique directory: {hacks}')
    if not re.fullmatch(r'[a-z]{2}(?:-[A-Z]{2})?', language):
        raise ValueError('Language must be a language code, e.g. ru or en')
    techniques = []
    categories = {}
    category_dir = source / '! categories'
    if category_dir.exists():
        for p in sorted(category_dir.glob('*.md')):
            if p.stem.startswith('!'):
                continue
            metadata, body = split_frontmatter(read(p, source))
            categories[p.stem] = {'title': metadata.get('title', p.stem), 'sources': metadata.get('sources', []), 'source_text': section(body, 'Источники категории')}
    for directory in sorted(hacks.iterdir(), key=lambda p: natural(p.name)):
        if not directory.is_dir() or directory.name.startswith(('.', '!')):
            continue
        uid = directory.name
        if not re.fullmatch(r'[a-z0-9][a-z0-9-]*', uid):
            raise ValueError(f'Invalid technique ID: {uid}')
        card_file = directory / (uid + '.md')
        if not card_file.exists():
            raise ValueError(f'Missing metadata card: {card_file}')
        metadata, card = split_frontmatter(read(card_file, source))
        for key in ['title', 'category', 'format', 'interactive']:
            if key not in metadata:
                raise ValueError(f'{uid}: missing metadata field {key}')
        if metadata['format'] not in {'markdown', 'html', 'properties'}:
            raise ValueError(f'{uid}: unknown format {metadata["format"]}')
        if type(metadata['interactive']) is not bool:
            raise ValueError(f'{uid}: interactive must be a YAML boolean')
        if not isinstance(metadata['title'], str) or not isinstance(metadata['category'], str):
            raise ValueError(f'{uid}: title and category must be strings')
        if not isinstance(metadata.get('sources', []), list):
            raise ValueError(f'{uid}: sources must be a list')
        markdown = read(directory / f'Markdown.{language}.md', source)
        properties, body = split_frontmatter(markdown)
        css = atlas_css(directory, lambda p: read(p, source))
        errors = [n for n in tinycss2.parse_stylesheet(css) if n.type == 'error']
        if errors:
            raise ValueError(f'{uid}: malformed stylesheet: {errors[0].message}')
        model_file = directory / f'Model.{language}.html'
        model = read(model_file, source) if model_file.exists() else None
        model_css = read(directory / 'Model.css', source) if model else ''
        techniques.append(Technique(uid, directory, metadata, card, markdown, properties, body, css, model, model_css))
        categories.setdefault(metadata['category'], {'title': metadata['category'], 'sources': []})
    if not techniques:
        raise ValueError('The catalogue contains no techniques')
    return techniques, categories


def natural(value):
    return [int(p) if p.isdigit() else p for p in re.split(r'(\d+)', value)]


def section(card: str, name: str) -> str:
    m = re.search(r'^## ' + re.escape(name) + r'\s*\n(.*?)(?=^## |\Z)', card, re.M | re.S)
    return m[1].strip() if m else ''


def render_prose(text: str) -> str:
    # Metadata prose never contributes active scripts to the atlas navigation.
    root = html.fragment_fromstring(parser().render(text), create_parent='div')
    clean_dom(root)
    return serialize_inner(root)


def wrapped_document(title: str, body: str, styles: str, script: bool = True) -> str:
    # The embedded CSS is data; prevent an accidental style closing tag escaping it.
    styles = re.sub(r'</style', r'<\\/style', styles, flags=re.I)
    return ('<!doctype html>\n<html lang="ru"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{ESC(title)}</title><style>{styles}</style></head><body>' + body +
            ('<script src="../../preview.js"></script>' if script else '') + '</body></html>\n')


def preview(technique: Technique):
    t = technique
    anchor = str(t.metadata.get('source_anchor') or t.id)
    if not re.fullmatch(r'[\w-]+', anchor):
        raise ValueError(f'{t.id}: unsafe source_anchor')
    github = t.id.startswith('callout-technical-gh-')
    if t.metadata['format'] == 'properties':
        content = render_properties(t.yaml, t.body, t.id, t.model)
        foundation = model_foundation(t.model_css) if t.model_css else ''
        root = html.fragment_fromstring(content, create_parent='div')
        body = serialize_inner(root)
        mode = 'properties-model' if t.model else 'properties-generic'
    else:
        content = render_markdown(t.body, anchor, github=github)
        classes = f'atlas-{t.id} markdown-preview-view markdown-rendered'
        root = html.fragment_fromstring(content, create_parent='div')
        root.set('class', classes)
        root.set('id', 'sample')
        body = html.tostring(root, encoding='unicode')
        foundation = ''
        mode = 'html' if t.metadata['format'] == 'html' else 'markdown'
    # Old demos reference #destination etc. Preserve the navigation without
    # inserting targets among Markdown children and disturbing nth-child rules.
    check_root = html.fragment_fromstring(body, create_parent='div')
    ids = {n.get('id') for n in check_root.iter() if n.get('id')}
    missing_fragments = sorted({unquote(n.get('href')[1:]) for n in check_root.iter('a')
                                if n.get('href', '').startswith('#') and n.get('href')[1:]
                                and unquote(n.get('href')[1:]) not in ids})
    if missing_fragments:
        body += '<aside class="atlas-destinations" aria-label="Цели ссылок примера">' + ''.join(
            f'<section id="{ESC(key, quote=True)}"><p>Цель ссылки: {ESC(key)}</p>'
            '<a href="#sample">Вернуться к примеру</a></section>' for key in missing_fragments) + '</aside>'
    base = (HERE / 'static' / 'preview.css').read_text()
    return wrapped_document(t.metadata['title'], body, base + '\n' + foundation + '\n' + t.css), mode, missing_fragments


def check_resources(document: str, css: str, directory: Path, source: Path):
    """Validate resource dependencies, ignoring ordinary outbound hyperlinks."""
    root = html.document_fromstring(document)
    links = []
    for node in root.xpath('//*[@src]|//link[@href]'):
        url = node.get('src') or node.get('href')
        if url == '../../preview.js':
            continue
        links.append(url)
    links += [m[1] for m in re.finditer(r'url\(\s*["\']?([^"\')\s]+)', css)]
    remote = []
    for link in links:
        parsed = urlsplit(link)
        if parsed.scheme in {'data', 'blob'} or not parsed.path:
            continue
        if parsed.scheme or parsed.netloc:
            remote.append(link)
            continue
        safe_file(directory / unquote(parsed.path), source)
    return sorted(set(remote))


def source_details(t: Technique, category: dict) -> str:
    pieces, seen = [], set()
    for label, text, urls in [
        ('Источники приёма', section(t.card, 'Источники'), t.metadata.get('sources', [])),
        ('Источники категории', category.get('source_text', ''), category.get('sources', [])),
    ]:
        root = html.fragment_fromstring(render_prose(text), create_parent='div')
        for link in root.iter('a'):
            href = link.get('href', '')
            if href.startswith(('http://', 'https://')):
                seen.add(href)
            elif href.startswith('/'):
                # Preserve provenance without broken localhost URLs or legacy reads.
                path = html.Element('code')
                path.text = unquote(href)
                link.tag = 'span'
                link.attrib.clear()
                link.text = (link.text or 'Исходный пример') + ': '
                link.append(path)
        extra = []
        for url in urls:
            if isinstance(url, str) and url.startswith(('https://', 'http://')) and url not in seen:
                seen.add(url)
                extra.append(f'<li><a href="{ESC(url, quote=True)}" target="_blank" rel="noopener noreferrer">{ESC(url)}</a></li>')
        body = serialize_inner(root) + ('<ul>' + ''.join(extra) + '</ul>' if extra else '')
        if body.strip():
            pieces.append(f'<section><h2>{label}</h2>{body}</section>')
    return ''.join(pieces) or '<p>В картотеке источник не указан.</p>'


def recipe_page(t: Technique, category: dict, language: str, has_model: bool) -> str:
    meta = t.metadata
    purpose = section(t.card, 'Зачем')
    how = section(t.card, 'Как работает')
    action = section(t.card, 'Демонстрация')
    limit = section(t.card, 'Ограничения исходного приёма')
    fallback = section(t.card, 'Пояснения из HTML-атласа') if not (purpose or how) else ''
    labels = {'markdown': 'Markdown', 'html': 'HTML', 'properties': 'Properties'}
    description = ''.join(f'<section><h2>{heading}</h2>{render_prose(value)}</section>'
                          for heading, value in [('Зачем', purpose), ('Как работает', how), ('Действие', action), ('Ограничения', limit), ('Описание', fallback)] if value)
    model = ('<a class="button" href="model.html" target="_blank">Исходная HTML-модель ↗</a>' if has_model else '')
    source_list = source_details(t, category)
    return f'''<!doctype html>
<html lang="{language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{ESC(meta['title'])}</title><link rel="stylesheet" href="../../recipe.css"><script defer src="../../recipe.js"></script></head>
<body><main>
<header><p class="eyebrow">{ESC(category['title'])} · {ESC(t.id)}</p><h1>{ESC(meta['title'])}</h1>
<p class="badges"><span>{labels[meta['format']]}</span>{'<span>Интерактивный</span>' if meta['interactive'] else '<span>Статический</span>'}</p></header>
<div class="recipe-columns"><section class="visual-column" aria-label="Демонстрация"><div class="preview-toolbar"><a class="button" href="preview.html" target="_blank">Открыть пример ↗</a>{model}<span>Высоту области можно менять за нижний край</span></div>
<div class="preview-frame"><iframe src="preview.html" title="{ESC(meta['title'], quote=True)}" sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe></div>
</section><section class="details-column" aria-label="Описание и исходники"><div class="explanation">{description}</div>
<details><summary>Markdown</summary><a download href="Markdown.{language}.md">Скачать Markdown.{language}.md</a><pre><code>{ESC(t.markdown)}</code></pre></details>
<details><summary>CSS</summary><a download href="snippet.css">Скачать snippet.css</a><pre><code>{ESC(t.css)}</code></pre></details>
<details class="sources" open><summary>Источники</summary>{source_list}</details></section></div>
</main></body></html>'''


def copy_inputs(t: Technique, destination: Path, source: Path, language: str, reads: dict):
    allowed = {f'Markdown.{language}.md', 'snippet.css', f'Model.{language}.html', 'Model.css', 'recipe.template.css', 'dependencies.template.css', 'preview.css', 'hack.json'}
    for path in sorted(t.directory.rglob('*')):
        if not path.is_file():
            continue
        rel = path.relative_to(t.directory)
        if len(rel.parts) == 1 and rel.name not in allowed:
            continue
        if len(rel.parts) > 1 and rel.parts[0] != 'assets':
            continue
        if path.suffix == '.md' and len(rel.parts) > 1:
            continue  # Automatically created empty folder notes are not assets.
        resolved = safe_file(path, source)
        data = resolved.read_bytes()
        target = destination / rel
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_bytes(data)
        reads[str(path.relative_to(source))] = hashlib.sha256(data).hexdigest()


def compile_catalogue(source: Path, language: str):
    techniques, categories = load(source, language)
    rendered = []
    for t in techniques:
        document, mode, targets = preview(t)
        remote = check_resources(document, t.css + '\n' + t.model_css, t.directory, source)
        rendered.append((t, document, mode, targets, remote))
    return rendered, categories


def build(source: Path, output: Path, language: str):
    source, output = source.resolve(), output.resolve()
    if source == output or output.is_relative_to(source) or source.is_relative_to(output):
        raise ValueError('The build output must be outside the source catalogue')
    if output.exists():
        marker = output / 'build-report.json'
        if not marker.is_file() or json.loads(marker.read_text()).get('owner') != OWNER:
            raise ValueError(f'Refusing to replace a directory not owned by this generator: {output}')
    rendered, categories = compile_catalogue(source, language)
    output.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix='.atlas-build-', dir=output.parent))
    entries, inputs = [], {}
    try:
        for t, document, mode, targets, remote in rendered:
            folder = staging / 'recipes' / t.id
            folder.mkdir(parents=True)
            copy_inputs(t, folder, source, language, inputs)
            card_path = t.directory / (t.id + '.md')
            inputs[str(card_path.relative_to(source))] = hashlib.sha256(card_path.read_bytes()).hexdigest()
            (folder / 'snippet.css').write_text(t.css)
            (folder / 'preview.html').write_text(document)
            (folder / 'index.html').write_text(recipe_page(t, categories[t.metadata['category']], language, bool(t.model)))
            if t.model:
                model_doc = html.document_fromstring(t.model)
                clean_dom(model_doc)
                (folder / 'model.html').write_text('<!doctype html>\n' + html.tostring(model_doc, encoding='unicode'))
            purpose = section(t.card, 'Зачем')
            how = section(t.card, 'Как работает')
            entries.append({'id': t.id, 'title': t.metadata['title'], 'category': t.metadata['category'],
                            'categoryTitle': categories[t.metadata['category']]['title'],
                            'group': t.metadata.get('group', ''), 'format': t.metadata['format'],
                            'interactive': t.metadata['interactive'], 'url': f'recipes/{t.id}/index.html',
                            'search': ' '.join([t.id, t.metadata['title'], str(t.metadata.get('group', '')), purpose, how, t.body, re.sub(r'data:[^\s)]+', '', t.css)]).casefold(),
                            'mode': mode, 'model': bool(t.model), 'context_targets': targets, 'remote_resources': remote})
        for p in (source / '! categories').glob('*.md'):
            inputs[str(p.relative_to(source))] = hashlib.sha256(read(p, source).encode()).hexdigest()
        for p in (HERE / 'static').iterdir():
            if p.name != 'preview.css':
                shutil.copy2(p, staging / p.name)
        payload = json.dumps({'entries': entries, 'categories': categories}, ensure_ascii=False).replace('</', '<\\/')
        (staging / 'catalog.js').write_text('window.ATLAS = ' + payload + ';\n')
        versions = {name: importlib.metadata.version(name) for name in ['markdown-it-py', 'mdit-py-plugins', 'PyYAML', 'lxml', 'tinycss2']}
        report = {'owner': OWNER, 'generator_version': VERSION, 'renderer_contract': CONTRACT_VERSION,
                  'language': language, 'techniques': len(entries), 'categories': len(categories),
                  'interactive': sum(e['interactive'] for e in entries), 'modes': dict(Counter(e['mode'] for e in entries)),
                  'model_references': sum(e['model'] for e in entries), 'dependencies': versions,
                  'inputs': inputs, 'input_digest': hashlib.sha256(json.dumps(inputs, sort_keys=True).encode()).hexdigest(),
                  'context_targets': {e['id']: e['context_targets'] for e in entries if e['context_targets']},
                  'remote_resources': {e['id']: e['remote_resources'] for e in entries if e['remote_resources']},
                  'legacy_atlas_required': False}
        (staging / 'build-report.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
        backup = None
        if output.exists():
            backup = staging.with_name(staging.name + '-previous')
            output.rename(backup)
        try:
            staging.rename(output)
        except BaseException:
            if backup:
                backup.rename(output)
            raise
        if backup:
            shutil.rmtree(backup)
        return report
    finally:
        if staging.exists():
            shutil.rmtree(staging)


def main(argv=None):
    cli = argparse.ArgumentParser(description='Build a local HTML atlas from Obsidian cards. Never modifies the catalogue.')
    sub = cli.add_subparsers(dest='command', required=True)
    for name in ['build', 'check']:
        p = sub.add_parser(name)
        p.add_argument('--source', type=Path, default=DEFAULT_SOURCE)
        p.add_argument('--lang', default='ru')
        if name == 'build':
            p.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    serve = sub.add_parser('serve', help='Serve an existing build on localhost')
    serve.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    serve.add_argument('--port', type=int, default=8765)
    args = cli.parse_args(argv)
    try:
        if args.command == 'build':
            report = build(args.source, args.output, args.lang)
            print(json.dumps({'output': str(args.output.resolve()), 'techniques': report['techniques'], 'modes': report['modes']}, ensure_ascii=False))
        elif args.command == 'check':
            rendered, categories = compile_catalogue(args.source.resolve(), args.lang)
            print(json.dumps({'valid': True, 'techniques': len(rendered), 'categories': len(categories)}, ensure_ascii=False))
        else:
            if not (args.output / 'index.html').is_file():
                raise ValueError('No build found; run build first')
            handler = partial(SimpleHTTPRequestHandler, directory=str(args.output.resolve()))
            with ThreadingHTTPServer(('127.0.0.1', args.port), handler) as server:
                print(f'http://127.0.0.1:{args.port}/', flush=True)
                server.serve_forever()
    except (ValueError, OSError, KeyError) as exc:
        print(f'Atlas error: {exc}', file=sys.stderr)
        return 1
    except KeyboardInterrupt:
        return 0
    return 0
