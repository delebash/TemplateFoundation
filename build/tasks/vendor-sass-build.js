var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var paths = require('../paths');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var rename = require('gulp-rename');
//var concat = require('gulp-concat');
//var browserSync = require('browser-sync');
//var tsc = require('typescript');
//var notify = require("gulp-notify");
//var minifycss = require('gulp-minify-css');
//var htmlmin = require('gulp-htmlmin');
//var imagemin = require('gulp-imagemin');
//var assign = Object.assign || require('object.assign');
//var merge = require('merge2');


gulp.task('bootstrap', function () {
    return gulp.src(paths.bootstrapSass + 'bootstrap.scss')
        .pipe(sass({
            style: 'expanded',
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
        .pipe(rename('bootstrap.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.bootstrapJspm + 'css'))
});


gulp.task('foundation', function () {
    return gulp.src(paths.foundationJspm + 'styles.scss')
        .pipe(sass({
            style: 'expanded',
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
        .pipe(rename('foundation.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.foundationJspm + '/dist'))
});

