import { expect, test } from 'vitest';
import { parseDetails } from '../src/details';
test('each heading starts a column preserving markdown content',()=>{
 expect(parseDetails('> Зачем\nОписание\n\n- пункт\n> Как работает\n`color`\n> Ограничения\nТекст')).toEqual([
 {title:'Зачем',content:'Описание\n\n- пункт'},{title:'Как работает',content:'`color`'},{title:'Ограничения',content:'Текст'}]);
});
test('headings inside code fences remain content',()=>{
 expect(parseDetails('> Пример\n```md\n> цитата\n```\n> Далее\nТекст')).toHaveLength(2);
 expect(()=>parseDetails('Нет заголовка')).toThrow('Начните');
});
