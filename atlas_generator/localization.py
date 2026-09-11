"""Localized source loading and a completeness inventory; no implicit translations."""
from pathlib import Path
from .render import split_frontmatter


def read_description(directory: Path, language: str, read):
    path = directory / f'Description.{language}.md'
    metadata, body = split_frontmatter(read(path))
    if metadata.get('language') != language:
        raise ValueError(f'{path}: language must be {language}')
    if metadata.get('translation_status', 'complete') != 'complete':
        raise ValueError(f'{path}: translation is not complete')
    if not isinstance(metadata.get('title'), str) or not metadata['title'].strip():
        raise ValueError(f'{path}: translated title is required')
    forbidden = {'id', 'tags', 'category', 'digest', 'source_anchor', 'sources', 'example', 'template', 'format', 'interactive'} & metadata.keys()
    if forbidden:
        raise ValueError(f'{path}: technical fields belong in the shared card: {sorted(forbidden)}')
    return metadata, body


def translation_inventory(source: Path):
    report = {'techniques': 0, 'languages': {lang: {'complete': 0, 'missing': []} for lang in ('ru', 'en')}}
    for directory in sorted((source / '! hacks').iterdir()):
        if not directory.is_dir() or not (directory / f'{directory.name}.md').is_file():
            continue
        report['techniques'] += 1
        for language in ('ru', 'en'):
            missing = []
            desc = directory / f'Description.{language}.md'
            try:
                read_description(directory, language, lambda p: p.read_text(encoding='utf-8'))
            except (OSError, ValueError) as exc:
                missing.append(str(exc))
            if not (directory / f'Markdown.{language}.md').is_file():
                missing.append(f'Markdown.{language}.md')
            if missing:
                report['languages'][language]['missing'].append({'id': directory.name, 'files': missing})
            else:
                report['languages'][language]['complete'] += 1
    return report


def resolve_build_languages(config, content=None, interface=None):
    """Use the plugin's effective language saved by the Obsidian runtime."""
    import json
    from .i18n import normalize_language
    data = {}
    if config:
        path = config / 'plugins' / 'hacksidian' / 'data.json'
        if path.is_file():
            data = json.loads(path.read_text(encoding='utf-8'))
    settings = data.get('settings', {})
    saved = data.get('localization', {})
    preference = settings.get('interfaceLanguage')
    ui = normalize_language(interface or (preference if preference in ('ru', 'en') else saved.get('interfaceLanguage')))
    preference = settings.get('contentLanguage')
    language = content or (preference if preference in ('ru', 'en') else ui)
    if language not in ('ru', 'en'):
        raise ValueError('Content language must be ru or en')
    return language, ui
