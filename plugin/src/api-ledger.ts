import type { ApiAttempt, TurnRecord, UsageRecord } from './types';
export const unknownUsage = (): UsageRecord => ({ inputTokens: 0, cachedInputTokens: 0, outputTokens: 0, totalTokens: 0, estimatedCostUsd: null });
export function migrateAttempts(saved: ApiAttempt[] | undefined, turns: TurnRecord[]): ApiAttempt[] {
  if (saved) return saved.map(attempt => ({ ...attempt, status: attempt.status === 'pending' || attempt.status === 'received' ? 'interrupted' : attempt.status }));
  return turns.map(turn => ({ id: turn.id, createdAt: turn.createdAt, provider: turn.provider, model: turn.model,
    promptVersion: turn.promptVersion, status: 'completed', usage: turn.usage, responseId: turn.rawResponseId }));
}
export function summarizeAttempts(attempts: ApiAttempt[]) {
  let knownCostUsd = 0, unknownCount = 0;
  const usage = unknownUsage();
  for (const attempt of attempts) {
    for (const key of ['inputTokens', 'cachedInputTokens', 'outputTokens', 'totalTokens'] as const) usage[key] += attempt.usage[key];
    if (attempt.usage.estimatedCostUsd == null) unknownCount++;
    else knownCostUsd += attempt.usage.estimatedCostUsd;
  }
  usage.estimatedCostUsd = unknownCount ? null : knownCostUsd;
  return { usage, knownCostUsd, unknownCount, count: attempts.length };
}
