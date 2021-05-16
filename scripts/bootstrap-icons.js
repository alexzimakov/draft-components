const fs = require('fs/promises');
const path = require('path');
const xml2js = require('xml2js');
const prettier = require('prettier');
const defaultPrettierOptions = require('../.prettierrc.json');

const basePath = path.join(__dirname, '../');
const nodeModulesDir = path.join(basePath, 'node_modules');
const bootstrapIconsDir = path.join(nodeModulesDir, 'bootstrap-icons', 'icons');
const iconsDir = path.join(basePath, 'src', 'icons');
const prettierOptions = { ...defaultPrettierOptions, parser: 'babel' };
const note = `/**
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

function formatCode(source) {
  return prettier.format(source, prettierOptions);
}

function createDir(dirPath) {
  return fs.mkdir(dirPath, { mode: 0o755 });
}

function writeFile(filePath, content) {
  return fs.writeFile(filePath, content, { mode: 0o644 });
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

  const variableName = toCamelCase(iconName);
  const { $: attrs, ...otherProps } = props;

  return formatCode(
    `${note}
import * as React from 'react';
import { Icon } from '../components/svg-icon/svg-icon';

// https://github.com/twbs/icons/blob/main/icons/${iconName}.svg
export const ${variableName}: Icon = {
  name: '${iconName}',
  width: ${attrs.width || 16},
  height: ${attrs.height || 16},
  viewBox: '${attrs.viewBox || '0 0 16 16'}',
  children: ${toJsx(otherProps)},
};`,
    prettierOptions
  );
}

async function main() {
  const icons = await fs.readdir(bootstrapIconsDir);

  await fs.rmdir(iconsDir, { recursive: true });
  await createDir(iconsDir);

  const xmlParser = new xml2js.Parser({
    explicitRoot: false,
    explicitArray: false,
    normalizeTags: true,
    normalize: true,
  });
  let indexSource = note + '\n';
  for (const icon of icons) {
    if (icon) {
      const svgString = await fs.readFile(path.join(bootstrapIconsDir, icon));
      const iconName = path.basename(icon, '.svg');
      const fileSource = iconToFileSource(
        iconName,
        await xmlParser.parseStringPromise(svgString)
      );

      await writeFile(path.join(iconsDir, `${iconName}.tsx`), fileSource);
      indexSource += `export * from './${iconName}';\n`;
    }
  }

  await writeFile(path.join(iconsDir, 'index.ts'), indexSource);
}

main().catch((e) => {
  console.log(e.message);
  process.exit(1);
});
