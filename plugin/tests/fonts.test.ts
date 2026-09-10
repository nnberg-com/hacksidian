import { describe, expect, it } from "vitest";
import { fontSupportsLocales } from "../src/fonts";

describe("fontSupportsLocales", () => {
  it("requires every character from every selected locale", () => {
    const onlyBasicCyrillic = { hasGlyphForCodePoint: (codePoint: number) => codePoint < 0x500 };
    expect(fontSupportsLocales(onlyBasicCyrillic, ["ru-Cyrl"])).toBe(true);
    expect(fontSupportsLocales(onlyBasicCyrillic, ["sr-Cyrl", "he"])).toBe(false);
  });
});
