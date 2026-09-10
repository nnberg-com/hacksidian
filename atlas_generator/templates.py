"""Small literal binding contract shared with the plugin (no executable templates)."""
import json,re

def bind(template: str, values: dict) -> str:
    def replace(match):
        key=match.group(1)
        if key not in ('scope','class') or not isinstance(values.get(key),str):
            raise ValueError(f'Unknown template binding: {key}')
        return values[key]
    return re.sub(r'\{\{(\w+)\}\}',replace,template)

def atlas_css(directory, read):
    if not (directory/'recipe.template.css').exists():
        return read(directory/'snippet.css')
    spec=json.loads(read(directory/'hack.json'))
    if spec.get('format')!=1:raise ValueError('Unknown hack template format')
    return read(directory/'preview.css')+'/* Рецепт */'+bind(read(directory/'recipe.template.css'),spec['atlas'])
