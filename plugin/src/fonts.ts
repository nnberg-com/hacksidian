import { execFile } from "node:child_process";
import * as fontkit from "fontkit";
import type { Font, FontCollection } from "fontkit";
import type { SupportedLocale } from "./types";

export const LOCALE_OPTIONS: Array<{ id: SupportedLocale; label: string; sample: string }> = [
  { id: "ru-Cyrl", label: "Русская кириллица", sample: "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯабвгдеёжзийклмнопрстуфхцчшщъыьэюя" },
  { id: "sr-Cyrl", label: "Сербская кириллица", sample: "АБВГДЂЕЖЗИЈКЛЉМНЊОПРСТЋУФХЦЧЏШабвгдђежзијклљмнњопрстћуфхцчџш" },
  { id: "he", label: "Иврит", sample: "אבגדהוזחטיךכלםמןנסעףפץצקרשת" },
];

export interface FontDiscoveryResult {
  families: string[];
  scannedFiles: number;
  unreadableFiles: number;
  locales: SupportedLocale[];
}

interface SystemFontEntry {
  enabled?: string;
  valid?: string;
  path?: string;
}

interface SystemProfilerFonts {
  SPFontsDataType?: SystemFontEntry[];
}

const CSS_FALLBACK_FAMILIES = [
  "-apple-system",
  "BlinkMacSystemFont",
  "system-ui",
  "ui-sans-serif",
  "ui-serif",
  "ui-monospace",
  "sans-serif",
  "serif",
  "monospace",
];

function execSystemProfiler(): Promise<string> {
  return new Promise((resolve, reject) => {
    execFile(
      "/usr/sbin/system_profiler",
      ["SPFontsDataType", "-json", "-detailLevel", "mini"],
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 },
      (error, stdout) => (error ? reject(error) : resolve(stdout)),
    );
  });
}

function faces(value: Font | FontCollection): Font[] {
  return "fonts" in value ? value.fonts : [value];
}

export function fontSupportsLocales(font: Pick<Font, "hasGlyphForCodePoint">, locales: SupportedLocale[]): boolean {
  const samples = LOCALE_OPTIONS.filter((option) => locales.includes(option.id)).map((option) => option.sample);
  return samples.every((sample) =>
    Array.from(sample).every((character) => font.hasGlyphForCodePoint(character.codePointAt(0) ?? 0)),
  );
}

export async function discoverCompatibleFonts(locales: SupportedLocale[]): Promise<FontDiscoveryResult> {
  if (process.platform !== "darwin") {
    throw new Error("Автоматическое обнаружение шрифтов в PoC пока реализовано только для macOS.");
  }
  if (locales.length === 0) throw new Error("Выберите хотя бы одну поддерживаемую локаль.");

  const raw = await execSystemProfiler();
  const report = JSON.parse(raw) as SystemProfilerFonts;
  const paths = [...new Set(
    (report.SPFontsDataType ?? [])
      .filter((entry) => entry.enabled !== "no" && entry.valid !== "no" && typeof entry.path === "string")
      .map((entry) => entry.path as string),
  )];

  const families = new Set<string>();
  let unreadableFiles = 0;
  for (const fontPath of paths) {
    try {
      for (const font of faces(fontkit.openSync(fontPath))) {
        if (font.familyName && !font.familyName.startsWith(".") && fontSupportsLocales(font, locales)) {
          families.add(font.familyName);
        }
      }
    } catch {
      unreadableFiles += 1;
    }
  }

  for (const family of CSS_FALLBACK_FAMILIES) families.add(family);
  return {
    families: [...families].sort((left, right) => left.localeCompare(right, "en")),
    scannedFiles: paths.length,
    unreadableFiles,
    locales: [...locales],
  };
}

export function quoteFontFamily(family: string): string {
  return /\s/.test(family) ? `"${family.replace(/"/g, "\\\"")}"` : family;
}
