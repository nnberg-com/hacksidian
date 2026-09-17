import json
from pathlib import Path
import subprocess
import sys
import tempfile
import unittest
import zipfile

SCRIPT = Path(__file__).resolve().parents[1] / 'build-starter-vault.py'


class StarterVaultTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.root = Path(self.temp.name)
        self.vault = self.root / 'Эталон'
        self.config = self.vault / '.obsidian'
        self.config.mkdir(parents=True)
        self.output = self.root / 'starter.zip'
        (self.vault / 'Статья.md').write_text('# Статья\n')

    def run_build(self, *extra):
        return subprocess.run([sys.executable, str(SCRIPT), str(self.vault), str(self.output), *extra], capture_output=True, text=True)

    def test_portable_archive_preserves_presets_and_strips_private_state(self):
        plugin = self.config / 'plugins/hacksidian'
        plugin.mkdir(parents=True)
        (plugin / 'manifest.json').write_text(json.dumps({'id': 'hacksidian', 'version': '1.0.0'}))
        (plugin / 'main.js').write_text('/* plugin */')
        original = json.dumps({'settings': {'apiKey': 'private-value', 'atlasFolder': 'atlas', 'providerConfig': {'access_token': 'secret'}}, 'state': {'turns': ['private history']}, 'snippetsInstalled': True})
        (plugin / 'data.json').write_text(original)
        (self.config / 'community-plugins.json').write_text('["hacksidian"]')
        (self.config / 'appearance.json').write_text('{"enabledCssSnippets":["custom"]}')
        (self.config / 'workspace.json').write_text('{"private":true}')
        (self.config / 'snippets').mkdir()
        (self.config / 'snippets/custom.css').write_text('body { color: red; }')
        (self.config / 'snippets/empty.css').write_bytes(b'')
        external = self.root / 'external'
        external.mkdir()
        (external / 'Карточка.md').write_text('Связанный материал')
        (self.vault / 'atlas').symlink_to(external, target_is_directory=True)
        (self.vault / '.git').mkdir()
        (self.vault / '.git/config').write_text('private')
        result = self.run_build('--name', 'Starter')
        self.assertEqual(result.returncode, 0, result.stderr)
        with zipfile.ZipFile(self.output) as archive:
            names = archive.namelist()
            self.assertIn('Starter/atlas/Карточка.md', names)
            self.assertNotIn('Starter/.obsidian/workspace.json', names)
            self.assertFalse(any('/.git/' in name for name in names))
            data = json.loads(archive.read('Starter/.obsidian/plugins/hacksidian/data.json'))
            self.assertEqual(data['settings']['apiKey'], '')
            self.assertEqual(data['settings']['providerConfig']['access_token'], '')
            self.assertEqual(data['settings']['atlasFolder'], 'atlas')
            self.assertNotIn('state', data)
            self.assertNotIn('snippetsInstalled', data)
            self.assertEqual(archive.read('Starter/.obsidian/snippets/empty.css'), b'')
            self.assertEqual(archive.read('Starter/.obsidian/snippets/custom.css'), b'body { color: red; }')
        self.assertEqual((plugin / 'data.json').read_text(), original)
        self.assertTrue((self.vault / 'atlas').is_symlink())
        self.assertEqual(json.loads(result.stdout)['enabled_plugins'][0]['version'], '1.0.0')

    def test_dry_run_excludes_files_and_writes_nothing(self):
        result = self.run_build('--dry-run', '--exclude', '*.md')
        self.assertEqual(result.returncode, 0, result.stderr)
        self.assertFalse(self.output.exists())
        self.assertIn('Статья.md', json.loads(result.stdout)['excluded'])

    def test_existing_output_is_not_overwritten(self):
        self.output.write_bytes(b'keep')
        self.assertNotEqual(self.run_build().returncode, 0)
        self.assertEqual(self.output.read_bytes(), b'keep')

    def test_cycle_and_incomplete_plugins_fail_without_archive(self):
        (self.vault / 'loop').symlink_to(self.vault, target_is_directory=True)
        self.assertNotEqual(self.run_build().returncode, 0)
        self.assertFalse(self.output.exists())
        (self.vault / 'loop').unlink()
        (self.config / 'community-plugins.json').write_text('["missing"]')
        self.assertNotEqual(self.run_build().returncode, 0)
        self.assertFalse(self.output.exists())

    def test_output_inside_source_rejected(self):
        self.output = self.vault / 'starter.zip'
        self.assertNotEqual(self.run_build().returncode, 0)
        self.assertFalse(self.output.exists())

    def test_malformed_json_does_not_leave_partial_archive(self):
        (self.config / 'app.json').write_text('{broken')
        self.assertNotEqual(self.run_build().returncode, 0)
        self.assertFalse(self.output.exists())
        self.assertFalse(list(self.root.glob('.starter-*')))


if __name__ == '__main__':
    unittest.main()
