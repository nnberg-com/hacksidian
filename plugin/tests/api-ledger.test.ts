import { test, expect } from 'vitest';
import { migrateAttempts, summarizeAttempts, unknownUsage } from '../src/api-ledger';
import type { ApiAttempt, TurnRecord } from '../src/types';
test('migrates old turns once and preserves interrupted usage across restart',()=>{
 const turn={id:'old',createdAt:'2026-09-11',provider:'openai',model:'test',promptVersion:'old',rawResponseId:'response',usage:{...unknownUsage(),estimatedCostUsd:0.25}} as TurnRecord;
 const migrated=migrateAttempts(undefined,[turn]);
 expect(migrated).toHaveLength(1);expect(summarizeAttempts(migrated).knownCostUsd).toBe(0.25);
 expect(migrateAttempts(migrated,[turn])).toHaveLength(1);
 expect(migrateAttempts([], [turn])).toHaveLength(0);
 const interrupted=migrateAttempts([{...migrated[0],status:'received'}],[]);
 expect(interrupted[0].status).toBe('interrupted');expect(interrupted[0].usage).toEqual(turn.usage);
});
test('unknown usage does not hide the known subtotal or masquerade as zero cost',()=>{
 const attempts=[{usage:{...unknownUsage(),estimatedCostUsd:0.25}},{usage:unknownUsage()}] as ApiAttempt[];
 expect(summarizeAttempts(attempts)).toMatchObject({count:2,knownCostUsd:0.25,unknownCount:1,usage:{estimatedCostUsd:null}});
});
