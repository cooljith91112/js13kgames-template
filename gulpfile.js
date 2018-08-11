'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
const zip = require('gulp-vinyl-zip').zip;
var size = require('gulp-size');

var libs = ['./node_modules/kontra/kontra.min.js', './node_modules/tinymusic/dist/TinyMusic.min.js'];
var libFolder = 'libs/';
var outputTemp = 'temp/';

gulp.task('serve', ['copylibs'], function () {

    browserSync.init({
        server: './'
    });

    gulp.watch("./**/*.js", { cwd: './' },function(){
        gulp.run('uglyfy_copy')
    }).on('change', browserSync.reload);;
    gulp.watch("./**/*.html", { cwd: './' }).on('change', browserSync.reload);

    browserSync.watch()

});

gulp.task('uglyfy_copy', function () {
    return gulp.src('src/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'));

});


gulp.task('copylibs', function () {
    return gulp
    .src(libs)
    .pipe(gulp.dest(libFolder))
});

gulp.task('zipFiles',['prepare_dist_folder'], function () {
    return gulp.src('temp/**/*.*')
    .pipe(zip('archive.zip'))
    .pipe(gulp.dest('dist'))
    .pipe(size({
        title: '### Final Archive Size => '
    }))

});

gulp.task('prepare_dist_folder', function () {
    return gulp
    .src(['libs/*','public/**/*.*','index.html'],{base: './'})
    .pipe(gulp.dest(outputTemp))
});
