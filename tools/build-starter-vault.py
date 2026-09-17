#!/usr/bin/env python3
"""Package an existing Obsidian vault. Standard library only; source is read-only."""
import argparse
import fnmatch
import hashlib
import json
import os
from pathlib import Path
import re
import sys
import tempfile
import zipfile

SKIP_DIRS = {'.git', '.trash', '.obsidian-backups', 'node_modules', '__pycache__'}
SKIP_FILES = {'.DS_Store', 'Thumbs.db', 'desktop.ini'}
PRIVATE_CONFIG = {'workspace.json', 'workspace-mobile.json', 'workspaces.json',
                  'sync.json', 'publish.json', 'secrets.json'}
SECRET_KEYS = {'apikey', 'apikeys', 'token', 'accesstoken', 'refreshtoken',
               'authtoken', 'authorization', 'password', 'secret', 'clientsecret',
               'privatekey', 'credentials'}


def clean_secrets(value, location, changes):
    if isinstance(value, dict):
        result = {}
        for key, child in value.items():
            normalized = re.sub(r'[^a-z0-9]', '', key.lower())
            if normalized in SECRET_KEYS or normalized.endswith(('apikey', 'accesstoken', 'refreshtoken', 'password', 'clientsecret')):
                if child:
                    changes.append(f'{location}.{key}')
                result[key] = {} if isinstance(child, dict) else [] if isinstance(child, list) else ''
            else:
                result[key] = clean_secrets(child, f'{location}.{key}', changes)
        return result
    if isinstance(value, list):
        return [clean_secrets(child, f'{location}[{i}]', changes) for i, child in enumerate(value)]
    return value


def collect(vault, exclude):
    files, skipped = [], []

    def walk(directory, relative, ancestors):
        real = directory.resolve(strict=True)
        if real in ancestors:
            raise ValueError(f'Symbolic link cycle: {relative}')
        ancestors = ancestors | {real}
        for entry in sorted(directory.iterdir(), key=lambda p: p.name):
            rel = relative / entry.name
            name = rel.as_posix()
            parts = rel.parts
            in_config = parts[0] == '.obsidian'
            omit = (entry.name in SKIP_DIRS or entry.name in SKIP_FILES
                    or (entry.name.startswith('.') and not (relative == Path('.') and entry.name == '.obsidian'))
                    or any(fnmatch.fnmatchcase(name, pattern) for pattern in exclude))
            if in_config:
                omit |= entry.name in {'cache', 'caches', 'logs', 'backups'}
                omit |= len(parts) == 2 and entry.name in PRIVATE_CONFIG
            if omit:
                skipped.append(name)
                continue
            if entry.is_dir():
                if not in_config and (entry / '.obsidian').is_dir():
                    raise ValueError(f'Nested vault found: {name}. Exclude it explicitly.')
                walk(entry, rel, ancestors)
            elif entry.is_file():
                files.append((entry, name))
            else:
                raise ValueError(f'Broken link or unsupported file: {name}')
    walk(vault, Path('.'), set())
    return files, skipped


def prepare(source, name, changes):
    payload = source.read_bytes()
    if name.startswith('.obsidian/') and name.endswith('.json'):
        value = json.loads(payload)
        if name == '.obsidian/plugins/hacksidian/data.json':
            # Keep presets, not conversations, remote indexes, expenses or favourites.
            if not isinstance(value, dict):
                raise ValueError('Invalid Hacksidian data.json')
            removed = set(value) - {'settings', 'localization', 'snippetsInstalled'}
            changes.extend(f'{name}.{key}' for key in sorted(removed))
            value = {key: child for key, child in value.items() if key in {'settings', 'localization', 'snippetsInstalled'}}
            # The first launch seeds missing files without replacing prepared CSS.
            value.pop('snippetsInstalled', None)
        value = clean_secrets(value, name, changes)
        payload = (json.dumps(value, ensure_ascii=False, indent=2) + '\n').encode('utf-8')
    return payload


