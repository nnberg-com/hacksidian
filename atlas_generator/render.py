"""Versioned renderer contract; no historical atlas imports."""
from __future__ import annotations

from collections import Counter
from copy import deepcopy
from datetime import date
import html as escape_module
import re
from pathlib import Path

from lxml import html, etree
from markdown_it import MarkdownIt
from mdit_py_plugins.footnote import footnote_plugin
from mdit_py_plugins.deflist import deflist_plugin
import tinycss2
import yaml

ESC = escape_module.escape
CONTRACT_VERSION = 1


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


def slug(value: str) -> str:
    return re.sub(r'[^\w-]', '', re.sub(r'\s+', '-', value.lower().strip())) or 'section'


def extension_inline(state, silent):
    """Highlight, wikilinks and OFM hashtags without touching code spans."""
    pos = state.pos
    src = state.src
    if src.startswith('==', pos):
        end = src.find('==', pos + 2)
        if end > pos + 2 and '\n' not in src[pos + 2:end]:
            if not silent:
                state.push('mark_open', 'mark', 1)
                inner = []
                state.md.inline.parse(src[pos + 2:end], state.md, state.env, inner)
                state.tokens.extend(inner)
                state.push('mark_close', 'mark', -1)
            state.pos = end + 2
            return True
    embed = src.startswith('![[', pos)
    if embed or src.startswith('[[', pos):
        offset = 3 if embed else 2
        end = src.find(']]', pos + offset)
        if end != -1:
            destination, _, label = src[pos + offset:end].partition('|')
            if not silent:
                if embed:
                    token = state.push('html_inline', '', 0)
                    token.content = f'<img src="{ESC(destination, quote=True)}" alt="{ESC(label or destination, quote=True)}">'
                else:
                    token = state.push('link_open', 'a', 1)
                    token.attrSet('href', destination)
                    token.attrSet('class', 'internal-link')
                    token.attrSet('data-href', destination)
                    state.push('text', '', 0).content = label or destination
                    state.push('link_close', 'a', -1)
            state.pos = end + 2
            return True
    if src[pos:pos + 1] == '#' and state.linkLevel == 0 and (pos == 0 or not re.match(r'[\w/#]', src[pos - 1])):
        match = re.match(r'#[\w/-]+', src[pos:])
        if match and re.search(r'[^\d/-]', match[0][1:]):
            if not silent:
                token = state.push('link_open', 'a', 1)
                token.attrSet('href', match[0])
                token.attrSet('class', 'tag')
                state.push('text', '', 0).content = match[0]
                state.push('link_close', 'a', -1)
            state.pos += len(match[0])
            return True
    return False


def parser() -> MarkdownIt:
    md = MarkdownIt('commonmark', {'html': True}).enable(['table', 'strikethrough'])
    md.use(footnote_plugin).use(deflist_plugin)
    md.inline.ruler.before('emphasis', 'atlas_inline', extension_inline)
    return md


def add_class(node, *names):
    node.set('class', ' '.join(dict.fromkeys(node.get('class', '').split() + list(names))))


def clean_dom(root):
    for node in list(root.iter()):
        if not isinstance(node.tag, str):
            continue
        if node.tag in {'script', 'base', 'object', 'embed'}:
            if node.getparent() is not None:
                node.drop_tree()
            continue
        for attr, value in list(node.attrib.items()):
            if attr.lower().startswith('on') or attr.lower() == 'srcdoc':
                del node.attrib[attr]
            elif attr in {'href', 'src', 'action'} and re.match(r'\s*(javascript|vbscript):', value, re.I):
                del node.attrib[attr]
        if node.tag == 'iframe':
            node.set('sandbox', 'allow-scripts allow-popups')
            node.set('loading', 'lazy')
        if node.tag == 'a' and re.match(r'https?://', node.get('href', '')):
            node.set('target', '_blank')
            node.set('rel', 'noopener noreferrer')


def tasks(root):
    for li in root.iter('li'):
        first = li[0] if len(li) and li[0].tag == 'p' else li
        text = first.text or ''
        match = re.match(r'^\[([^\]\n])\]\s+', text)
        if not match:
            continue
        mark = match[1]
        first.text = None
        checkbox = etree.Element('input', type='checkbox')
        checkbox.set('class', 'task-list-item-checkbox')
        checkbox.set('aria-label', 'Отметить задачу')
        if mark.lower() == 'x':
            checkbox.set('checked', 'checked')
            add_class(li, 'is-checked')
        checkbox.tail = ' ' + text[match.end():]
        first.insert(0, checkbox)
        li.set('data-task', mark)
        add_class(li, 'task-list-item')
        if li.getparent() is not None:
            add_class(li.getparent(), 'contains-task-list')


