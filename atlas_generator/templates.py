"""Small literal binding contract shared with the plugin (no executable templates)."""
import json,re
import tinycss2

def bind(template: str, values: dict) -> str:
    def replace(match):
        key=match.group(1)
        if not isinstance(values.get(key),str):
            raise ValueError(f'Unknown template binding: {key}')
        return values[key]
    return re.sub(r'\{\{(\w+)\}\}',replace,template)

def atlas_css(directory, read, use_preview=True):
    if not (directory/'recipe.template.css').exists():
        return read(directory/'snippet.css')
    spec=json.loads(read(directory/'hack.json'))
    if spec.get('format')!=1:raise ValueError('Unknown hack template format')
    foundation = read(directory/'preview.css') if use_preview else runtime_dependencies(bind(read(directory/'dependencies.template.css'),spec['atlas']))
    return foundation+'/* Рецепт */'+bind(read(directory/'recipe.template.css'),spec['atlas'])

def runtime_dependencies(css):
    # Match the plugin: demo defaults must not replace native theme variables.
    native = re.compile(r'^--(?:background|text|font|color|metadata|callout|code|link|interactive|h[1-6])-')
    nodes = tinycss2.parse_stylesheet(css)
    def clean(nodes):
        for node in nodes:
            if node.type == 'qualified-rule':
                declarations = tinycss2.parse_declaration_list(node.content)
                node.content = tinycss2.parse_component_value_list(tinycss2.serialize([
                    d for d in declarations if d.type != 'declaration' or not native.match(d.name)
                ]))
            elif node.type == 'at-rule' and node.content and node.lower_at_keyword in ('media','supports','container','layer'):
                children = tinycss2.parse_rule_list(node.content)
                clean(children)
                node.content = tinycss2.parse_component_value_list(tinycss2.serialize(children))
    clean(nodes)
    return tinycss2.serialize(nodes)
