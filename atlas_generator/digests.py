"""Digest registry: stable Latin IDs, bilingual labels, many memberships per card."""
from pathlib import Path
import re

from .render import split_frontmatter


def load_digests(source: Path, language: str = 'ru') -> dict:
    result = {}
    for path in sorted((source / '! digests').glob('*.md')):
        if path.stem.startswith('!'):
            continue
        uid = path.stem
        if not re.fullmatch(r'[a-z][a-z0-9-]*', uid):
            raise ValueError(f'Invalid digest ID: {uid}')
        resolved = path.resolve()
        if not resolved.is_relative_to(source.resolve()):
            raise ValueError(f'Digest escapes the catalogue: {path}')
        metadata, _ = split_frontmatter(path.read_text(encoding='utf-8'))
        titles = {lang: metadata.get('title' if lang == 'ru' else 'title_en') for lang in ('ru', 'en')}
        if any(not isinstance(title, str) or not title.strip() for title in titles.values()):
            raise ValueError(f'{uid}: digest requires title and title_en')
        result[uid] = {'title': titles.get(language, titles['en']), 'titles': titles}
    return result


def memberships(metadata: dict, registry: dict, uid: str) -> list[str]:
    values = metadata.get('digest', [])
    if not isinstance(values, list) or any(not isinstance(value, str) for value in values):
        raise ValueError(f'{uid}: digest must be a list of IDs')
    if len(values) != len(set(values)):
        raise ValueError(f'{uid}: duplicate digest IDs')
    unknown = set(values) - registry.keys()
    if unknown:
        raise ValueError(f'{uid}: unknown digest IDs: {", ".join(sorted(unknown))}')
    return values
