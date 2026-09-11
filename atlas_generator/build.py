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
from urllib.parse import quote, unquote, urlencode, urlsplit

from lxml import html
import tinycss2

from .i18n import tr, strings, localize_shell, SECTION_NAMES, normalize_language
from .localization import read_description, translation_inventory, resolve_build_languages
from . import VERSION
from .digests import load_digests, memberships
from .templates import atlas_css
from .obsidian import load_style
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
    language: str = "ru"
    description_language: str = "ru"


def safe_file(path: Path, source: Path) -> Path:
    resolved = path.resolve()
    if not resolved.is_relative_to(source.resolve()):
        raise ValueError(f'Resource escapes the catalogue: {path}')
    if not resolved.is_file():
        raise ValueError(f'Missing file: {path}')
    return resolved


def read(path: Path, source: Path) -> str:
    return safe_file(path, source).read_text(encoding='utf-8')


def load(source: Path, language: str, ui_language=None):
    ui_language = ui_language or language
    hacks = source / '! hacks'
    if not hacks.is_dir():
        raise ValueError(f'Missing technique directory: {hacks}')
    if not re.fullmatch(r'[a-z]{2}(?:-[A-Z]{2})?', language):
        raise ValueError('Language must be a language code, e.g. ru or en')
    techniques = []
    digests = load_digests(source, ui_language)
    categories = {}
    category_dir = source / '! categories'
    if category_dir.exists():
        for p in sorted(category_dir.glob('*.md')):
            if p.stem.startswith('!'):
                continue
            metadata, body = split_frontmatter(read(p, source))
            category_title = metadata.get('title' if ui_language == 'ru' else 'title_en')
            if not isinstance(category_title, str) or not category_title.strip():
                raise ValueError(f'{p}: missing category title for {ui_language}')
            categories[p.stem] = {'title': category_title, 'sources': metadata.get('sources', []), 'source_text': section(body, 'Источники категории')}
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
        for key in ['category', 'format', 'interactive']:
            if key not in metadata:
                raise ValueError(f'{uid}: missing metadata field {key}')
        if metadata['format'] not in {'markdown', 'html', 'properties'}:
            raise ValueError(f'{uid}: unknown format {metadata["format"]}')
        if type(metadata['interactive']) is not bool:
            raise ValueError(f'{uid}: interactive must be a YAML boolean')
        if 'title' in metadata or 'group' in metadata:
            raise ValueError(f'{uid}: title and group labels belong in Description.<language>.md')
        if not isinstance(metadata['category'], str):
            raise ValueError(f'{uid}: category must be a string')
        localized, card = read_description(directory, ui_language, lambda p: read(p, source))
        metadata.update({key: localized[key] for key in ('title', 'group') if key in localized})
        if not isinstance(metadata.get('sources', []), list):
            raise ValueError(f'{uid}: sources must be a list')
        metadata['digest'] = memberships(metadata, digests, uid)
        markdown = read(directory / f'Markdown.{language}.md', source)
        properties, body = split_frontmatter(markdown)
        css = atlas_css(directory, lambda p: read(p, source))
        errors = [n for n in tinycss2.parse_stylesheet(css) if n.type == 'error']
        if errors:
            raise ValueError(f'{uid}: malformed stylesheet: {errors[0].message}')
        model_file = directory / f'Model.{language}.html'
        model = read(model_file, source) if model_file.exists() else None
        model_css = read(directory / 'Model.css', source) if model else ''
        techniques.append(Technique(uid, directory, metadata, card, markdown, properties, body, css, model, model_css, language, ui_language))
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


def wrapped_document(title: str, body: str, styles: str, script: bool = True, language: str = "ru") -> str:
    # The embedded CSS is data; prevent an accidental style closing tag escaping it.
    styles = re.sub(r'</style', r'<\\/style', styles, flags=re.I)
    return (f'<!doctype html>\n<html lang="{language}"><head><meta charset="utf-8">'
            '<meta name="viewport" content="width=device-width,initial-scale=1">'
            f'<title>{ESC(title)}</title><style>{styles}</style></head><body>' + body +
            ('<script src="../../preview.js"></script>' if script else '') + '</body></html>\n')


