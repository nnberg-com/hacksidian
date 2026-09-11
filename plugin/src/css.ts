import { t } from "../i18n";
import postcss, { type AtRule, type Rule } from "postcss";

const REQUIRED_SCOPES = [
  '.workspace-leaf-content[data-type="markdown"]',
  ".markdown-reading-view",
  ".markdown-preview-view",
];

const FORBIDDEN_DECLARATIONS = new Set(["display:none", "visibility:hidden"]);

function isInsideKeyframes(rule: Rule): boolean {
  let parent = rule.parent as { type: string; name?: string; parent?: unknown } | undefined;
  while (parent) {
    if (parent.type === "atrule" && /keyframes$/i.test((parent as AtRule).name)) return true;
    parent = parent.parent as typeof parent;
  }
  return false;
}

function normalizeFamily(value: string): string {
  return value.trim().replace(/^(['"])(.*)\1$/, "$2").toLowerCase();
}

export function validateGeneratedCss(css: string, compatibleFonts?: string[]): string[] {
  const errors: string[] = [];
  let root;

  try {
    root = postcss.parse(css);
  } catch (error) {
    return [t("css.could_not_parse_css", { p0: error instanceof Error ? error.message : String(error) })];
  }

  root.walkAtRules((rule) => {
    if (["import", "font-face", "namespace", "document"].includes(rule.name.toLowerCase())) {
      errors.push(t("css.the_rule_is_not_allowed", { p0: rule.name }));
    }
  });

  root.walkRules((rule) => {
    if (isInsideKeyframes(rule)) return;
    for (const selector of rule.selectors) {
      if (!REQUIRED_SCOPES.some((scope) => selector.includes(scope))) {
        errors.push(t("css.selector_is_outside_markdown_reading_view", { p0: selector }));
      }
      if (selector.includes("callmered-conversation") || selector.includes("callmered-panel")) {
        errors.push(t("css.selector_affects_the_hacksidian_panel", { p0: selector }));
      }
    }
  });

  root.walkDecls((declaration) => {
    const value = declaration.value.toLowerCase().replace(/\s+/g, "");
    if (/url\s*\(/i.test(declaration.value)) errors.push(t("css.url_is_not_allowed_in", { p0: declaration.prop }));
    if (FORBIDDEN_DECLARATIONS.has(`${declaration.prop.toLowerCase()}:${value}`)) {
      errors.push(t("css.hiding_content_with_is_not_allowed", { p0: declaration.prop }));
    }
    if (declaration.prop.toLowerCase() === "font") {
      errors.push(t("css.the_font_shorthand_is_not_allowed_use"));
    }
    if (compatibleFonts && declaration.prop.toLowerCase() === "font-family") {
      const allowed = new Set(compatibleFonts.map(normalizeFamily));
      for (const family of declaration.value.split(",").map(normalizeFamily)) {
        if (family.startsWith("var(")) continue;
        if (!allowed.has(family)) errors.push(t("css.font_does_not_cover_the_selected_locales", { p0: family }));
      }
    }
  });

  return [...new Set(errors)];
}
