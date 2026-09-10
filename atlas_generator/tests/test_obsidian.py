import unittest
from atlas_generator.obsidian import embed_resources
from atlas_generator.templates import bind

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

    def test_parameters_are_literal_and_missing_values_fail(self):
        self.assertEqual(bind('{{scope}} {{element}}', {'scope':'.x', 'element':'p'}), '.x p')
        with self.assertRaises(ValueError): bind('{{missing}}', {})

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
