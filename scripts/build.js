import fs from 'node:fs/promises';
import path from 'node:path';
import childProcess from 'node:child_process';
import postcss from 'postcss';
import postcssConfig from '../postcss.config.js';

const PATHS = {
  css: 'css',
  esm: 'esm',
  cjs: 'cjs',
  types: 'types',
};

(async function main() {
  await generateTypes();
  await buildTs();
  await buildCss();
})();

async function generateTypes() {
  await rm(PATHS.types);
  await exec('npx tsc' +
    " --project 'tsconfig.build.json'" +
    ' --declaration' +
    ' --emitDeclarationOnly' +
    ` --outDir '${PATHS.types}'`);
}

async function buildTs() {
  await rm(PATHS.esm);
  await rm(PATHS.cjs);
  await exec('npx rollup --config rollup.config.js');
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
    const result = await postcss(postcssConfig.plugins).process(css, options);
    return appendFile(options.to, result.css);
  });
  return Promise.all(promises);
}

function exec(command) {
  return new Promise((resolve, reject) => {
    console.log(`\u001b[36mexec:\u001b[0m ${command}`);
    childProcess.exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      if (stderr) {
        console.error(stderr);
      }
      if (stdout) {
        console.log(stdout);
      }
      resolve({ stdout, stderr });
    });
  });
}

function rm(path) {
  console.log(`\u001b[36mrm:\u001b[0m ${path}`);
  return fs.rm(path, { recursive: true, force: true });
}

function mkdir(path) {
  console.log(`\u001b[36mmkdir:\u001b[0m ${path}`);
  return fs.mkdir(path, { recursive: true });
}

function appendFile(path, data) {
  console.log(`\u001b[36mappendFile:\u001b[0m ${path}`);
  return fs.appendFile(path, data);
}
