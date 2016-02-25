var gulp = require('gulp');
var runSequence = require('run-sequence');
var changed = require('gulp-changed');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var typescript = require('gulp-typescript');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var tsc = require('typescript');
//var notify = require("gulp-notify");
var browserSync = require('browser-sync');


//var minifycss = require('gulp-minify-css');
//var htmlmin = require('gulp-htmlmin');
//var imagemin = require('gulp-imagemin');
//var assign = Object.assign || require('object.assign');
//var merge = require('merge2');

var tsProject = typescript.createProject('./tsconfig.json', {typescript: tsc});

// transpiles changed es6 files to SystemJS format
// the plumber() call prevents 'pipe breaking' caused
// by errors from other gulp plugins
// https://www.npmjs.com/package/gulp-plumber
gulp.task('build-system', function () {
    return gulp.src(paths.dtsSrc.concat(paths.source))
        .pipe(plumber())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(changed(paths.output, {extension: '.js'}))
        .pipe(typescript(tsProject))
        .pipe(sourcemaps.write({includeContent: true}))
        .pipe(gulp.dest(paths.output));
});

// copies changed html files to the output directory
gulp.task('build-html', function () {
    return gulp.src(paths.html)
        .pipe(changed(paths.output, {extension: '.html'}))
        .pipe(gulp.dest(paths.output));
});

gulp.task('build-sass', function () {
    return gulp.src(paths.sass + 'styles.scss')
        // gulp.src(paths.sass + '**/styles.scss', {base: paths.sass})
        //gulp.src(paths.sass, {base: paths.sass})
        // .pipe(changed(paths.sass, {extension: '.scss'}))

        .pipe(sass({
            style: 'expanded',
            //includePaths: [
            //  paths.sass
            //  //   paths.jspmDir + '/github/Dogfalo/materialize@0.96.0/sass',
            //],
            includePaths: ['node_modules/foundation-sites/scss'],
            errLogToConsole: true
        }))
        .pipe(sourcemaps.init())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        //.pipe(concat('styles.css'))
        // .pipe(minifycss())
        //.pipe(rename('style.min.css'))
        .pipe(rename('styles.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.sassOutput))
});

// copies changed css files to the output directory
gulp.task('build-css', function () {
    return gulp.src(paths.css)
        .pipe(changed(paths.output, {extension: '.css'}))
        .pipe(gulp.dest(paths.output))
        .pipe(browserSync.stream());
});


// this task calls the clean task (located
// in ./clean.js), then runs the build-system
// and build-html tasks in parallel
// https://www.npmjs.com/package/gulp-run-sequence
gulp.task('build', function (callback) {
    return runSequence(
        'clean',
        ['build-system', 'build-html','build-sass', 'build-css'],
        callback
    );
});
