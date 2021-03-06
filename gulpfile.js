'use strict';
const gulp = require('gulp');
const csscomb = require('gulp-csscomb');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const minimatch = require('minimatch');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const postcss = require('gulp-postcss');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const autoprefixer = require('autoprefixer');
const config = require('config');

const settings = {

	/**
	 * Minimatch patterns to run CSS comb on
	 * This is not run on utils and settings
	 */
	cssComb: [
		'**/src/scss/main.scss',
		'**/src/scss/components/**/*.scss'
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
		main: 'src/scss/main.scss',
		scss: ['src/scss/**/*.scss']
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

function watch () {
	gulp.watch(settings.src.scss, (event) => {

		// Always perfectly format CSS across the team with CSS Comb
		if (isMatched(settings.cssComb, event.path)) {
			// [Using event.path for source and destination](https://github.com/gulpjs/gulp/issues/212)
			// Split the filename from the path.
			let filename = event.path.split('/');
			filename = filename[filename.length - 1];
			// For some reason it needs a base to work
			const base = event.path.replace(filename, '');

			// Only comb the current file if it matches the settings
			gulp.src(event.path, { base: base })
				.pipe(plumber())
				.pipe(csscomb())
				.pipe(gulp.dest(base));
		}

		styles();
	});
}
gulp.task('watch', watch);

function styles () {
	gulp.src(settings.src.main)
		.pipe(sourcemaps.init())
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(postcss([ autoprefixer({ browsers: ['last 2 versions'] }) ]))
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(settings.dist.css));
}
gulp.task('styles', styles);

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
	console.log(process.env.NODE_ENV);
	nodemon({
		script: 'app.js',
		ext: 'js html json mustache',
		env: { 'NODE_ENV': process.env.NODE_ENV || 'development' }
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
