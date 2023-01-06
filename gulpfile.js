const fs = require('node:fs/promises');
const childProcess = require('node:child_process');
const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const CJS_DESTINATION = 'cjs';
const ESM_DESTINATION = 'esm';
const CSS_DESTINATION = 'css';

async function clean() {
  const paths = [
    CJS_DESTINATION,
    ESM_DESTINATION,
    CSS_DESTINATION,
  ];
  for (const path of paths) {
    await fs.rm(path, { force: true, recursive: true });
  }
}

async function css() {
  const handleFile = (src, filename) => new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(postcss([postcssImport(), autoprefixer()], null))
      .pipe(rename(filename))
      .pipe(gulp.dest(CSS_DESTINATION))
      .pipe(postcss([cssnano()], null))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(CSS_DESTINATION))
      .on('error', reject)
      .on('end', resolve);
  });

  const filesMap = {
    'draft-components.css': 'src/components/index.css',
    'draft-components.dark.css': 'src/components/index.dark.css',
    'draft-components-utilities.css': 'src/css-utilities/index.css',
  };
  const promises = Object
    .entries(filesMap)
    .map(([file, src]) => handleFile(src, file));

  return Promise.all(promises);
}

async function ts() {
  const compileTs = async (module, outDir) => new Promise((resolve, reject) => {
    childProcess.exec(
      `tsc --project tsconfig.json --module ${module} --outDir "${outDir}"`,
      (err, stdout) => {
        if (err) {
          reject(new Error(stdout));
        } else {
          resolve(stdout);
        }
      }
    );
  });

  await compileTs('commonjs', CJS_DESTINATION);
  await compileTs('esnext', ESM_DESTINATION);
}

exports.default = gulp.series(clean, css, ts);
