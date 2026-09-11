import { beforeEach } from 'vitest';
import { setLanguageResolver } from '../i18n';
// Existing contract tests assert Russian diagnostics explicitly.
beforeEach(() => setLanguageResolver(() => 'ru'));