def preview(technique: Technique, obsidian=None):
    t = technique
    ui = t.description_language
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
        # Interface models contain their own native note host. The outer frame
        # must not activate the recipe on the comparison's baseline pane.
        if root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," hacksidian-interface-model ")]'):
            classes = f'atlas-{t.id}'
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
        body += f'<aside class="atlas-destinations" aria-label="{tr(ui, "link_targets")}">' + ''.join(
            f'<section id="{ESC(key, quote=True)}"><p>{ESC(tr(ui, "link_target", target=key))}</p>'
            f'<a href="#sample">{tr(ui, "return_example")}</a></section>' for key in missing_fragments) + '</aside>'
    model_layout = (HERE / 'static' / 'interface-model.css').read_text()
    base = (HERE / 'static' / 'preview.css').read_text() + '\n' + model_layout
    if obsidian:
        # These classes activate the unmodified working snippets inside an isolated frame.
        root = html.fragment_fromstring(body, create_parent='div')
        for el in root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," markdown-preview-view ") or contains(concat(" ",normalize-space(@class)," ")," markdown-source-view ")]'):
            el.set('class', el.get('class','') + ' callmered-coloring')
        body = serialize_inner(root)
        css = t.css
        # Only frame layout belongs to the browser adapter. Typography comes from Obsidian.
        frame = 'html,body{overscroll-behavior:auto} body{display:block;position:static;contain:none;height:auto;overflow:auto;margin:0;padding:16px} .markdown-preview-view{height:auto;overflow:visible} '
        document = wrapped_document(t.metadata['title'], body, frame + model_layout + css, language=t.language)
        document = document.replace('<style>', '<link rel="stylesheet" href="../../obsidian.css"><style>', 1)
        document = document.replace('<body>', '<body class="' + obsidian.classes + '">', 1)
        return document, mode, missing_fragments
    return wrapped_document(t.metadata['title'], body, base + '\n' + foundation + '\n' + t.css, language=t.language), mode, missing_fragments


def check_resources(document: str, css: str, directory: Path, source: Path):
    """Validate resource dependencies, ignoring ordinary outbound hyperlinks."""
    root = html.document_fromstring(document)
    links = []
    for node in root.xpath('//*[@src]|//link[@href]'):
        url = node.get('src') or node.get('href')
        if url in ('../../preview.js', '../../obsidian.css'):
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


def description_section(t, key):
    return section(t.card, SECTION_NAMES[getattr(t, 'description_language', 'ru')][key])


