#!/usr/bin/env python3
"""Export a reference vault preset and assemble a release from repository sources."""
import argparse
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import shutil
import subprocess
import tempfile
import urllib.error
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
PRESET = ROOT / 'vault-template'
LOCK = ROOT / 'vault-dependencies.json'
CONFIGS = ['app.json', 'appearance.json', 'backlink.json', 'command-palette.json',
           'community-plugins.json', 'core-plugins.json', 'graph.json', 'hotkeys.json',
           'templates.json', 'types.json']
spec = importlib.util.spec_from_file_location('packer', ROOT / 'tools/build-starter-vault.py')
packer = importlib.util.module_from_spec(spec)
spec.loader.exec_module(packer)


def fetch(url):
    headers = {'User-Agent': 'Hacksidian-vault-builder'}
    if url.startswith('https://api.github.com/') and os.environ.get('GH_TOKEN'):
        headers['Authorization'] = 'Bearer ' + os.environ['GH_TOKEN']
    with urllib.request.urlopen(urllib.request.Request(url, headers=headers), timeout=90) as r:
        return r.read()


def remote_json(url):
    return json.loads(fetch(url))


def digest(data):
    return hashlib.sha256(data).hexdigest()


def write_json(path, value):
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(value, ensure_ascii=False, indent=2) + '\n')


def portable(data, name):
    text = data.decode('utf-8')
    if re.search(r'/Users/|/home/|[A-Za-z]:\\\\|obsidian://open\?[^\s]*vault=', text):
        raise ValueError(f'Non-portable reference in {name}')


def dependency(url, target):
    data = fetch(url)
    return {'url': url, 'path': target, 'sha256': digest(data)}


def resolve_dependencies(vault, enabled):
    registry = {p['id']: p['repo'] for p in remote_json('https://raw.githubusercontent.com/obsidianmd/obsidian-releases/master/community-plugins.json')}
    result = {'plugins': [], 'files': []}
    for pid in enabled:
        if pid == 'hacksidian':
            continue
        version = json.loads((vault / '.obsidian/plugins' / pid / 'manifest.json').read_text())['version']
        repo = registry[pid]
        release = None
        for tag in [version, 'v' + version]:
            try:
                release = remote_json(f'https://api.github.com/repos/{repo}/releases/tags/{tag}')
                break
            except urllib.error.HTTPError as e:
                if e.code != 404:
                    raise
        if release is None:
            raise ValueError(f'No release for {pid} {version}')
        assets = {a['name']: a['browser_download_url'] for a in release['assets']}
        for required in ['main.js', 'manifest.json']:
            if required not in assets:
                raise ValueError(f'Missing release asset: {pid}/{required}')
        manifest = remote_json(assets['manifest.json'])
        if manifest['id'] != pid or manifest['version'] != version:
            raise ValueError(f'Release manifest mismatch: {pid}')
        for name in ['main.js', 'manifest.json', 'styles.css']:
            if name in assets:
                result['files'].append(dependency(assets[name], f'.obsidian/plugins/{pid}/{name}'))
        entries = remote_json(f'https://api.github.com/repos/{repo}/contents?ref={release["tag_name"]}')
        licenses = [e for e in entries if e['type'] == 'file' and e['name'].lower().startswith(('license', 'licence', 'copying', 'notice'))]
        if not licenses:
            raise ValueError(f'No license found for {pid}')
        for entry in licenses:
            result['files'].append(dependency(entry['download_url'], f'licenses/{pid}/{entry["name"]}'))
        result['plugins'].append({'id': pid, 'version': version, 'repository': repo, 'tag': release['tag_name']})
    for icon in sorted((vault / '.obsidian/icons').glob('*.zip')):
        if icon.name not in ['font-awesome-brands.zip', 'font-awesome-regular.zip']:
            raise ValueError(f'Configure download source for icon pack: {icon.name}')
        dep = dependency('https://github.com/FortAwesome/Font-Awesome/releases/download/6.5.1/fontawesome-free-6.5.1-web.zip', '.obsidian/icons/' + icon.name)
        if digest(icon.read_bytes()) != dep['sha256']:
            raise ValueError(f'Icon pack differs from upstream: {icon.name}')
        result['files'].append(dep)
    return result


