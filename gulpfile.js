const fs = require('node:fs/promises');
const childProcess = require('node:child_process');
const gulp = require('gulp');
const rename = require('gulp-rename');
const postcss = require('gulp-postcss');
const postcssImport = require('postcss-import');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const PATHS = {
  css: 'css',
  commonjs: 'dist',
  esm: 'esm',
};

async function clean() {
  for (const path of Object.values(PATHS)) {
    await fs.rm(path, { force: true, recursive: true });
  }
}

async function css() {
  const handleFile = (src, filename) => new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(postcss([postcssImport(), autoprefixer()], null))
      .pipe(rename(filename))
      .pipe(gulp.dest(PATHS.css))
      .pipe(postcss([cssnano()], null))
      .pipe(rename({ extname: '.min.css' }))
      .pipe(gulp.dest(PATHS.css))
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

  await compileTs('commonjs', PATHS.commonjs);
  await compileTs('es2020', PATHS.esm);
}

exports.default = gulp.series(clean, css, ts);
