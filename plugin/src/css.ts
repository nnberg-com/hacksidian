import { t } from "../i18n";
import postcss from "postcss";

function normalizeFamily(value: string): string {
  return value.trim().replace(/^(['"])(.*)\1$/, "$2").toLowerCase();
}

// Font shorthand: skip optional style/weight/stretch, size and line-height.
function shorthandFamilies(value: string): string | undefined {
  const tokens = postcss.list.space(value);
  const size = tokens.findIndex(token => /^(?:(?:\d*\.)?\d+(?:[a-z%]+)|(?:xx?-small|small|medium|large|xx?-large|xxx-large|smaller|larger)|(?:calc|min|max|clamp|var)\()/i.test(token));
  if (size < 0) return undefined;
  let start = size + 1;
  if (tokens[start] === "/") start += 2;
  else if (tokens[start]?.startsWith("/")) start++;
  else if (tokens[size].endsWith("/")) start++;
  return tokens.slice(start).join(" ");
}

export function validateGeneratedCss(css: string, compatibleFonts?: string[]): string[] {
  const errors: string[] = [];
  let root;
  try { root = postcss.parse(css); }
  catch (error) {
    return [t("css.could_not_parse_css", { p0: error instanceof Error ? error.message : String(error) })];
  }
  if (!compatibleFonts) return [];
  const allowed = new Set(compatibleFonts.map(normalizeFamily));
  const globals = new Set(["inherit", "initial", "unset", "revert", "revert-layer"]);
  const variables = new Map<string, string[]>();
  root.walkDecls(declaration => {
    if (declaration.prop.startsWith("--")) variables.set(declaration.prop, [...(variables.get(declaration.prop) ?? []), declaration.value]);
  });
  const check = (value: string, seen = new Set<string>()) => {
    for (const item of postcss.list.comma(value)) {
      const family = normalizeFamily(item);
      if (globals.has(family)) continue;
      const variable = /^var\(\s*(--[\w-]+)\s*(?:,([\s\S]*))?\)$/.exec(item.trim());
      if (variable) {
        if (!seen.has(variable[1])) {
          const next = new Set(seen).add(variable[1]);
          for (const resolved of variables.get(variable[1]) ?? []) check(resolved, next);
          if (variable[2]) check(variable[2], next);
        }
        continue; // Existing theme/system variables remain usable.
      }
      if (!allowed.has(family)) errors.push(t("css.font_does_not_cover_the_selected_locales", { p0: family }));
    }
  };
  root.walkDecls(declaration => {
    const prop = declaration.prop.toLowerCase();
    if (prop === "font-family") check(declaration.value);
    if (prop === "font" && !globals.has(declaration.value.trim().toLowerCase())) {
      const families = shorthandFamilies(declaration.value);
      if (families) check(families);
      else if (!/^var\(/.test(declaration.value.trim())) check(declaration.value);
    }
  });
  return [...new Set(errors)];
}
