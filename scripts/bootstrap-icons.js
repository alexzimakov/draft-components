const fsPromises = require('fs/promises');
const path = require('path');
const xml2js = require('xml2js');
const prettier = require('prettier');

const BASE_PATH = path.join(__dirname, '../');
const NODE_MODULES = path.join(BASE_PATH, 'node_modules');
const BOOTSTRAP_ICONS = path.join(NODE_MODULES, 'bootstrap-icons', 'icons');
const OUTPUT_DIR = path.join(BASE_PATH, 'src', 'bootstrap-icons');
const PRETTIER_OPTIONS = {
  singleQuote: true,
  trailingComma: 'es5',
  parser: 'babel',
};
const FILE_NOTE = `/**
 * This file auto-generated with the \`scripts/bootstrap-icons.js\` script.
 */`;

function toCamelCase(iconName) {
  let words = iconName.split('-');
  let variableName = words[0];
  for (let i = 1; i < words.length; i += 1) {
    const word = words[i];
    variableName += word[0].toUpperCase() + word.slice(1);
  }
  return variableName;
}

function createDir(dirPath) {
  return fsPromises.mkdir(dirPath, { mode: 0o755 });
}

function writeFile(filePath, content) {
  return fsPromises.writeFile(filePath, content, { mode: 0o644 });
}

function attrsToString(attrs = {}) {
  const entries = Object.entries(attrs);

  let result = '';
  for (let i = 0; i < entries.length; i += 1) {
    const [name, value] = entries[i];
    result += ` ${toCamelCase(name)}="${value}"`;
  }

  return result;
}

function tagToJsx(tagName, props) {
  tagName = toCamelCase(tagName);

  if (Array.isArray(props)) {
    return props.map((props) => tagToJsx(tagName, props)).join('');
  }

  if (props == null || typeof props !== 'object') {
    return `<${tagName} />`;
  }

  const { $: attrs, _: text, ...otherProps } = props;
  const children = Object.entries(otherProps);
  const isEmpty = !(text || children.length);

  let jsx = `<${tagName}${attrsToString(attrs)}${isEmpty ? ' />' : '>'}`;
  if (!isEmpty) {
    jsx += text ?? '';
    jsx += children.map((child) => tagToJsx(...child)).join('');
    jsx += `</${tagName}>`;
  }

  return jsx;
}

function toJsx(props) {
  const { _: text, ...otherProps } = props;
  const children = Object.entries(otherProps);
  const isEmpty = !children.length;

  if (isEmpty && !text) {
    return 'null';
  }

  if (isEmpty && text) {
    return `'${text}'`;
  }

  if (!isEmpty && !text) {
    const isAdjacentJSX = Array.isArray(children[0][1]);
    if (!isAdjacentJSX) {
      return tagToJsx(...children[0]);
    }
  }

  let jsx = '(<>';
  jsx += text ?? '';
  jsx += Object.entries(otherProps)
    .map((child) => tagToJsx(...child))
    .join('');
  jsx += '</>)';

  return jsx;
}

function iconToFileSource(iconName, props) {
  if (props == null || typeof props !== 'object') {
    throw new Error(`${iconName} is invalid`);
  }

  let variableName = toCamelCase(iconName);
  if (variableName.match(/^\d/)) {
    variableName = `icon${variableName}`;
  }

  const { $: attrs, ...otherProps } = props;

  return prettier.format(
    `${FILE_NOTE}
import { Icon } from '../components/svg-icon';

// https://github.com/twbs/icons/blob/main/icons/${iconName}.svg
export const ${variableName}: Icon = {
  name: '${iconName}',
  width: ${attrs.width || 16},
  height: ${attrs.height || 16},
  viewBox: '${attrs.viewBox || '0 0 16 16'}',
  children: ${toJsx(otherProps)},
};`,
    PRETTIER_OPTIONS
  );
}

async function main() {
  const icons = await fsPromises.readdir(BOOTSTRAP_ICONS);

  await fsPromises.rmdir(OUTPUT_DIR, { recursive: true });
  await createDir(OUTPUT_DIR);

  const xmlParser = new xml2js.Parser({
    explicitRoot: false,
    explicitArray: false,
    normalizeTags: true,
    normalize: true,
  });
  let indexSource = FILE_NOTE + '\n';
  for (const icon of icons) {
    if (icon) {
      const svgString = await fsPromises.readFile(
        path.join(BOOTSTRAP_ICONS, icon)
      );
      const iconName = path.basename(icon, '.svg');
      const fileSource = iconToFileSource(
        iconName,
        await xmlParser.parseStringPromise(svgString)
      );

      await writeFile(path.join(OUTPUT_DIR, `${iconName}.tsx`), fileSource);
      indexSource += `export * from './${iconName}';\n`;
    }
  }

  await writeFile(path.join(OUTPUT_DIR, 'index.ts'), indexSource);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
