import { describe, expect, it } from "vitest";
import { DEFAULT_SETTINGS } from "../src/constants";
import { calculateUsage } from "../src/cost";

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
