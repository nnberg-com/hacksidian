import { metadataModelBase } from './metadata-model-base';
import { resolveParameterVariants } from './parameter-variants';

/** Separate document: even body rules and editor selectors cannot affect the vault UI. */
export function metadataDocument(model: string, css: string, variables: Record<string,string>): string {
  const body = model.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1];
  if (!body) throw new Error('Properties model has no body');
  if (/<(?:script|iframe|object|embed|style|link|form)\b|\son\w+\s*=/i.test(body)) throw new Error('Unsupported active content in Properties model');
  const tokens = Object.entries(variables).filter(([key])=>/^--[\w-]+$/.test(key)).map(([key,value])=>`${key}:${value};`).join('');
  const style = (`:root{${tokens}}\n` + metadataModelBase + '\n' + resolveParameterVariants(css)).replace(/<\/style/gi,'<\\/style');
  return `<!doctype html><html><head><meta charset="utf-8"><meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; img-src data:; font-src data:"><style>${style}</style></head><body>${body}</body></html>`;
}

