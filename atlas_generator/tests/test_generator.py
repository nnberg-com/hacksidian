import json
from pathlib import Path
import tempfile
import unittest

from lxml import html

from atlas_generator.build import build, compile_catalogue, source_details
from atlas_generator.render import render_markdown, render_properties, split_frontmatter, model_foundation


def fragment(source):
    return html.fragment_fromstring(source, create_parent='div')


class RendererTests(unittest.TestCase):
    def test_sources_preserve_card_labels_category_links_and_local_provenance(self):
        from types import SimpleNamespace
        t = SimpleNamespace(
            metadata={'sources': ['https://example.org/recipe']},
            card='## Источники\n\n- [Автор](https://example.org/recipe)\n- [Старый пример](</Users/test/old atlas/index.html#demo>)\n')
        result = fragment(source_details(t, {
            'sources': ['https://example.org/category'],
            'source_text': '- [Документация](https://example.org/category)',
        }))
        self.assertEqual(result.xpath('.//a/@href'), ['https://example.org/recipe', 'https://example.org/category'])
        self.assertEqual([n.text_content() for n in result.xpath('.//a')], ['Автор', 'Документация'])
        self.assertIn('/Users/test/old atlas/index.html#demo', result.text_content())
        self.assertFalse(result.xpath('.//a[starts-with(@href, "/Users/")]'))

    def test_nested_callout_and_markdown_still_update(self):
        result = fragment(render_markdown('> [!note]+ **Заголовок**\n> Текст\n>\n> > [!tip] Совет\n> > **==Важно==**', 'demo'))
        self.assertEqual(len(result.xpath('.//details[@class="callout"][@open]')), 1)
        self.assertEqual(result.xpath('.//*[@class="callout-title-inner"]')[0].text_content(), 'Заголовок')
        self.assertEqual(result.xpath('.//mark')[0].text, 'Важно')
        self.assertEqual(len(result.xpath('.//*[@data-callout="tip"]')), 1)

    def test_footnote_ids_and_repeated_backlinks(self):
        result = fragment(render_markdown('Первая[^a] и вторая[^a].\n\n[^a]: Ответ', 'e043'))
        self.assertEqual(result.xpath('.//li/@id'), ['fn-e043-1'])
        ids = result.xpath('.//sup/a/@id')
        self.assertEqual(ids, ['fnref-e043-1', 'fnref-e043-1:1'])
        for href in result.xpath('.//a/@href'):
            self.assertIn(href[1:], result.xpath('.//*[@id]/@id'))

    def test_tasks_preserve_custom_marker_and_are_clickable(self):
        result = fragment(render_markdown('- [ ] Новый\n- [?] Вопрос\n- [x] Готово', 'tasks'))
        self.assertEqual(result.xpath('.//li/@data-task'), [' ', '?', 'x'])
        self.assertEqual(len(result.xpath('.//input[@checked]')), 1)
        self.assertFalse(result.xpath('.//input[@disabled]'))

    def test_code_is_not_reinterpreted_as_markup(self):
        result = fragment(render_markdown('`#tag ==text==` и #real\n\n```python\n# code\n```', 'demo'))
        self.assertEqual(len(result.xpath('.//a[@class="tag"]')), 1)
        self.assertEqual(result.xpath('.//pre/code/@class'), ['language-python'])
        self.assertEqual(result.xpath('.//code')[0].text, '#tag ==text==')

    def test_table_align_and_duplicate_heading_contract(self):
        result = fragment(render_markdown('## Раздел\n\n## Раздел\n\n| A | B |\n|:-|--:|\n| 1 | 2 |', 'e1'))
        self.assertEqual(result.xpath('.//h2/@id'), ['e1-раздел', 'e1-раздел-2'])
        self.assertEqual(result.xpath('.//th/@align'), ['left', 'right'])

    def test_raw_html_keeps_native_details_but_not_event_scripts(self):
        result = fragment(render_markdown('<details><summary>Open</summary><p onclick="bad()">Body</p></details><script>bad()</script>', 'html'))
        self.assertEqual(len(result.xpath('.//details')), 1)
        self.assertFalse(result.xpath('.//script|.//*[@onclick]'))

    def test_properties_take_live_yaml_values(self):
        model = '<html><body><div class="markdown-source-view"><details class="metadata-container"><summary>Properties</summary><div class="metadata-properties"><div class="metadata-property" data-property-key="status" data-property-type="text"><div class="metadata-property-key">status</div><div class="metadata-property-value">OLD</div></div></div></details></div></body></html>'
        result = fragment(render_properties({'status': 'NEW', 'done': True}, '# New body', 'property-demo', model))
        self.assertIn('NEW', result.text_content())
        self.assertNotIn('OLD', result.text_content())
        self.assertEqual(len(result.xpath('.//details')), 1)
        self.assertTrue(result.xpath('.//input[@type="checkbox"][@checked]'))
        self.assertIn('New body', result.text_content())

    def test_model_css_cannot_keep_obsolete_recipe_declarations(self):
        source = ':root{--text:red}.metadata-property{display:flex}.meta-demo{color:red}@media print{.meta-demo{color:blue}.metadata-property{border:0}}'
        result = model_foundation(source)
        self.assertNotIn('.meta-demo', result)
        self.assertIn('.metadata-property', result)

    def test_duplicate_yaml_is_rejected(self):
        with self.assertRaisesRegex(ValueError, 'Duplicate'):
            split_frontmatter('---\ntags: []\ntags: []\n---\nText')


class BuildTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.root = Path(self.temp.name)
        self.source = self.root / 'catalogue'
        self.directory = self.source / '! hacks' / 'demo'
        self.directory.mkdir(parents=True)
        (self.source / '! categories').mkdir()
        (self.source / '! categories' / 'text.md').write_text('---\ntitle: Текст\ntitle_en: Text\n---\n')
        (self.directory / 'demo.md').write_text('---\ntags: []\ncategory: text\nformat: markdown\ninteractive: false\n---\n')
        (self.directory / 'Description.ru.md').write_text('---\nlanguage: ru\ntitle: Пример\n---\n\n## Зачем\n\nПроверка')
        (self.directory / 'Description.en.md').write_text('---\nlanguage: en\ntitle: Example\n---\n\n## Purpose\n\nA test')
        (self.directory / 'Markdown.ru.md').write_text('# First\n\n**Content**')
        (self.directory / 'recipe.css').write_text('strong{color:blue}')
        self.output = self.root / 'output'

    def tearDown(self):
        self.temp.cleanup()

    def test_build_reads_only_new_catalogue_and_changes_follow_source(self):
        report = build(self.source, self.output, 'ru')
        first = (self.output / 'recipes/demo/preview.html').read_text()
        self.assertIn('First', first)
        self.assertFalse(report['legacy_atlas_required'])
        (self.directory / 'Markdown.ru.md').write_text('# Updated')
        (self.directory / 'recipe.css').write_text('h1{color:red}')
        build(self.source, self.output, 'ru')
        second = (self.output / 'recipes/demo/preview.html').read_text()
        self.assertIn('Updated', second)
        self.assertIn('h1{color:red}', second)
        self.assertNotIn('<strong>Content', second)

    def add_digest(self, uid, title, title_en):
        directory = self.source / '! digests'
        directory.mkdir(exist_ok=True)
        (directory / (uid + '.md')).write_text(f'---\ntitle: {title}\ntitle_en: {title_en}\n---\n')

    def set_digests(self, value):
        card = self.directory / 'demo.md'
        card.write_text(card.read_text().replace('category: text', 'category: text\ndigest: ' + value))

    def test_multiple_digests_and_independent_ui_language(self):
        self.add_digest('todo', 'Задачи', 'Task management')
        self.add_digest('teach', 'Преподавание', 'Teaching')
        self.set_digests('[todo, teach]')
        report = build(self.source, self.output, 'ru', ui_language='en')
        catalog = json.loads((self.output / 'catalog.js').read_text().removeprefix('window.ATLAS = ').removesuffix(';\n'))
        self.assertEqual(catalog['entries'][0]['digest'], ['todo', 'teach'])
        self.assertEqual(catalog['digests']['todo']['title'], 'Task management')
        self.assertEqual(catalog['uiLanguage'], 'en')
        self.assertEqual(report['digests'], {'teach': 1, 'todo': 1})
        card = html.parse(str(self.output / 'recipes/demo/index.html'))
        self.assertEqual(card.xpath('//p[@aria-label="Digests"]/span/text()'), ['Task management', 'Teaching'])
        self.assertIn('! digests/todo.md', report['inputs'])
        self.assertTrue((self.output / 'recipes/demo/Markdown.ru.md').exists())
        russian = build(self.source, self.output, 'ru')
        self.assertNotEqual(report, russian)
        self.assertIn('Задачи', (self.output / 'recipes/demo/index.html').read_text())

    def test_invalid_digest_memberships_fail_before_replacing_build(self):
        self.add_digest('todo', 'Задачи', 'Task management')
        build(self.source, self.output, 'ru')
        original = (self.output / 'catalog.js').read_bytes()
        card = self.directory / 'demo.md'
        source = card.read_text()
        for value, error in [('todo', 'list of IDs'), ('[42]', 'list of IDs'),
                             ('[todo, todo]', 'duplicate'), ('[unknown]', 'unknown'), ('null', 'list of IDs')]:
            with self.subTest(value=value):
                card.write_text(source)
                self.set_digests(value)
                with self.assertRaisesRegex(ValueError, error):
                    build(self.source, self.output, 'ru')
                self.assertEqual((self.output / 'catalog.js').read_bytes(), original)

    def test_digest_requires_both_translations(self):
        directory = self.source / '! digests'
        directory.mkdir()
        (directory / 'todo.md').write_text('---\ntitle: Tasks\n---\n')
        with self.assertRaisesRegex(ValueError, 'title and title_en'):
            build(self.source, self.output, 'ru')

    def test_repeated_build_is_deterministic(self):
        first = build(self.source, self.output, 'ru')
        files = {str(p.relative_to(self.output)): p.read_bytes() for p in self.output.rglob('*') if p.is_file()}
        second = build(self.source, self.output, 'ru')
        self.assertEqual(first, second)
        self.assertEqual(files, {str(p.relative_to(self.output)): p.read_bytes() for p in self.output.rglob('*') if p.is_file()})

    def test_missing_asset_fails_without_destroying_existing_build(self):
        build(self.source, self.output, 'ru')
        original = (self.output / 'index.html').read_bytes()
        (self.directory / 'Markdown.ru.md').write_text('![Missing](assets/missing.png)')
        with self.assertRaisesRegex(ValueError, 'Missing file'):
            build(self.source, self.output, 'ru')
        self.assertEqual((self.output / 'index.html').read_bytes(), original)

    def test_existing_non_owned_directory_and_source_output_are_protected(self):
        self.output.mkdir()
        (self.output / 'valuable.txt').write_text('Keep')
        with self.assertRaisesRegex(ValueError, 'not owned'):
            build(self.source, self.output, 'ru')
        with self.assertRaisesRegex(ValueError, 'outside'):
            build(self.source, self.source / 'output', 'ru')

    def test_asset_symlink_cannot_read_legacy_or_other_external_files(self):
        secret = self.root / 'outside.svg'
        secret.write_text('<svg/>')
        (self.directory / 'escape.svg').symlink_to(secret)
        (self.directory / 'Markdown.ru.md').write_text('![Outside](escape.svg)')
        with self.assertRaisesRegex(ValueError, 'escapes'):
            compile_catalogue(self.source, 'ru')

    def test_unavailable_language_is_explicit(self):
        with self.assertRaisesRegex(ValueError, 'Markdown.en.md'):
            compile_catalogue(self.source, 'en')

