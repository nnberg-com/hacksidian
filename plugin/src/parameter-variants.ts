import postcss from 'postcss';
import selectorParser from 'postcss-selector-parser';
import { parameterInput, parameterValue, readParameters, updateParameter } from './parameters';

/** An expanded example is an explicit, possibly partial, assignment of ordinary parameters. */
export function parameterExample(css: string, values: Record<string, string>): string {
  for (const [variable, value] of Object.entries(values)) css = updateParameter(css, variable, value);
  return css;
}

function headingChoices(css: string): {variable: string; source: string; target: string}[] {
  const parameters = readParameters(css), choices: {variable: string; source: string; target: string}[] = [];
  postcss.parse(css).walkAtRules('hacksidian-heading', block => {
    const [variable, source, extra] = block.params.split(/\s+/);
    const p = parameters.find(p => p.variable === variable);
    if (block.parent?.type !== 'root' || extra || !/^h[1-6]$/.test(source) || !p || p.type !== 'select' || p.options.some(o => !/^h[1-6]$/.test(o.value))) throw Error('Invalid heading target');
    choices.push({variable, source, target: parameterValue(p, parameterInput(p))});
  });
  if (choices.length > 1) throw Error('One heading target per recipe');
  return choices;
}

/** Adapt only the preview copy, never the user's Markdown or fenced code. */
export function parameterMarkdown(markdown: string, css: string): string {
  if (!css.includes('@hacksidian-heading')) return markdown;
  const choice = headingChoices(css)[0];
  if (!choice) return markdown;
  let fence: string | undefined;
  return markdown.split('\n').map(line => {
    const marker = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (marker) { if (!fence) fence=marker[1]; else if (marker[1][0]===fence[0] && marker[1].length>=fence.length) fence=undefined; return line; }
    if (fence) return line;
    return line.replace(/^( {0,3})(#{1,6})(?=\s)/, (full, indent, hashes) => hashes.length === Number(choice.source[1]) ? indent+'#'.repeat(Number(choice.target[1])) : full);
  }).join('\n');
}

/** Resolve value tables into the same rule. Variants cannot introduce selectors or resources. */
export function resolveParameterVariants(css: string): string {
  if (!/@hacksidian-(?:variants|target|heading)\b/.test(css)) return css;
  const parameters = readParameters(css);
  const tree = postcss.parse(css);
  const used = new Set<string>();
  const headings = headingChoices(css);
  tree.walkAtRules('hacksidian-heading', block => {
    const {source,target} = headings[0];
    let matched = false;
    block.walkRules(rule => {
      if (rule.parent?.type === 'atrule' && /keyframes$/.test(rule.parent.name)) return;
      const ast = selectorParser().astSync(rule.selector);
      ast.walkTags(tag => { if(tag.value===source) {tag.value=target;matched=true;} });
      ast.walkClasses(c => {if(c.value==='el-'+source) {c.value='el-'+target;matched=true;} });
      rule.selector=ast.toString();
    });
    block.walkDecls(d => {d.value=d.value.replace(new RegExp(`var\\(\\s*--${source}-`, 'g'), `var(--${target}-`);});
    if (!matched) throw Error('Heading target has no matching selectors');
    block.replaceWith(...(block.nodes ?? []));
  });
  tree.walkAtRules('hacksidian-target', block => {
    const parameter = parameters.find(p => p.variable === block.params);
    const targets: Record<string, string> = { bold: 'strong', italic: 'em', highlight: 'mark' };
    if (block.parent?.type !== 'root' || !parameter || parameter.type !== 'select' ||
        parameter.options.some(o => !Object.hasOwn(targets, o.value))) throw Error('Invalid target parameter');
    const target = targets[parameterValue(parameter, parameterInput(parameter))];
    let rules = 0;
    block.walkRules(rule => {
      const ast = selectorParser().astSync(rule.selector);
      ast.each(selector => {
        let found = false;
        selector.walkPseudos(pseudo => {
          if (pseudo.value !== ':--hacksidian-target') return;
          if (pseudo.nodes?.length) throw Error('Target placeholder cannot take arguments');
          pseudo.replaceWith(selectorParser.tag({value: target})); found = true;
        });
        if (!found) throw Error('Target rule requires a target placeholder');
      });
      rule.selector = ast.toString(); rules++;
    });
    if (!rules) throw Error('Empty target block');
    block.replaceWith(...(block.nodes ?? []));
  });
  tree.walkAtRules('hacksidian-variants', table => {
    const parameter = parameters.find(p => p.variable === table.params);
    if (!parameter || parameter.type !== 'select' || used.has(table.params) || table.parent?.type !== 'rule') throw Error('Invalid parameter variant table');
    used.add(table.params);
    const parent = table.parent;
    if (!parent.nodes.some(n => n.type === 'decl' && n.prop === parameter.variable)) throw Error('Variant table must share its parameter scope');
    const selected = parameterValue(parameter, parameterInput(parameter));
    const options = new Set<string>();
    let shape: string | undefined;
    let replacement: postcss.Declaration[] | undefined;
    for (const node of table.nodes ?? []) {
      if (node.type === 'comment') continue;
      if (node.type !== 'atrule' || node.name !== 'variant' || options.has(node.params) || !parameter.options.some(o => o.value === node.params)) throw Error('Invalid parameter variant');
      options.add(node.params);
      const declarations: postcss.Declaration[] = [];
      for (const child of node.nodes ?? []) {
        if (child.type === 'comment') continue;
        if (child.type !== 'decl' || !/^--hacksidian-[a-z0-9-]+$/.test(child.prop) || parameters.some(p => p.variable === child.prop) || child.important || /url\s*\(/i.test(child.value)) throw Error('Variants contain only derived custom properties');
        declarations.push(child);
      }
      const names = declarations.map(d => d.prop).sort();
      if (!names.length || new Set(names).size !== names.length) throw Error('Empty or duplicate variant values');
      const signature = JSON.stringify(names);
      if (shape !== undefined && shape !== signature) throw Error('All variants must use the same variable schema');
      shape = signature;
      if (node.params === selected) replacement = declarations;
    }
    if (options.size !== parameter.options.length || !replacement) throw Error('Incomplete parameter variant table');
    table.replaceWith(...replacement.map(d => d.clone()));
  });
  tree.walkAtRules(a => { if (a.name === 'variant' || a.name.startsWith('hacksidian-')) throw Error('Unresolved recipe directive'); });
  return tree.toString();
}

export function parseExpandedValues(source: string): Record<string, string> {
  const value: unknown = JSON.parse(source);
  if (!value || Array.isArray(value) || typeof value !== 'object' || !Object.keys(value).length ||
      !Object.entries(value).every(([key, v]) => /^--hacksidian-[a-z0-9-]+$/.test(key) && typeof v === 'string')) throw Error('Expected parameter names and input values');
  return value as Record<string, string>;
}
