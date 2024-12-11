import path from 'node:path';
import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import postcss from 'postcss';
import postcssConfig from '../postcss.config.js';
import { glob } from 'glob';

const PATHS = {
  src: 'src',
  dist: 'dist',
  distCss: 'css',
};

(async function main() {
  await buildTs();
  await buildCss();
})();

async function buildTs() {
  await rm(PATHS.dist);
  await exec('npx tsc'
    + ' --project \'tsconfig.build.json\''
    + ` --outDir '${PATHS.dist}'`);
}

async function buildCss() {
  await rm(PATHS.distCss);
  await mkdir(PATHS.distCss);

  const componentsDir = path.join(PATHS.src, 'components');
  const componentCssFiles = await glob(path.join(componentsDir, '*', '*.css'));
  const files = [
    {
      from: path.join(componentsDir, 'index.css'),
      to: path.join(PATHS.distCss, 'draft-components.css'),
    },
    {
      from: path.join(componentsDir, 'variables.css'),
      to: path.join(PATHS.distCss, 'draft-components-variables.css'),
    },
    {
      from: path.join(PATHS.src, 'css-utilities', 'index.css'),
      to: path.join(PATHS.distCss, 'draft-components-utilities.css'),
    },
    ...componentCssFiles.map((file) => ({
      from: file,
      to: file.replace(PATHS.src, PATHS.dist),
    })),
  ];
  const promises = files.map(async (options) => {
    const css = await fs.readFile(options.from);
    const result = await postcss(postcssConfig.plugins).process(css, options);
    return appendFile(options.to, result.css);
  });
  return Promise.all(promises);
}

function exec(command) {
  return new Promise((resolve, reject) => {
    console.log(`${cyan('exec:')} ${command}`);
    childProcess.exec(command, (error, stdout, stderr) => {
      if (stderr) {
        console.error(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
      if (error) {
        return reject(error);
      }
      resolve({ stdout, stderr });
    });
  });
}

function rm(path) {
  console.log(`${cyan('rm:')} ${path}`);
  return fs.rm(path, { recursive: true, force: true });
}

function mkdir(path) {
  console.log(`${cyan('mkdir:')} ${path}`);
  return fs.mkdir(path, { recursive: true });
}

function appendFile(path, data) {
  console.log(`${cyan('appendFile:')} ${path}`);
  return fs.appendFile(path, data);
}

function cyan(text) {
  return `\u001b[36m${text}\u001b[0m`;
}