class LocalizationTests(unittest.TestCase):
    setUp = BuildTests.setUp
    tearDown = BuildTests.tearDown

    def test_shared_card_has_no_localized_fields_and_description_drives_title(self):
        build(self.source, self.output, 'ru')
        self.assertIn('Пример', (self.output/'recipes/demo/index.html').read_text())
        (self.directory/'Description.ru.md').write_text('---\nlanguage: ru\ntitle: Новое имя\n---\n## Зачем\nНовая причина')
        build(self.source, self.output, 'ru')
        self.assertIn('Новое имя', (self.output/'recipes/demo/index.html').read_text())
        self.assertIn('Новая причина', (self.output/'recipes/demo/index.html').read_text())
        self.assertNotIn('title:', (self.directory/'demo.md').read_text())

    def test_english_shell_description_and_russian_example_are_independent(self):
        report = build(self.source, self.output, 'ru', ui_language='en')
        shell = html.parse(str(self.output/'index.html'))
        recipe = html.parse(str(self.output/'recipes/demo/index.html'))
        preview = html.parse(str(self.output/'recipes/demo/preview.html'))
        self.assertEqual(shell.getroot().get('lang'), 'en')
        self.assertEqual(recipe.getroot().get('lang'), 'en')
        self.assertEqual(preview.getroot().get('lang'), 'ru')
        self.assertIn('Find a technique', shell.getroot().text_content())
        self.assertIn('Purpose', recipe.getroot().text_content())
        self.assertIn('A test', recipe.getroot().text_content())
        self.assertIn('Description.en.md', recipe.xpath('//a[contains(@href,"obsidian:")]/@href')[0])
        self.assertIn('! hacks/demo/Description.en.md', report['inputs'])
        self.assertNotIn('{{i18n:', (self.output/'index.html').read_text())
        self.assertNotIn('Проверка', recipe.getroot().text_content())

    def test_pending_translation_fails_without_overwriting_previous_build(self):
        build(self.source, self.output, 'ru')
        before = (self.output/'catalog.js').read_bytes()
        (self.directory/'Description.en.md').write_text('---\nlanguage: en\ntranslation_status: pending\n---\n')
        with self.assertRaisesRegex(ValueError, 'translation is not complete'):
            build(self.source, self.output, 'ru', ui_language='en')
        self.assertEqual((self.output/'catalog.js').read_bytes(),before)

    def test_translated_metadata_cannot_override_technical_contract(self):
        (self.directory/'Description.en.md').write_text('---\nlanguage: en\ntitle: Example\ncategory: other\n---\n')
        with self.assertRaisesRegex(ValueError, 'technical fields'):
            build(self.source, self.output, 'ru', ui_language='en')

    def test_translation_inventory_and_runtime_language_resolution(self):
        from atlas_generator.localization import translation_inventory, resolve_build_languages
        inventory = translation_inventory(self.source)
        self.assertEqual(inventory['languages']['ru']['complete'],1)
        self.assertEqual(inventory['languages']['en']['complete'],0)
        config = self.root/'.obsidian'
        directory = config/'plugins/hacksidian'
        directory.mkdir(parents=True)
        (directory/'data.json').write_text(json.dumps({'settings':{'interfaceLanguage':'auto','contentLanguage':'ru'},'localization':{'interfaceLanguage':'en','contentLanguage':'ru'}}))
        self.assertEqual(resolve_build_languages(config), ('ru','en'))
        self.assertEqual(resolve_build_languages(config, 'en', 'ru'), ('en','ru'))
        self.assertEqual(resolve_build_languages(None), ('en','en'))
        (directory/'data.json').write_text(json.dumps({'settings':{'interfaceLanguage':'ru','contentLanguage':'auto'}}))
        self.assertEqual(resolve_build_languages(config),('ru','ru'))
        self.assertEqual(resolve_build_languages(config, interface='en'),('en','en'))


if __name__ == '__main__':
    unittest.main()
