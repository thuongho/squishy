'use strict';

(function () {

    var gulp = require('gulp'),
        nodemon = require('gulp-nodemon'),
        jshint = require('gulp-jshint'),
        gulpMocha = require('gulp-mocha');

    gulp.task('lint', function () {
        gulp.src('./**/*.js')
            .pipe(jshint());
    });

    gulp.task('test', function () {
        gulp.src('tests/*.js', {read: false})
            .pipe(gulpMocha({reporter: 'nyan'}));
    });

    gulp.task('default', function () {
        nodemon({
            script: 'server.js',
            ext: 'js',
            env: {
                PORT: 8000
            },
            ignore: ['./node_modules/**']
        })
            .on('restart', function () {
                console.log('Restarting...');
            });
    });

}());