import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';
import rgbParts from './postcss-plugins/rgb-parts.js';

export default {
  plugins: [
    postcssImport,
    autoprefixer,
    rgbParts,
  ],
};
