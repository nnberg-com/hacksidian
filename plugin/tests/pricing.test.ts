import { beforeEach, expect, it, vi } from 'vitest';
import { readFileSync } from 'node:fs';
import { parsePricing, loadPricing } from '../src/pricing';
import { calculateUsage } from '../src/cost';
import { DEFAULT_SETTINGS } from '../src/constants';
const {requestUrl}=vi.hoisted(()=>({requestUrl:vi.fn()}));
vi.mock('obsidian',()=>({requestUrl}));
const fixture=(name:string)=>readFileSync(new URL(`./fixtures/pricing/${name}`,import.meta.url),'utf8');
const now=new Date('2026-09-10T12:00:00Z');
beforeEach(()=>vi.clearAllMocks());
it('parses official OpenAI prices and full-request long-context rates',()=>{
 const quote=parsePricing('openai','gpt-5.6-terra',fixture('openai.md'),now);
 expect(quote).toMatchObject({input:2,cached:0.2,output:12,cacheWrite:2.5,highContext:{threshold:272001,input:4,cached:0.4,output:18}});
 const settings={...DEFAULT_SETTINGS,pricing:quote};
 expect(calculateUsage({input_tokens:272000,output_tokens:1000},settings).estimatedCostUsd).toBeCloseTo(0.556);
 expect(calculateUsage({input_tokens:272001,output_tokens:1000},settings).estimatedCostUsd).toBeCloseTo(1.106004);
 expect(calculateUsage({input_tokens:1000,output_tokens:0,input_tokens_details:{cache_write_tokens:1000}},settings).estimatedCostUsd).toBeCloseTo(.0025);
});
it('selects exact Claude model row',()=>{
 expect(parsePricing('anthropic','claude-sonnet-5',fixture('claude.md'),now)).toMatchObject({input:2,cached:.2,output:10,cacheWrite:2.5});
 expect(parsePricing('anthropic','claude-opus-5',fixture('claude.md'),now).input).toBe(5);
 expect(()=>parsePricing('anthropic','claude-unknown',fixture('claude.md'),now)).toThrow();
});
it('uses Gemini paid standard text/image rate and respects promotional dates',()=>{
 const text=fixture('gemini.html');
 expect(parsePricing('google','gemini-3.8-flash',text,now)).toMatchObject({input:.75,cached:.075,output:3.75});
 expect(parsePricing('google','gemini-3.8-flash',text,new Date('2027-01-01T00:00:00Z'))).toMatchObject({input:1.5,cached:.15,output:7.5});
 expect(parsePricing('google','gemini-3.1-flash-lite',text,now)).toMatchObject({input:.25,cached:.025,output:1.5});
 expect(parsePricing('google','gemini-2.5-flash',text,now)).toMatchObject({input:.3,cached:.03,output:2.5});
 expect(()=>parsePricing('google','unknown',text,now)).toThrow();
});
it('handles Grok inclusive 200k boundary',()=>{
 const quote=parsePricing('xai','grok-4.20-0309-non-reasoning',fixture('grok.md'),now);
 expect(quote).toMatchObject({input:1.25,cached:.2,output:2.5,highContext:{threshold:200000,input:2.5,cached:.4,output:5}});
});
it('fails closed on changed format or different model',()=>{
 expect(()=>parsePricing('openai','gpt-6-astra',fixture('openai.md'),now)).toThrow();
 expect(()=>parsePricing('openai','gpt-5.6-terra',fixture('openai.md').replace('| Cached input |','| Unknown metric |'),now)).toThrow();
 expect(calculateUsage({input_tokens:100,output_tokens:20},DEFAULT_SETTINGS).estimatedCostUsd).toBeNull();
 const wrong=parsePricing('openai','gpt-5.6-terra',fixture('openai.md'),now);
 expect(calculateUsage({input_tokens:100,output_tokens:20},{...DEFAULT_SETTINGS,model:'other',pricing:wrong}).estimatedCostUsd).toBeNull();
});
it('fetches without API credentials, caches only matching fresh quotes and supports refresh',async()=>{
 requestUrl.mockResolvedValue({status:200,text:fixture('openai.md')});
 const quote=await loadPricing('openai','gpt-5.6-terra');
 expect(requestUrl.mock.calls[0][0].headers.Authorization).toBeUndefined();
 await loadPricing('openai','gpt-5.6-terra',quote);
 expect(requestUrl).toHaveBeenCalledTimes(1);
 await loadPricing('openai','gpt-5.6-terra',quote,true);
 expect(requestUrl).toHaveBeenCalledTimes(2);
 requestUrl.mockResolvedValue({status:503,text:''});
 await expect(loadPricing('openai','gpt-5.6-terra',{...quote,fetchedAt:'2000-01-01'})).rejects.toThrow('503');
});
