'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const zip = require('gulp-vinyl-zip').zip;
const size = require('gulp-size');
const runSequence = require('run-sequence');
const rollup = require('rollup-stream');
const del = require('del');


const source = require('vinyl-source-stream');
const libs = ['./node_modules/kontra/kontra.min.js', './node_modules/tinymusic/dist/TinyMusic.min.js'];
const devLibs = ['./node_modules/jsfxr/jsfxr.js'];
const libFolder = 'libs/';
const outputTemp = 'temp/';

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

gulp.task('delete_folders', function(){
    return del(['libs/','public/','temp/','dist/']).then(function(paths){
        console.log('Deleted Files & folders ',paths);
    });
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
    runSequence('delete_folders','copylibs', 'copylibsDev', 'uglyfy_copy', 'prepare_dist_folder', 'zipFiles');
});
