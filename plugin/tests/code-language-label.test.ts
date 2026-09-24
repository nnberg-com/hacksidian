import {expect, test} from 'vitest';
import {codeLanguageLabel} from '../src/code-language-label';
test('extracts one language independent of class order and loading state',()=>{
 expect(codeLanguageLabel('language-sh is-loaded')).toBe('Shell');
 expect(codeLanguageLabel('is-loaded custom language-cpp')).toBe('C++');
 expect(codeLanguageLabel('language-rust is-loaded')).toBe('rust');
 expect(codeLanguageLabel('is-loaded custom')).toBe('');
});
