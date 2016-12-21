import {task, watch, src, dest} from 'gulp';
import * as path from 'path';

import {
  DIST_COMPONENTS_ROOT, PROJECT_ROOT, COMPONENTS_DIR, HTML_MINIFIER_OPTIONS
} from '../constants';
import {sassBuildTask, tsBuildTask, execNodeTask, copyTask, sequenceTask} from '../task_helpers';
import {writeFileSync} from 'fs';

// No typings for these.
const inlineResources = require('../../../scripts/release/inline-resources');
const rollup = require('rollup').rollup;
const gulpMinifyCss = require('gulp-clean-css');
const gulpMinifyHtml = require('gulp-htmlmin');
const gulpIf = require('gulp-if');


// NOTE: there are two build "modes" in this file, based on which tsconfig is used.
// When `tsconfig.json` is used, we are outputting ES6 modules and a UMD bundle. This is used
// for serving and for release.
//
// When `tsconfig-spec.json` is used, we are outputting CommonJS modules. This is used
// for unit tests (karma).

/** Path to the tsconfig used for ESM output. */
const tsconfigPath = path.relative(PROJECT_ROOT, path.join(COMPONENTS_DIR, 'tsconfig.json'));


/** [Watch task] Rebuilds (ESM output) whenever ts, scss, or html sources change. */
task(':watch:components', () => {
  watch(path.join(COMPONENTS_DIR, '**/*.ts'), ['build:components']);
  watch(path.join(COMPONENTS_DIR, '**/*.scss'), ['build:components']);
  watch(path.join(COMPONENTS_DIR, '**/*.html'), ['build:components']);
});


/** Builds component typescript only (ESM output). */
task(':build:components:ts', tsBuildTask(COMPONENTS_DIR, 'tsconfig-srcs.json'));

/** Builds components typescript for tests (CJS output). */
task(':build:components:spec', tsBuildTask(COMPONENTS_DIR));

/** Copies assets (html, markdown) to build output. */
task(':build:components:assets', copyTask([
  path.join(COMPONENTS_DIR, '**/*.!(ts|spec.ts)'),
  path.join(PROJECT_ROOT, 'README.md'),
], DIST_COMPONENTS_ROOT));

/** Minifies the HTML and CSS assets in the distribution folder. */
task(':build:components:assets:minify', () => {
  return src('**/*.+(html|css)', { cwd: DIST_COMPONENTS_ROOT})
    .pipe(gulpIf(/.css$/, gulpMinifyCss(), gulpMinifyHtml(HTML_MINIFIER_OPTIONS)))
    .pipe(dest(DIST_COMPONENTS_ROOT));
});

/** Builds scss into css. */
task(':build:components:scss', sassBuildTask(DIST_COMPONENTS_ROOT, COMPONENTS_DIR));

/** Builds the UMD bundle for all of MD2. */
task(':build:components:rollup', () => {
  const globals: {[name: string]: string} = {
    // Angular dependencies
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/http': 'ng.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',

    // Rxjs dependencies
    'rxjs/Subject': 'Rx',
    'rxjs/add/observable/fromEvent': 'Rx.Observable',
    'rxjs/add/observable/forkJoin': 'Rx.Observable',
    'rxjs/add/observable/of': 'Rx.Observable',
    'rxjs/add/operator/toPromise': 'Rx.Observable.prototype',
    'rxjs/add/operator/map': 'Rx.Observable.prototype',
    'rxjs/add/operator/filter': 'Rx.Observable.prototype',
    'rxjs/add/operator/do': 'Rx.Observable.prototype',
    'rxjs/add/operator/share': 'Rx.Observable.prototype',
    'rxjs/add/operator/finally': 'Rx.Observable.prototype',
    'rxjs/add/operator/catch': 'Rx.Observable.prototype',
    'rxjs/add/operator/first': 'Rx.Observable.prototype',
    'rxjs/Observable': 'Rx'
  };

  // Rollup the md2 UMD bundle from all ES5 + imports JavaScript files built.
  return rollup({
    entry: path.join(DIST_COMPONENTS_ROOT, 'index.js'),
    context: 'this',
    external: Object.keys(globals)
  }).then((bundle: { generate: any }) => {
    const result = bundle.generate({
      moduleName: 'ng.md2',
      format: 'umd',
      globals,
      sourceMap: true,
      dest: path.join(DIST_COMPONENTS_ROOT, 'md2.umd.js')
    });

    // Add source map URL to the code.
    result.code += '\n\n//# sourceMappingURL=./md2.umd.js.map\n';
    // Format mapping to show properly in the browser. Rollup by default will put the path
    // as relative to the file, and since that path is in src/lib and the file is in
    // dist/md2, we need to kill a few `../`.
    result.map.sources = result.map.sources.map((s: string) => s.replace(/^(\.\.\/)+/, ''));

    writeFileSync(path.join(DIST_COMPONENTS_ROOT, 'md2.umd.js'), result.code, 'utf8');
    writeFileSync(path.join(DIST_COMPONENTS_ROOT, 'md2.umd.js.map'), result.map, 'utf8');
  });
});

/** Builds components with resources (html, css) inlined into the built JS (ESM output). */
task(':build:components:inline', sequenceTask(
  [':build:components:ts', ':build:components:scss', ':build:components:assets'],
  ':inline-resources',
));

/** Builds components with minified HTML and CSS inlined into the built JS. */
task(':build:components:inline:release', sequenceTask(
  [':build:components:ts', ':build:components:scss', ':build:components:assets'],
  ':build:components:assets:minify',
  ':inline-resources'
));

/** Inlines resources (html, css) into the JS output (for either ESM or CJS output). */
task(':inline-resources', () => inlineResources(DIST_COMPONENTS_ROOT));

/** Builds components to ESM output and UMD bundle. */
task('build:components', sequenceTask(':build:components:inline', ':build:components:rollup'));
task('build:components:release', sequenceTask(
  ':build:components:inline:release', ':build:components:rollup'
));

/** Generates metadata.json files for all of the components. */
task(':build:components:ngc', ['build:components:release'], execNodeTask(
  '@angular/compiler-cli', 'ngc', ['-p', tsconfigPath]
));