def source_details(t: Technique, category: dict, ui_language=None) -> str:
    ui_language = ui_language or getattr(t, 'description_language', 'ru')
    pieces, seen = [], set()
    for label, text, urls in [
        (tr(ui_language, 'technique_sources'), description_section(t, 'sources'), t.metadata.get('sources', [])),
        (tr(ui_language, 'category_sources'), category.get('source_text', ''), category.get('sources', [])),
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
                link.text = (link.text or tr(ui_language, 'source_example')) + ': '
                link.append(path)
        extra = []
        for url in urls:
            if isinstance(url, str) and url.startswith(('https://', 'http://')) and url not in seen:
                seen.add(url)
                extra.append(f'<li><a href="{ESC(url, quote=True)}" target="_blank" rel="noopener noreferrer">{ESC(url)}</a></li>')
        body = serialize_inner(root) + ('<ul>' + ''.join(extra) + '</ul>' if extra else '')
        if body.strip():
            pieces.append(f'<section><h2>{label}</h2>{body}</section>')
    return ''.join(pieces) or f'<p>{tr(ui_language, "no_sources")}</p>'


def recipe_page(t: Technique, category: dict, language: str, has_model: bool, digests=None, ui_language=None) -> str:
    meta = t.metadata
    ui_language = ui_language or language
    digest_label = tr(ui_language, 'digests')
    digest_badges = ''.join(f'<span>{ESC((digests or {})[uid]["title"])}</span>' for uid in meta.get('digest', []))
    digest_row = f'<p class="badges digest-badges" aria-label="{digest_label}">{digest_label}: {digest_badges}</p>' if digest_badges else ''
    purpose = description_section(t, 'purpose')
    how = description_section(t, 'how')
    action = description_section(t, 'action')
    limit = description_section(t, 'limitations')
    fallback = description_section(t, 'description') if not (purpose or how) else ''
    labels = {'markdown': 'Markdown', 'html': 'HTML', 'properties': 'Properties'}
    description = ''.join(f'<section><h2>{heading}</h2>{render_prose(value)}</section>'
                          for heading, value in [(tr(ui_language, key), value) for key, value in [('purpose', purpose), ('how', how), ('action', action), ('limitations', limit), ('description', fallback)]] if value)
    model = (f'<a class="button" href="model.html" target="_blank">{tr(ui_language, "original_model")}</a>' if has_model else '')
    # This generated preview is sanitized by clean_dom; only our preview.js runs.
    # Preserve its origin so local images/CSS load when the atlas uses file://.
    # Source-authored nested iframes retain their separate restrictive sandbox.
    source_list = source_details(t, category, ui_language)
    obsidian_uri = "obsidian://open?" + urlencode({
        "path": str((t.directory / f"Description.{ui_language}.md").resolve()),
        "paneType": "tab",
    }, quote_via=quote)
    return f'''<!doctype html>
<html lang="{ui_language}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{ESC(meta['title'])}</title><link rel="stylesheet" href="../../recipe.css"><script defer src="../../recipe.js"></script></head>
<body><main>
<header><p class="eyebrow">{ESC(category['title'])} · {ESC(t.id)}</p><h1>{ESC(meta['title'])}</h1>
<p class="badges"><span>{labels[meta['format']]}</span><span>{tr(ui_language, 'interactive' if meta['interactive'] else 'static')}</span></p>
{digest_row}
<p><a class="button" href="{ESC(obsidian_uri, quote=True)}">{tr(ui_language, 'open_obsidian')}</a></p></header>
<div class="recipe-columns"><section class="visual-column" aria-label="{tr(ui_language, 'demonstration')}"><div class="preview-toolbar"><a class="button" href="preview.html" target="_blank">{tr(ui_language, 'open_example')}</a>{model}<span>{tr(ui_language, 'resize')}</span></div>
<div class="preview-frame"><iframe src="preview.html" title="{ESC(meta['title'], quote=True)}" sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"></iframe></div>
</section><section class="details-column" aria-label="{tr(ui_language, 'details')}"><div class="explanation">{description}</div>
<details><summary>Markdown</summary><a download href="Markdown.{language}.md">{tr(ui_language, 'download', file=f'Markdown.{language}.md')}</a><pre><code>{ESC(t.markdown)}</code></pre></details>
<details><summary>CSS</summary><a download href="snippet.css">{tr(ui_language, 'download', file='snippet.css')}</a><pre><code>{ESC(t.css)}</code></pre></details>
<details class="sources" open><summary>{tr(ui_language, 'sources')}</summary>{source_list}</details></section></div>
</main></body></html>'''


def copy_inputs(t: Technique, destination: Path, source: Path, language: str, reads: dict):
    allowed = {f'Description.{t.description_language}.md', f'Markdown.{language}.md', 'snippet.css', f'Model.{language}.html', 'Model.css', 'recipe.css', 'hack.json'}
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


def compile_catalogue(source: Path, language: str, obsidian=None, ui_language=None):
    techniques, categories = load(source, language, ui_language)
    rendered = []
    for t in techniques:
        document, mode, targets = preview(t, obsidian)
        remote = check_resources(document, t.css + '\n' + t.model_css, t.directory, source)
        rendered.append((t, document, mode, targets, remote))
    return rendered, categories



def themed_shell(document, obsidian, prefix=''):
    if not obsidian:
        return document
    root = html.document_fromstring(document)
    head = root.find('head')
    base = html.Element('link', rel='stylesheet', href=prefix+'obsidian.css')
    head.insert(0, base)
    head.append(html.Element('link', rel='stylesheet', href=prefix+'obsidian-shell.css'))
    body = root.find('body')
    body.set('class', (body.get('class', '')+' '+obsidian.classes+' hacksidian-atlas-shell').strip())
    return '<!doctype html>\n'+html.tostring(root, encoding='unicode')


def discover_obsidian_config(source):
    for directory in [source.resolve(), *source.resolve().parents]:
        config = directory / '.obsidian'
        if (config / 'appearance.json').is_file():
            return config
    return None

def build(source: Path, output: Path, language: str, obsidian=None, ui_language=None):
    source, output = source.resolve(), output.resolve()
    if source == output or output.is_relative_to(source) or source.is_relative_to(output):
        raise ValueError('The build output must be outside the source catalogue')
    if output.exists():
        marker = output / 'build-report.json'
        if not marker.is_file() or json.loads(marker.read_text()).get('owner') != OWNER:
            raise ValueError(f'Refusing to replace a directory not owned by this generator: {output}')
    ui_language = ui_language or ('ru' if language == 'ru' else 'en')
    if ui_language not in ('ru', 'en'):
        raise ValueError('UI language must be ru or en')
    rendered, categories = compile_catalogue(source, language, obsidian, ui_language)
    digests = load_digests(source, ui_language)
    output.parent.mkdir(parents=True, exist_ok=True)
    staging = Path(tempfile.mkdtemp(prefix='.atlas-build-', dir=output.parent))
    entries, inputs = [], {}
    try:
        if obsidian:
            (staging / 'obsidian.css').write_text(obsidian.css)
        for t, document, mode, targets, remote in rendered:
            folder = staging / 'recipes' / t.id
            folder.mkdir(parents=True)
            copy_inputs(t, folder, source, language, inputs)
            card_path = t.directory / (t.id + '.md')
            inputs[str(card_path.relative_to(source))] = hashlib.sha256(card_path.read_bytes()).hexdigest()
            (folder / 'snippet.css').write_text(t.css)
            (folder / 'preview.html').write_text(document)
            (folder / 'index.html').write_text(themed_shell(recipe_page(t, categories[t.metadata['category']], language, bool(t.model), digests, ui_language), obsidian, '../../'))
            if t.model:
                model_doc = html.document_fromstring(t.model)
                clean_dom(model_doc)
                (folder / 'model.html').write_text('<!doctype html>\n' + html.tostring(model_doc, encoding='unicode'))
            purpose = description_section(t, 'purpose')
            how = description_section(t, 'how')
            entries.append({'id': t.id, 'title': t.metadata['title'], 'category': t.metadata['category'],
                            'categoryTitle': categories[t.metadata['category']]['title'],
                            'digest': t.metadata['digest'],
                            'group': t.metadata.get('group', ''), 'format': t.metadata['format'],
                            'interactive': t.metadata['interactive'], 'url': f'recipes/{t.id}/index.html',
                            'search': ' '.join([t.id, t.metadata['title'], str(t.metadata.get('group', '')), purpose, how, t.body, re.sub(r'data:[^\s)]+', '', t.css)]).casefold(),
                            'mode': mode, 'model': bool(t.model), 'context_targets': targets, 'remote_resources': remote})
        for p in [*(source / '! categories').glob('*.md'), *(source / '! digests').glob('*.md')]:
            inputs[str(p.relative_to(source))] = hashlib.sha256(read(p, source).encode()).hexdigest()
        for p in (HERE / 'static').iterdir():
            if p.name != 'preview.css':
                shutil.copy2(p, staging / p.name)
        index = staging / 'index.html'
        index.write_text(themed_shell(localize_shell(index.read_text(), ui_language), obsidian))
        payload = json.dumps({'entries': entries, 'categories': categories, 'digests': digests, 'uiLanguage': ui_language, 'contentLanguage': language, 'i18n': strings(ui_language)}, ensure_ascii=False).replace('</', '<\\/')
        (staging / 'catalog.js').write_text('window.ATLAS = ' + payload + ';\n')
        versions = {name: importlib.metadata.version(name) for name in ['markdown-it-py', 'mdit-py-plugins', 'PyYAML', 'lxml', 'tinycss2']}
        report = {'owner': OWNER, 'generator_version': VERSION, 'renderer_contract': CONTRACT_VERSION,
                  'language': language, 'ui_language': ui_language, 'digests': {uid: sum(uid in e['digest'] for e in entries) for uid in digests}, 'techniques': len(entries), 'categories': len(categories),
                  'interactive': sum(e['interactive'] for e in entries), 'modes': dict(Counter(e['mode'] for e in entries)),
                  'model_references': sum(e['model'] for e in entries), 'dependencies': versions,
                  'inputs': inputs, 'input_digest': hashlib.sha256(json.dumps(inputs, sort_keys=True).encode()).hexdigest(),
                  'context_targets': {e['id']: e['context_targets'] for e in entries if e['context_targets']},
                  'remote_resources': {e['id']: e['remote_resources'] for e in entries if e['remote_resources']},
                  'legacy_atlas_required': False,
                  'obsidian_style': {'theme': obsidian.theme, 'classes': obsidian.classes, 'sources': obsidian.sources} if obsidian else None}
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
        p.add_argument('--lang', choices=['ru', 'en'], help='Example language; defaults to plugin content language')
        p.add_argument('--ui-lang', choices=['ru', 'en'], help='Interface language; defaults to the effective plugin interface language')
        style_options = p.add_mutually_exclusive_group()
        style_options.add_argument('--obsidian-config', type=Path, help='Read the local theme and enabled snippets from this config directory; by default discover the source vault')
        style_options.add_argument('--standalone', action='store_true', help='Explicitly build without the Obsidian theme')
        p.add_argument('--obsidian-app', type=Path, default=Path('/Applications/Obsidian.app/Contents/Resources/obsidian.asar'))
        if name == 'build':
            p.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    translations = sub.add_parser('translations', help='Report translation completeness without building')
    translations.add_argument('--source', type=Path, default=DEFAULT_SOURCE)
    translations.add_argument('--output', type=Path, help='Optional JSON report outside the catalogue')
    serve = sub.add_parser('serve', help='Serve an existing build on localhost')
    serve.add_argument('--output', type=Path, default=DEFAULT_OUTPUT)
    serve.add_argument('--port', type=int, default=8765)
    args = cli.parse_args(argv)
    try:
        config = None
        if args.command in ('build', 'check'):
            config = args.obsidian_config or discover_obsidian_config(args.source)
            args.lang, args.ui_lang = resolve_build_languages(config, args.lang, args.ui_lang)
        obsidian = load_style(config, args.obsidian_app) if config and not args.standalone else None
        if args.command == 'translations':
            report = translation_inventory(args.source.resolve())
            if args.output:
                if args.output.resolve().is_relative_to(args.source.resolve()):
                    raise ValueError('Translation report must be outside the source catalogue')
                args.output.parent.mkdir(parents=True, exist_ok=True)
                args.output.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n')
            print(json.dumps({'techniques': report['techniques'], 'complete': {lang: data['complete'] for lang, data in report['languages'].items()}}, ensure_ascii=False))
        elif args.command == 'build':
            report = build(args.source, args.output, args.lang, obsidian, args.ui_lang)
            print(json.dumps({'output': str(args.output.resolve()), 'techniques': report['techniques'], 'modes': report['modes'], 'theme': obsidian.theme if obsidian else None}, ensure_ascii=False))
        elif args.command == 'check':
            rendered, categories = compile_catalogue(args.source.resolve(), args.lang, obsidian, args.ui_lang)
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
