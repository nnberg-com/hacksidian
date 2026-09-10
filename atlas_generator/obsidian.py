"""Read a local Obsidian style snapshot; never edit its theme or snippets."""
from dataclasses import dataclass
from pathlib import Path
import base64
import hashlib
import json
import mimetypes
import struct
import sys
from urllib.parse import unquote, urlsplit
import tinycss2

@dataclass
class ObsidianStyle:
    css: str
    classes: str
    sources: dict
    theme: str

class Asar:
    def __init__(self, path):
        self.path = path
        with path.open('rb') as f:
            header = struct.unpack('<4I', f.read(16))
            self.files = json.loads(f.read(header[3]))['files']
            self.offset = 8 + header[1]

    def read(self, name):
        entry = {'files': self.files}
        for part in Path(name).parts:
            if part in ('..', '/'):
                raise ValueError('Invalid Obsidian resource path')
            entry = entry['files'][part]
        if entry.get('unpacked'):
            return Path(str(self.path) + '.unpacked', name).read_bytes()
        with self.path.open('rb') as f:
            f.seek(self.offset + int(entry['offset']))
            return f.read(entry['size'])


def embed_resources(css, read_resource):
    """Copy local fonts/images into CSS so previews also work from file://."""
    nodes = tinycss2.parse_stylesheet(css)
    def url(value):
        if urlsplit(value).scheme or value.startswith(('#', '//')):
            return value
        data = read_resource(unquote(urlsplit(value).path))
        mime = mimetypes.guess_type(value)[0] or 'application/octet-stream'
        return 'data:' + mime + ';base64,' + base64.b64encode(data).decode()
    def walk(items):
        for node in items:
            if node.type == 'url':
                node.value = url(node.value)
                node.representation = 'url(' + json.dumps(node.value) + ')'
            elif node.type == 'function' and node.lower_name == 'url':
                significant = [a for a in node.arguments if a.type not in ('whitespace','comment')]
                if len(significant) == 1 and significant[0].type == 'string':
                    value = url(significant[0].value)
                    node.arguments = tinycss2.parse_component_value_list(json.dumps(value))
            else:
                for attr in ('prelude','content','arguments'):
                    child = getattr(node, attr, None)
                    if child: walk(child)
    walk(nodes)
    return tinycss2.serialize(nodes)


def load_style(config: Path, app_archive: Path):
    config = config.resolve()
    appearance = json.loads((config/'appearance.json').read_text())
    archive = Asar(app_archive)
    hashes = {}
    def record(name, data):
        hashes[name] = hashlib.sha256(data).hexdigest()
        return data
    base = record(str(app_archive) + ':app.css', archive.read('app.css')).decode()
    chunks = [embed_resources(base, lambda name: record(str(app_archive)+':'+name, archive.read(name)))]
    theme = appearance.get('cssTheme', '')
    paths = []
    if theme: paths.append(config/'themes'/theme/'theme.css')
    paths.extend(config/'snippets'/(name+'.css') for name in sorted(appearance.get('enabledCssSnippets', [])))
    for path in paths:
        if '..' in path.relative_to(config).parts: raise ValueError('Style path escapes Obsidian config')
        # Theme and snippet files can be intentional symlinks to a local project.
        path = path.resolve()
        if not path.is_file():
            # Obsidian may retain disabled/deleted snippet IDs after a structure update.
            if path.parent == config/'snippets': continue
            raise ValueError(f'Missing theme: {path}')
        def resource(name):
            p = (path.parent/name).resolve()
            if not p.is_relative_to(path.parent): raise ValueError('CSS resource escapes its style directory')
            return record(str(p), p.read_bytes())
        chunks.append(embed_resources(record(str(path), path.read_bytes()).decode(), resource))
    preferences = {}
    for key, prop in [('textFontFamily','--font-text-override'),('interfaceFontFamily','--font-interface-override'),('monospaceFontFamily','--font-monospace-override')]:
        if appearance.get(key): preferences[prop] = appearance[key]
    if appearance.get('baseFontSize'): preferences['--font-text-size'] = str(float(appearance['baseFontSize']))+'px'
    rule = tinycss2.parse_stylesheet('body{}')[0]
    rule.content = tinycss2.parse_component_value_list(';'.join(k+':'+v for k,v in preferences.items()))
    chunks.append(tinycss2.serialize([rule]))
    record(str(config/'appearance.json'), (config/'appearance.json').read_bytes())
    theme_class = 'theme-dark' if appearance.get('theme') == 'obsidian' else 'theme-light'
    platform = 'mod-macos' if sys.platform == 'darwin' else 'mod-windows' if sys.platform == 'win32' else 'mod-linux'
    return ObsidianStyle('\n'.join(chunks), theme_class+' '+platform+' is-desktop', hashes, theme)
