'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');
var uglify = require('gulp-uglify');
var zip = require('gulp-vinyl-zip').zip;
var size = require('gulp-size');
var runSequence = require('run-sequence');
let rollup = require('rollup-stream');

var source = require('vinyl-source-stream');
var libs = ['./node_modules/kontra/kontra.min.js', './node_modules/tinymusic/dist/TinyMusic.min.js'];
var devLibs = ['./node_modules/jsfxr/jsfxr.js'];
var libFolder = 'libs/';
var outputTemp = 'temp/';

gulp.task('serve', ['copylibs', 'copylibsDev', 'uglyfy_copy'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/js/**/*.js", { cwd: './' }, ['uglyfy_copy', 'reload'])
    gulp.watch("./**/*.html", { cwd: './' }).on('change', browserSync.reload);

    browserSync.watch()

});

gulp.task('reload', function () {
    browserSync.reload();
});


gulp.task('uglyfy_copy', function () {
    return rollup({
        "format": "iife",
        input: './src/js/main.js'
    })
    .pipe(source('main.js'))
        .pipe(gulp.dest('public/js'));

});


gulp.task('copylibs', function () {
    return gulp
        .src(libs)
        .pipe(gulp.dest(libFolder))
});

gulp.task('copylibsDev', function () {
    return gulp
        .src(devLibs)
        .pipe(uglify())
        .pipe(gulp.dest(libFolder))
});

gulp.task('zipFiles', function () {
    return gulp.src('temp/**/*.*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('dist'))
        .pipe(size({
            title: '### Final Archive Size => '
        }))

});

gulp.task('prepare_dist_folder', function () {
    return gulp
        .src(['libs/*', 'public/**/*.*', 'index.html'], { base: './' })
        .pipe(gulp.dest(outputTemp))
});

gulp.task('release', function () {
    runSequence('copylibs', 'copylibsDev', 'uglyfy_copy', 'prepare_dist_folder', 'zipFiles');
});
