import Color from 'color';

/** @returns {import('postcss').Plugin} */
export default function rgbParts() {
  const postcssPlugin = 'rgb-parts';
  return {
    postcssPlugin,
    Declaration: (decl) => {
      const regex = /rgb-parts\((?<color>.+)\)/;
      const matches = decl.value.match(regex);
      if (matches && matches.groups) {
        try {
          const color = new Color(matches.groups.color);
          decl.value = color.rgb().array().join(' ');
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          const errorLocation = `${decl.source.input.file}:${decl.source.start.line}:${decl.source.start.column}`;
          console.warn(`PostCSS → ${postcssPlugin}: ${message}\n    at ${errorLocation}`);
        }
      }
    },
  };
}
rgbParts.postcss = true;