def build(args):
    vault = args.vault.expanduser().resolve(strict=True)
    if not (vault / '.obsidian').is_dir():
        raise ValueError('The source must be a vault containing .obsidian')
    name = args.name or vault.name
    if name in {'.', '..'} or not name or any(c in name for c in '/\\:') or any(ord(c) < 32 for c in name):
        raise ValueError('Archive folder name must be a single valid directory name')
    output = args.output.expanduser().resolve()
    if output == vault or vault in output.parents:
        raise ValueError('Place the output ZIP outside the source vault')
    if output.exists():
        raise ValueError('Output already exists; choose a new filename')
    files, skipped = collect(vault, args.exclude)
    source_paths = {p.resolve() for p, _ in files}
    if output in source_paths or any(output.is_relative_to(p.resolve()) for p in [vault]):
        raise ValueError('Output overlaps source files')
    # Enabled plugins must actually be included, not merely listed in a preset.
    enabled_path = vault / '.obsidian/community-plugins.json'
    enabled = json.loads(enabled_path.read_text()) if enabled_path.exists() else []
    if not isinstance(enabled, list) or not all(isinstance(x, str) for x in enabled):
        raise ValueError('Invalid community-plugins.json')
    included = {name for _, name in files}
    plugins = []
    for plugin_id in enabled:
        base = f'.obsidian/plugins/{plugin_id}'
        for required in ['manifest.json', 'main.js']:
            if f'{base}/{required}' not in included:
                raise ValueError(f'Enabled plugin is incomplete: {plugin_id}/{required}')
        manifest = json.loads((vault / base / 'manifest.json').read_text())
        if manifest.get('id') != plugin_id:
            raise ValueError(f'Plugin ID mismatch: {plugin_id}')
        plugins.append({'id': plugin_id, 'version': manifest.get('version')})
    report = {'folder': name, 'files': [], 'excluded': skipped, 'cleaned_fields': [], 'enabled_plugins': plugins}
    temporary = None
    archive = None
    try:
        if not args.dry_run:
            output.parent.mkdir(parents=True, exist_ok=True)
            fd, temporary = tempfile.mkstemp(prefix='.starter-', suffix='.zip', dir=output.parent)
            os.close(fd)
            archive = zipfile.ZipFile(temporary, 'w', zipfile.ZIP_DEFLATED)
        for source, relative in files:
            before = source.stat()
            payload = prepare(source, relative, report['cleaned_fields'])
            after = source.stat()
            if (before.st_size, before.st_mtime_ns) != (after.st_size, after.st_mtime_ns):
                raise ValueError(f'Source changed while reading: {relative}. Close Obsidian and retry.')
            report['files'].append({'path': relative, 'bytes': len(payload), 'sha256': hashlib.sha256(payload).hexdigest()})
            if archive:
                info = zipfile.ZipInfo(f'{name}/{relative}')
                info.compress_type = zipfile.ZIP_DEFLATED
                info.external_attr = 0o100644 << 16
                archive.writestr(info, payload)
        if archive:
            archive.close()
            archive = None
            with zipfile.ZipFile(temporary) as check:
                if check.testzip() is not None:
                    raise ValueError('ZIP verification failed')
            # Atomic no-overwrite publication, including concurrent invocations.
            os.link(temporary, output)
        print(json.dumps(report, ensure_ascii=False, indent=2))
        print('Dry run: no archive written.' if args.dry_run else f'Created: {output}', file=sys.stderr)
    finally:
        if archive:
            archive.close()
        if temporary:
            Path(temporary).unlink(missing_ok=True)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('vault', type=Path, help='Reference vault, including .obsidian')
    parser.add_argument('output', type=Path, help='New ZIP path outside the vault')
    parser.add_argument('--name', help='Top-level folder inside the ZIP (default: vault name)')
    parser.add_argument('--exclude', action='append', default=[], help='Exclude a vault-relative glob; repeatable')
    parser.add_argument('--dry-run', action='store_true', help='Inspect and print contents without creating a ZIP')
    args = parser.parse_args()
    try:
        build(args)
    except (OSError, ValueError, RuntimeError) as error:
        parser.exit(1, f'Error: {error}\n')


if __name__ == '__main__':
    main()
