import type MarkdownIt from 'markdown-it';
import type Token from 'markdown-it/lib/token.mjs';

const HEX_COLOR_REGEX =
  /#(?:[0-9a-fA-F]{3,4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})\b/g;

export function colorPreviewPlugin(md: MarkdownIt) {
  md.core.ruler.after('inline', 'color-preview', (state) => {
    let insideTable = false;

    state.tokens.forEach((token: Token) => {
      if (token.type === 'table_open') {
        insideTable = true;
        return;
      }

      if (token.type === 'table_close') {
        insideTable = false;
        return;
      }

      if (!insideTable || token.type !== 'inline') {
        return;
      }

      token.children?.forEach((child) => {
        if (child.type !== 'text') return;

        child.content = child.content.replace(
          HEX_COLOR_REGEX,
          (color) =>

            `<span class="color-preview"><span class="color-chip" style="background:${color}"></span></span>${color}`
        );

        child.type = 'html_inline';
      });
    });
  });
}