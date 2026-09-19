import importlib.util
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch

spec = importlib.util.spec_from_file_location('release', Path(__file__).resolve().parents[1] / 'vault-release.py')
release = importlib.util.module_from_spec(spec)
spec.loader.exec_module(release)


class ExportTests(unittest.TestCase):
    def test_export_cleans_before_git_and_removes_stale_files(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            vault = root / 'Произвольное имя'
            config = vault / '.obsidian'
            (config / 'plugins/hacksidian').mkdir(parents=True)
            (config / 'community-plugins.json').write_text('["hacksidian"]')
            (config / 'plugins/hacksidian/data.json').write_text(json.dumps({'settings': {'apiKey': 'test-private-key', 'atlasFolder': 'atlas'}, 'state': {'turns': ['private']}, 'apiAttempts': [1], 'snippetsInstalled': True}))
            (config / 'workspace.json').write_text('{}')
            (vault / 'INSTALL.md').write_text('# Установка')
            preset = root / 'preset'
            preset.mkdir()
            (preset / 'old.css').write_text('obsolete')
            with patch.object(release, 'PRESET', preset), patch.object(release, 'LOCK', root / 'lock.json'), patch.object(release, 'resolve_dependencies', return_value={'plugins': [], 'files': []}):
                release.export(vault, False)
                self.assertTrue((preset / 'old.css').exists())
                release.export(vault, True)
                self.assertFalse((preset / 'old.css').exists())
                self.assertFalse((preset / '.obsidian/workspace.json').exists())
                data = json.loads((preset / '.obsidian/plugins/hacksidian/data.json').read_text())
                self.assertEqual(data, {'settings': {'apiKey': '', 'atlasFolder': 'atlas'}})
                self.assertIn('test-private-key', (config / 'plugins/hacksidian/data.json').read_text())
                self.assertEqual((preset / 'INSTALL.md').read_text(), '# Установка')

    def test_machine_specific_settings_rejected(self):
        for value in [b'/Users/someone/vault', b'/home/user/vault', b'obsidian://open?vault=OldName&file=atlas']:
            with self.assertRaises(ValueError):
                release.portable(value, 'settings')
        release.portable(b'{"atlasFolder":"atlas"}', 'settings')

    def test_download_corruption_rejected(self):
        with tempfile.TemporaryDirectory() as tmp:
            root = Path(tmp)
            (root / 'preset').mkdir()
            (root / 'content/atlas').mkdir(parents=True)
            (root / 'content/playground').mkdir()
            release.write_json(root / 'lock.json', {'plugins': [], 'files': [{'url': 'https://example.test/file', 'path': '.obsidian/plugins/test/main.js', 'sha256': 'incorrect'}]})
            with patch.object(release, 'ROOT', root), patch.object(release, 'PRESET', root / 'preset'), patch.object(release, 'LOCK', root / 'lock.json'), patch.object(release, 'fetch', return_value=b'changed'):
                with self.assertRaisesRegex(ValueError, 'Checksum mismatch'):
                    release.assemble(root / 'out.zip', 'Renamed vault')
            self.assertFalse((root / 'out.zip').exists())
