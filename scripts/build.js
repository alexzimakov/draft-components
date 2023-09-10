import path from 'node:path';
import childProcess from 'node:child_process';
import fs from 'node:fs/promises';
import postcss from 'postcss';
import autoprefixer from 'autoprefixer';
import postcssImport from 'postcss-import';

const PATHS = {
  dist: 'dist',
  css: 'css',
};

(async function main() {
  await buildTs();
  await buildCss();
})();

async function buildTs() {
  await rm(PATHS.dist);
  await exec('npx tsc' +
      " --project 'tsconfig.build.json'" +
      ` --outDir '${PATHS.dist}'`);
}

async function buildCss() {
  await rm(PATHS.css);
  await mkdir(PATHS.css);

  const files = [
    {
      from: 'src/components/index.css',
      to: path.join(PATHS.css, 'draft-components.css'),
    },
    {
      from: 'src/components/index.dark.css',
      to: path.join(PATHS.css, 'draft-components.dark.css'),
    },
    {
      from: 'src/css-utilities/index.css',
      to: path.join(PATHS.css, 'draft-components-utilities.css'),
    },
  ];
  const promises = files.map(async (options) => {
    const css = await fs.readFile(options.from);
    const result = await postcss([
      postcssImport,
      autoprefixer,
    ]).process(css, options);
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
