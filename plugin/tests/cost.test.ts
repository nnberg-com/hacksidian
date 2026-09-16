import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../src/constants";
import { calculateUsage, formatCost } from "../src/cost";

describe("calculateUsage", () => {
  it("separates cached input and reports per-turn estimated cost", () => {
    const usage = calculateUsage(
      {
        input_tokens: 1_000_000,
        output_tokens: 100_000,
        total_tokens: 1_100_000,
        input_tokens_details: { cached_tokens: 200_000 },
      },
      {...DEFAULT_SETTINGS, autoPricing:false},
    );
    expect(usage.estimatedCostUsd).toBeCloseTo(2.84);
  });
});


it('formats dollar amounts to cents without changing underlying precision',()=>{
 expect(formatCost(1.234567)).toBe('≈ $1.23');
 expect(formatCost(1.236)).toBe('≈ $1.24');
 expect(formatCost(0.000001)).toBe('≈ $0.00');
 expect(formatCost(null)).not.toContain('$0.00');
});