def callouts(root, github=False):
    for quote in reversed(list(root.iter('blockquote'))):
        if not len(quote) or quote[0].tag != 'p':
            continue
        paragraph = quote[0]
        first, _, remaining = serialize_inner(paragraph).partition('\n')
        match = re.match(r'^\[!([\w-]+)(?:\|([^\]]*))?\]([+-]?)[ \t]*(.*)$', first)
        if not match:
            continue
        kind, metadata, fold, title = match.groups()
        paragraph.clear()
        if remaining:
            fragment = html.fragment_fromstring(remaining, create_parent='p')
            paragraph.text = fragment.text
            for child in list(fragment):
                paragraph.append(child)
        else:
            quote.remove(paragraph)
        content = etree.Element('div', {'class': 'callout-content'})
        content.text = quote.text
        quote.text = None
        for child in list(quote):
            content.append(child)
        quote.tag = 'details' if fold and not github else 'div'
        if github:
            quote.set('class', f'markdown-alert markdown-alert-{kind.lower()}')
            heading = etree.SubElement(quote, 'p', {'class': 'markdown-alert-title'})
            heading.text = html.fragment_fromstring(title, create_parent='span').text_content() if title else kind.title()
            if content.text:
                heading.tail = content.text
            for child in list(content):
                quote.append(child)
        else:
            quote.set('class', 'callout')
            quote.set('data-callout', kind.lower())
            quote.set('data-callout-fold', fold)
            quote.set('data-callout-metadata', metadata or '')
            if fold == '+':
                quote.set('open', 'open')
            if fold == '-':
                add_class(quote, 'is-collapsed')
            heading = etree.SubElement(quote, 'summary' if fold else 'div', {'class': 'callout-title'})
            etree.SubElement(heading, 'div', {'class': 'callout-icon', 'aria-hidden': 'true'})
            title_node = etree.SubElement(heading, 'div', {'class': 'callout-title-inner'})
            rendered = title or ESC(kind.replace('-', ' ').title())
            for fragment in html.fragments_fromstring(rendered):
                if isinstance(fragment, str):
                    title_node.text = (title_node.text or '') + fragment
                else:
                    title_node.append(fragment)
            quote.append(content)


def serialize_inner(root) -> str:
    return (ESC(root.text) if root.text else '') + ''.join(html.tostring(c, encoding='unicode') for c in root)


def render_markdown(source: str, anchor: str, *, github=False) -> str:
    result = parser().render(source, {'docId': anchor})
    root = html.fragment_fromstring(result, create_parent='div')
    headings = Counter()
    for node in root.xpath('.//h1|.//h2|.//h3|.//h4|.//h5|.//h6'):
        label = node.text_content()
        key = slug(label)
        headings[key] += 1
        node.set('id', f'{anchor}-{key}' + (f'-{headings[key]}' if headings[key] > 1 else ''))
        node.set('data-heading', label)
    # Match GFM's align attributes used by the imported table recipes.
    for cell in root.xpath('.//th|.//td'):
        m = re.search(r'text-align:\s*(left|right|center)', cell.get('style', ''))
        if m:
            cell.set('align', m[1])
    tasks(root)
    callouts(root, github)
    clean_dom(root)
    return serialize_inner(root)


def property_type(value):
    if isinstance(value, bool):
        return 'checkbox'
    if isinstance(value, (float, int)):
        return 'number'
    if isinstance(value, date):
        return 'date'
    if isinstance(value, list):
        return 'list'
    return 'text'


def property_value(holder, value, kind=None):
    holder.clear(keep_tail=True)
    holder.set('class', 'metadata-property-value')
    kind = kind or property_type(value)
    if kind in {'checkbox', 'number', 'date'}:
        inp = etree.SubElement(holder, 'input', type='checkbox' if kind == 'checkbox' else kind)
        if kind == 'checkbox':
            if value:
                inp.set('checked', 'checked')
        else:
            inp.set('value', '' if value is None else str(value))
            inp.set('placeholder', 'Пусто')
    elif kind == 'list':
        container = etree.SubElement(holder, 'div', {'class': 'multi-select-container'})
        for item in (value if isinstance(value, list) else [] if value is None else [value]):
            pill = etree.SubElement(container, 'span', {'class': 'multi-select-pill'})
            etree.SubElement(pill, 'span', {'class': 'multi-select-pill-content'}).text = str(item)
            etree.SubElement(pill, 'span', {'class': 'multi-select-pill-remove-button', 'aria-hidden': 'true'}).text = '×'
        etree.SubElement(container, 'span', {'class': 'multi-select-input', 'contenteditable': 'true', 'role': 'textbox', 'aria-label': 'Добавить значение', 'placeholder': 'Пусто'})
    elif kind == 'link' and value:
        etree.SubElement(holder, 'a', href=str(value)).text = str(value)
    else:
        node = etree.SubElement(holder, 'div', {'class': 'metadata-input-longtext', 'contenteditable': 'true', 'role': 'textbox', 'aria-label': 'Значение свойства', 'placeholder': 'Пусто'})
        node.text = '' if value is None else str(value)


