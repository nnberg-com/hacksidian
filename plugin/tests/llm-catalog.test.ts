import { expect, it } from 'vitest';
import { switchProvider } from '../src/llm-catalog';
import { DEFAULT_SETTINGS } from '../src/constants';
it('isolates keys, custom selection and manual prices per provider',()=>{
 const settings={...structuredClone(DEFAULT_SETTINGS),apiKey:'openai-key',model:'private-model',customModel:true};
 switchProvider(settings,'anthropic');
 expect(settings.apiKey).toBe('');expect(settings.model).toBe('claude-sonnet-5');expect(settings.customModel).toBe(false);
 settings.apiKey='claude-key';settings.inputPricePerMillion=3;
 switchProvider(settings,'openai');
 expect(settings.apiKey).toBe('openai-key');expect(settings.model).toBe('private-model');expect(settings.customModel).toBe(true);
 expect(settings.inputPricePerMillion).toBe(2);
 switchProvider(settings,'anthropic');expect(settings.apiKey).toBe('claude-key');expect(settings.inputPricePerMillion).toBe(3);
});
