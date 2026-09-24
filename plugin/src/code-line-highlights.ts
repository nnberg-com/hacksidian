import { installCodeWrapMarkers } from './code-wrap-markers';
import { installInlineCodeSelection } from './inline-code-selection';
import { MarkdownRenderChild, type Plugin } from 'obsidian';
import { watchCodeLineHighlights } from './code-line-ranges';

export function registerCodeLineHighlights(plugin: Plugin): void {
  plugin.registerMarkdownPostProcessor((element, context) => {
    if (element.closest('.hacksidian-live-sample')) return;
    const child = new MarkdownRenderChild(element);
    child.onload = () => {
      watchCodeLineHighlights(element, child);
      installCodeWrapMarkers(element, child);
      installInlineCodeSelection(element, child);
    };
    context.addChild(child);
  }, 1000);
}
