'use strict';

const gulp = require('gulp');
const browserSync = require('browser-sync');
const uglify = require('gulp-uglify');
const zip = require('gulp-vinyl-zip').zip;
const size = require('gulp-size');
const runSequence = require('run-sequence');
const rlup = require('rollup');
const del = require('del');
const babel = require('rollup-plugin-babel');
const terser = require('rollup-plugin-terser');

const libs = ['./node_modules/kontra/kontra.min.js', './node_modules/tinymusic/dist/TinyMusic.min.js'];
const devLibs = ['./node_modules/jsfxr/jsfxr.js'];
const libFolder = 'libs/';
const outputTemp = 'temp/';

gulp.task('serve', ['copylibs', 'copylibsDev', 'transpile'], function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

    gulp.watch("src/js/**/*.js", { cwd: './' }, ['transpile', 'reload'])
    gulp.watch("./**/*.html", { cwd: './' }).on('change', browserSync.reload);

    browserSync.watch()

});

gulp.task('reload', function () {
    browserSync.reload();
});

gulp.task('delete_folders', function () {
    return del(['libs/', 'public/', 'temp/', 'dist/']).then(function (paths) {
        console.log('Deleted Files & folders ', paths);
    });
});

gulp.task('delete_map_files', function () {
    return del(['temp/**/*.map']).then(function () {

    });
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
    runSequence('delete_folders', 'copylibs', 'copylibsDev', 'transpile', 'prepare_dist_folder', 'delete_map_files', 'zipFiles');
});

gulp.task('transpile', async function () {

    const bundle = await rlup.rollup({
        input: './src/js/main.js',
        output: {
            format: 'iife'
        },
        plugins: [
            babel({
                exclude: 'node_modules/**'
            }),
            terser.terser()
        ]
    });

    await bundle.write({
        file: './public/js/main.js',
        format: 'umd',
        name: 'library',
        sourcemap: true
    });
});
