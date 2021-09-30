const { exec } = require('child_process');
const { copy } = require('fs-extra');
const packageJson = require('./package.json');
const fs = require('fs');
const path = require('path');
const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const SOURCE_PATH = path.join(__dirname, 'src');
const DIST_PATH = __dirname;
const ANSI_CODES = {
  reset: '\x1b[0m',
  boldOn: '\x1b[1m',
  boldOff: '\x1b[22m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[367m',
};

async function clean(done) {
  for (const file of packageJson.files) {
    const dir = file.split(path.sep)[0];
    if (dir) {
      fs.rmdirSync(dir, { recursive: true });
    }
  }
  done();
}

function buildTs(done) {
  tsc('commonjs', DIST_PATH)
    .then(() => done())
    .catch((err) => {
      console.error(
        `${ANSI_CODES.red}${ANSI_CODES.boldOn}TypeScript compilation error:${ANSI_CODES.reset}`,
        err.message
      );
      done(err);
    });
}

function buildScss() {
  return gulp
    .src(path.join(SOURCE_PATH, 'styles/**/*.scss'))
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(gulp.dest(path.join(DIST_PATH, 'css')));
}

function copyScss(done) {
  copy(path.join(SOURCE_PATH, 'styles'), path.join(DIST_PATH, 'scss'), done);
}

exports.default = gulp.series(
  clean,
  gulp.parallel(buildTs, buildScss),
  copyScss
);

/**
 * Performs `tsc` command within shell.
 * @param {string} module - Specify module code generation: "None", "CommonJS", "AMD", "System", "UMD", "ES6", "ES2015" or "ESNext".
 * @param {string} outDir - Redirect output structure to the directory.
 * @param {boolean} declaration - Generates corresponding .d.ts file.
 * @returns {Promise<string>}
 */
async function tsc(module, outDir, declaration = true) {
  return new Promise((resolve, reject) => {
    exec(
      `tsc --module ${module} --outDir "${outDir}" --declaration ${declaration}`,
      (err, stdout) => {
        if (err) {
          reject(new Error(stdout));
        } else {
          resolve(stdout);
        }
      }
    );
  });
}