def export(vault, apply):
    vault = vault.resolve(strict=True)
    config = vault / '.obsidian'
    enabled = json.loads((config / 'community-plugins.json').read_text())
    if (config / 'themes').exists() and any((config / 'themes').iterdir()):
        raise ValueError('Add theme download sources before exporting a custom theme')
    deps = resolve_dependencies(vault, enabled)
    with tempfile.TemporaryDirectory() as tmp:
        staged = Path(tmp)
        files = [(config / n, '.obsidian/' + n) for n in CONFIGS if (config / n).is_file()]
        files += [(p, '.obsidian/snippets/' + p.name) for p in sorted((config / 'snippets').glob('*.css'))]
        files += [(config / 'plugins' / pid / 'data.json', f'.obsidian/plugins/{pid}/data.json') for pid in enabled if (config / 'plugins' / pid / 'data.json').is_file()]
        files.append((vault / 'INSTALL.md', 'INSTALL.md'))
        changes = []
        for source, name in files:
            payload = packer.prepare(source, name, changes)
            portable(payload, name)
            target = staged / name
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(payload)
        old = {str(p.relative_to(PRESET)): p.read_bytes() for p in PRESET.rglob('*') if p.is_file()} if PRESET.exists() else {}
        new = {str(p.relative_to(staged)): p.read_bytes() for p in staged.rglob('*') if p.is_file()}
        for name in sorted(old.keys() | new.keys()):
            if old.get(name) != new.get(name):
                print(('delete ' if name not in new else 'update ' if name in old else 'add ') + name)
        print('Dependency lock:', 'changed' if not LOCK.exists() or json.loads(LOCK.read_text()) != deps else 'unchanged')
        print('Cleaned fields:', ', '.join(changes))
        if apply:
            if PRESET.exists():
                shutil.rmtree(PRESET)
            shutil.copytree(staged, PRESET)
            write_json(LOCK, deps)
        else:
            print('Preview only. Use --apply to export.')


def assemble(output, name):
    output = output.resolve()
    if output.exists():
        raise ValueError('Output already exists')
    lock = json.loads(LOCK.read_text())
    with tempfile.TemporaryDirectory() as tmp:
        vault = Path(tmp) / 'vault'
        shutil.copytree(PRESET, vault)
        for folder in ['atlas', 'playground']:
            shutil.copytree(ROOT / 'content' / folder, vault / folder, ignore=shutil.ignore_patterns('.DS_Store', '.git'))
        for entry in lock['files']:
            rel = Path(entry['path'])
            if rel.is_absolute() or '..' in rel.parts:
                raise ValueError('Unsafe dependency path')
            payload = fetch(entry['url'])
            if digest(payload) != entry['sha256']:
                raise ValueError(f'Checksum mismatch: {entry["path"]}')
            dest = vault / rel
            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_bytes(payload)
        for item in lock['plugins']:
            manifest = json.loads((vault / '.obsidian/plugins' / item['id'] / 'manifest.json').read_text())
            if manifest['version'] != item['version'] or manifest['id'] != item['id']:
                raise ValueError('Dependency manifest mismatch')
        dest = vault / '.obsidian/plugins/hacksidian'
        dest.mkdir(parents=True, exist_ok=True)
        for filename in ['main.js', 'manifest.json', 'styles.css']:
            shutil.copyfile(ROOT / 'build/release' / filename, dest / filename)
        appearance = json.loads((vault / '.obsidian/appearance.json').read_text())
        for snippet in appearance.get('enabledCssSnippets', []):
            if not (vault / '.obsidian/snippets' / (snippet + '.css')).is_file():
                raise ValueError(f'Missing enabled snippet: {snippet}')
        write_json(vault / 'release-components.json', [json.loads((dest / 'manifest.json').read_text())] + lock['plugins'])
        output.parent.mkdir(parents=True, exist_ok=True)
        with output.with_suffix('.report.json').open('w') as report:
            subprocess.run(['python3', str(ROOT / 'tools/build-starter-vault.py'), str(vault), str(output), '--name', name], stdout=report, check=True)
    output.with_suffix('.sha256').write_text(f'{digest(output.read_bytes())}  {output.name}\n')
    print(output)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    sub = parser.add_subparsers(dest='command', required=True)
    exp = sub.add_parser('export')
    exp.add_argument('vault', type=Path)
    exp.add_argument('--apply', action='store_true')
    build = sub.add_parser('build')
    build.add_argument('output', type=Path)
    build.add_argument('--name', default='Hacksidian')
    args = parser.parse_args()
    if args.command == 'export':
        export(args.vault, args.apply)
    else:
        assemble(args.output, args.name)


if __name__ == '__main__':
    main()
