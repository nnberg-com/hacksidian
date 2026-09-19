import { test, expect } from 'vitest';
import { shouldApplyTechnique, validCommand } from '../src/technique-command';
import { parseParameterDecision } from '../src/parameter-chat';
test('only explicit apply with evidence from the current request permits application',()=>{
 const request='Сделай в ячейках таблицы отступы слева и справа как можно больше';
 expect(shouldApplyTechnique({command:'apply',commandEvidence:request},request)).toBe(true);
 for(const command of ['show','uncertain',undefined] as const)expect(shouldApplyTechnique({command,commandEvidence:request},request)).toBe(false);
 expect(shouldApplyTechnique({command:'apply'},request)).toBe(false);
 expect(shouldApplyTechnique({command:'apply',commandEvidence:'Примени предыдущий'},request)).toBe(false);
 expect(validCommand({command:'execute' as any})).toBe(false);
});
test('apply without value changes is allowed; clarification and search cannot apply the current card',()=>{
 expect(parseParameterDecision({action:'no_change',message:'',changes:[],command:'apply',commandEvidence:'Примени'}).command).toBe('apply');
 for(const action of ['ask_question','search_catalog'])expect(()=>parseParameterDecision({action,message:'',changes:[],command:'apply',commandEvidence:'Примени'})).toThrow();
});
