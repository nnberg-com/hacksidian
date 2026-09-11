import unittest
from atlas_generator.obsidian import embed_resources
from atlas_generator.templates import atlas_css

class ObsidianStyles(unittest.TestCase):
    def test_local_resources_are_embedded_without_fetching_external_urls(self):
        read = []
        def resource(name):
            read.append(name)
            return b'font-data'
        css = embed_resources('@font-face{src:url("fonts/test.woff2")} p{background:url(https://example.org/x.png)}', resource)
        self.assertEqual(read, ['fonts/test.woff2'])
        self.assertIn('data:font/woff2;base64,', css)
        self.assertIn('https://example.org/x.png', css)

    def test_recipe_is_returned_without_transformations(self):
        from pathlib import Path
        css = '/* preserved */\n.markdown-preview-view p { color: red; }\n'
        paths = []
        def read(path):
            paths.append(path)
            return css
        self.assertEqual(atlas_css(Path('/example'), read), css)
        self.assertEqual(paths, [Path('/example/recipe.css')])

    def test_shell_loads_theme_before_layout_and_adapter_after_it(self):
        from types import SimpleNamespace
        from lxml import html
        from atlas_generator.build import themed_shell
        source = '<html><head><link rel="stylesheet" href="recipe.css"></head><body>Example</body></html>'
        style = SimpleNamespace(classes='theme-dark mod-macos')
        root = html.document_fromstring(themed_shell(source, style, '../../'))
        self.assertEqual(root.xpath('//link/@href'), ['../../obsidian.css', 'recipe.css', '../../obsidian-shell.css'])
        self.assertIn('theme-dark', root.find('body').get('class'))
        self.assertIn('hacksidian-atlas-shell', root.find('body').get('class'))
        self.assertEqual(themed_shell(source, None), source)

    def test_default_style_is_discovered_from_source_vault(self):
        import tempfile
        from pathlib import Path
        from atlas_generator.build import discover_obsidian_config
        with tempfile.TemporaryDirectory() as temporary:
            vault = Path(temporary)
            source = vault/'project'/'atlas'
            source.mkdir(parents=True)
            self.assertIsNone(discover_obsidian_config(source))
            config = vault/'.obsidian'
            config.mkdir()
            (config/'appearance.json').write_text('{}')
            self.assertEqual(discover_obsidian_config(source), config.resolve())

    def test_interface_model_has_native_controls_and_only_one_active_note_host(self):
        from pathlib import Path
        from types import SimpleNamespace
        from lxml import html
        from atlas_generator.build import preview
        directory = Path('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks/interface-readable-tabs')
        from atlas_generator.render import split_frontmatter
        _, body = split_frontmatter((directory/'Markdown.ru.md').read_text())
        css = (directory/'recipe.css').read_text()
        technique = SimpleNamespace(id='interface-readable-tabs', directory=directory,
            metadata={'source_anchor':'test','format':'html','title':'Tabs'}, body=body,
            css=css, language='ru', description_language='ru')
        document, _, _ = preview(technique)
        root = html.document_fromstring(document)
        self.assertEqual(len(root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," workspace-tabs ")]')), 2)
        self.assertEqual(len(root.xpath('.//*[contains(concat(" ",normalize-space(@class)," ")," markdown-preview-view ")]')), 1)
        self.assertNotIn('markdown-preview-view', root.get_element_by_id('sample').get('class'))
        self.assertIn('--tab-width:220px', css)
        self.assertNotIn('--hack-interface-readable-tabs-tab-width', css)
        self.assertNotIn('.hx-', css)
        self.assertIn(css, document)

    def test_null_list_property_has_no_fake_none_pill(self):
        from lxml import etree
        from atlas_generator.render import property_value
        holder=etree.Element('div')
        property_value(holder,None,'list')
        self.assertEqual(holder.xpath('.//*[contains(@class,"multi-select-pill")]'),[])
        self.assertEqual(len(holder.xpath('.//*[@class="multi-select-input"]')),1)

    def test_editor_example_retains_native_token_classes(self):
        from pathlib import Path
        from lxml import html
        from atlas_generator.render import split_frontmatter,render_markdown
        path=Path('/Users/op/vaults/op/! P R O/hacksidian/atlas/! hacks/tag-e077/Markdown.ru.md')
        _,body=split_frontmatter(path.read_text())
        root=html.fragment_fromstring(render_markdown(body,'tag-e077'),create_parent='div')
        self.assertEqual(len(root.xpath('.//*[contains(concat(" ",@class," ")," cm-hashtag-begin ")]')),2)
        self.assertEqual(len(root.xpath('.//*[contains(concat(" ",@class," ")," cm-active ")]')),1)