def render_properties(metadata: dict, markdown_body: str, uid: str, model: str | None) -> str:
    """Retain saved layout, but populate properties from the current YAML."""
    fields = {k: v for k, v in metadata.items() if k != 'cssclasses'}
    if model:
        document = html.document_fromstring(model)
        root = deepcopy(document.find('body'))
        root.tag = 'div'
    else:
        root = etree.Element('div')
        host = etree.SubElement(root, 'div', {'class': 'markdown-source-view mod-cm6'})
        container = etree.SubElement(host, 'div', {'class': 'metadata-container'})
        etree.SubElement(container, 'div', {'class': 'metadata-properties-heading'}).text = 'Properties'
        etree.SubElement(container, 'div', {'class': 'metadata-properties'})
    hosts = root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," markdown-source-view ")]')
    extra_classes = metadata.get('cssclasses', [])
    if isinstance(extra_classes, str):
        extra_classes = extra_classes.split()
    for host in hosts:
        add_class(host, 'atlas-' + uid, *extra_classes)
    for container in root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," metadata-properties ")]'):
        old_rows = {n.get('data-property-key'): n for n in container if n.get('data-property-key')}
        for child in list(container):
            container.remove(child)
        for key, value in fields.items():
            row = deepcopy(old_rows[key]) if key in old_rows else etree.Element('div', {'class': 'metadata-property', 'data-property-key': key})
            kind = row.get('data-property-type') or property_type(value)
            row.set('data-property-type', kind)
            holders = row.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," metadata-property-value ")]')
            if not holders:
                name = etree.SubElement(row, 'div', {'class': 'metadata-property-key'})
                etree.SubElement(name, 'span', {'class': 'metadata-property-key-input'}).text = key
                holders = [etree.SubElement(row, 'div')]
            property_value(holders[0], value, kind)
            # Avoid dangling labels after replacing original input IDs.
            inp = next(iter(holders[0].iter('input')), None)
            if inp is not None:
                inp.set('id', f'{uid}-property-{slug(key)}')
                for label in row.iter('label'):
                    label.set('for', inp.get('id'))
            container.append(row)
    for content in root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," cm-content ")]'):
        content.clear()
        content.set('class', 'cm-content')
        lines = ('---\n' + yaml.safe_dump(fields, allow_unicode=True, sort_keys=False).rstrip() + '\n---').splitlines()
        for number, text in enumerate(lines):
            line = etree.SubElement(content, 'div', {'class': 'cm-line' + (' cm-active' if number == 1 else ''), 'tabindex': '0'})
            line.set('aria-label', f'Строка YAML {number + 1}')
            key, sep, value = text.partition(':')
            if sep and not text.startswith(' '):
                etree.SubElement(line, 'span', {'class': 'cm-atom cm-hmd-frontmatter'}).text = key
                etree.SubElement(line, 'span', {'class': 'cm-meta cm-hmd-frontmatter'}).text = ':'
                kind = 'cm-number' if re.fullmatch(r'\s*[\d.]+\s*', value) else 'cm-string'
                etree.SubElement(line, 'span', {'class': kind + ' cm-hmd-frontmatter'}).text = value
            else:
                etree.SubElement(line, 'span', {'class': 'cm-def cm-hmd-frontmatter'}).text = text
    # Keep deliberate scroll filler in saved models; fresh note body is separate.
    if hosts:
        body = etree.SubElement(hosts[0], 'div', {'class': 'example-note-body'})
        body_html = render_markdown(markdown_body, uid)
        for fragment in html.fragments_fromstring(body_html):
            if isinstance(fragment, str):
                body.text = (body.text or '') + fragment
            else:
                body.append(fragment)
    clean_dom(root)
    return serialize_inner(root)


def model_foundation(css: str) -> str:
    """Remove saved recipe overrides so snippet.css remains authoritative."""
    def rules(nodes):
        out = []
        for node in nodes:
            if node.type == 'qualified-rule':
                selector = tinycss2.serialize(node.prelude)
                if re.search(r'\.(?:meta-[\w-]+|e\d{3})(?![\w-])', selector):
                    continue
            elif node.type == 'at-rule' and node.content and node.lower_at_keyword in {'media', 'supports', 'layer', 'container'}:
                node.content = tinycss2.parse_component_value_list(rules(tinycss2.parse_rule_list(node.content)))
            elif node.type == 'at-rule' and node.lower_at_keyword.endswith('keyframes'):
                continue
            if node.type != 'error':
                out.append(tinycss2.serialize([node]))
        return ''.join(out)
    return rules(tinycss2.parse_stylesheet(css))
