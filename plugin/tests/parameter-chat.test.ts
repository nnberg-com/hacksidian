import { test, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { applyParameterDecision, parameterChatPrompt, parseParameterDecision, PARAMETER_INSTRUCTIONS } from '../src/parameter-chat';
import { readParameters } from '../src/parameters';
const css = readFileSync(new URL('../../content/atlas/! hacks/hr-e070/recipe.css', import.meta.url), 'utf8');
const hack = { id: 'hr-e070', title: 'Короткий центральный штрих', path: 'atlas/! hacks/hr-e070/hr-e070.md', css, spec: {format: 2, target: 'g-hr', hasCss: true} };
test('prompt includes actual current values and limits for relative and maximum requests', () => {
  const prompt = parameterChatPrompt(hack, 'Сделай толще', 'ru', []);
  for (const p of readParameters(css)) {
    expect(prompt).toContain(p.variable); expect(prompt).toContain(`"max":${p.max}`); expect(prompt).toContain(`"cssValue":"${p.value}"`);
  }
  expect(PARAMETER_INSTRUCTIONS).toContain('CURRENT value');
  expect(PARAMETER_INSTRUCTIONS).toContain('declared boundary');
  expect(prompt).not.toContain('border:');
});
test('multiple changes validate atomically and only allowed parameter values change', () => {
  const params = readParameters(css);
  const valid = { action: 'update_parameters' as const, message: '', changes: params.map(p => ({variable:p.variable, input:String(p.max)})) };
  const result = applyParameterDecision(css, valid);
  expect(result.changes).toHaveLength(2);
  for (const p of readParameters(result.css)) expect(p.value).toBe(`${p.max}${p.unit}`);
  expect(result.css).toContain('background: currentColor;');
  expect(() => applyParameterDecision(css, {...valid, changes:[valid.changes[0], {variable:params[1].variable,input:'999'}]})).toThrow();
  expect(readParameters(css)[1].value).toBe('2px');
});
test('rejects unknown variables, duplicate fields, arbitrary CSS and invalid action combinations', () => {
  for (const changes of [[{variable:'--other',input:'3'}], [{variable:'--hacksidian-hr-e070-height',input:'4px'}], [{variable:'--hacksidian-hr-e070-height',input:'4; color:red'}]]) {
    expect(() => applyParameterDecision(css, {action:'update_parameters',message:'',changes})).toThrow();
  }
  for (const value of [
    {action:'update_css',message:'',changes:[]},
    {action:'ask_question',message:'?',changes:[{variable:'x',input:'3'}]},
    {action:'update_parameters',message:'',changes:[]},
    {action:'no_change',message:'',changes:[],path:'/another/file'},
    {action:'update_parameters',message:'',changes:[{variable:'x',input:'3'},{variable:'x',input:'4'}]},
  ]) expect(() => parseParameterDecision(value)).toThrow();
});
test('clarification, unsupported operation and search do not mutate source', () => {
  for (const action of ['ask_question','no_change','search_catalog'] as const) {
    expect(applyParameterDecision(css,{action,message:'Question',changes:[]})).toEqual({css,changes:[]});
  }
});
