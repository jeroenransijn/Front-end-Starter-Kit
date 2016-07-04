'use strict';
const fs = require('fs');
const gulp = require('gulp');
const vanillaPostcss = require('postcss');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const stylefmt = require('stylefmt');
const plumber = require('gulp-plumber');
const minimatch = require('minimatch');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const config = require('config');

const settings = {

	/**
	 * Minimatch patterns to run stylefmt on
	 * This is not run on reset and settings
	 */
	cssFormatting: [
		'**/src/css/main.css',
		'**/src/css/components/**/*.css',
		'**/src/css/utilities/**/*.css'
	],

	/**
	 * Distribution settings
	 */
	dist: {
		css: 'static/dist/css/',
		js: 'static/dist/js/'
	},

	/**
	 * Source settings
	 */
	src: {
		main: 'src/css/main.css',
		css: ['src/css/**/*.css']
	}
};

/**
 * Support minimatching for arrays
 * @param {array} arr
 * @param {string} match
 * @return {boolean} is matched to
 */
function isMatched (arr, match) {
	return !! arr.filter((item) => minimatch(match, item)).length;
}

function streamError(err) {
	gutil.beep();
	gutil.log(err instanceof gutil.PluginError ? err.toString() : err.stack);
}

function styles () {
	const processors = [
		require('postcss-import'),
		require('postcss-cssnext')({
			browsers: ['last 1 version'],
			warnForDuplicates: false
		}),
		require('cssnano')(),
		require('postcss-browser-reporter')
	];

	gulp.src(settings.src.main)
		.pipe(plumber({ errorHandler: streamError }))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(settings.dist.css));
}
gulp.task('styles', styles);

/**
 * Watches the css
 * - Runs stylefmt on file save
 * - Runs styles and compiles all the css
 */
function watch () {
	styles();

	gulp.watch(settings.src.css, (event) => {

		// Always perfectly format CSS across the team with stylefmt
		if (isMatched(settings.cssFormatting, event.path)) {
			// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
			// Split the filename from the path.
			let filename = event.path.split('/');
			filename = filename[filename.length - 1];
			// For some reason it needs a base to work
			const base = event.path.replace(filename, '');

			gulp.src(event.path, { base: base })
				.pipe(plumber({ errorHandler: streamError }))
				.pipe(postcss([
					stylefmt
				]))
				.pipe(gulp.dest(base))
				.on('end', styles);

		} else {
			styles();
		}
	});
}
gulp.task('watch', watch);

function scripts () {
	const scriptsInConfig = config.get('scripts').map((name) => `src${name}`);
	// Assume this is always run in NODE_ENV=development
	console.log('Scripts that are bundled:\n',
		scriptsInConfig.join('\n'));
	gulp.src(scriptsInConfig)
		.pipe(sourcemaps.init())
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest( settings.dist.js ));
}
gulp.task('scripts', scripts);

function serve () {
	const env = process.env.NODE_ENV || 'development';
	console.log('NODE_ENV:', env);
	nodemon({
		script: 'app.js',
		ext: 'js html json mustache',
		env: { 'NODE_ENV': env }
	}).on('readable', function () {
		this.stdout.on('data', (chunk) => {
			process.stdout.write(chunk);
		});
	});
}
gulp.task('serve', serve);

/**
 * Build does not comb your code
 */
gulp.task('build', ['styles', 'scripts']);

gulp.task('default', ['watch', 'serve']);
