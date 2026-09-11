import { t } from "../i18n";
import postcss from "postcss";

// Conservative guard until component patches replace complete-stylesheet responses.
// Selector/property coverage may grow and values may change, but cannot disappear.
function coverage(css: string): Map<string, Set<string>> {
  const result = new Map<string, Set<string>>();
  postcss.parse(css).walkRules(rule => {
    const parents: string[] = [];
    let parent = rule.parent;
    while (parent && parent.type !== "root") {
      if (parent.type === "atrule") parents.unshift(`@${parent.name} ${parent.params}`);
      else if (parent.type === "rule") parents.unshift(parent.selector);
      parent = parent.parent;
    }
    for (const selector of rule.selectors) {
      const key = JSON.stringify([...parents, selector.trim()]);
      const properties = result.get(key) ?? new Set<string>();
      for (const node of rule.nodes) if (node.type === "decl") properties.add(node.prop);
      result.set(key, properties);
    }
  });
  return result;
}

export function validateCssPreservation(before: string, after: string): string[] {
  try {
    const previous = coverage(before);
    const next = coverage(after);
    const errors: string[] = [];
    for (const [selector, properties] of previous) {
      const remaining = next.get(selector);
      if (!remaining) errors.push(t("css-preservation.selector_removed", { p0: selector }));
      else for (const property of properties) {
        if (!remaining.has(property)) errors.push(t("css-preservation.property_removed_from", { p0: property, p1: selector }));
      }
    }
    return errors;
  } catch {
    return [t("css-preservation.could_not_verify_css_preservation_parsing_failed")];
  }
}
