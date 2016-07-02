'use strict';

var gulp = require('gulp')
  , async = require('async')
  , watch = require('gulp-watch')
  , batch = require('gulp-batch')
  , runSequence = require('run-sequence')
  , server = require('browser-sync').create();

require('./clean');
require('./html');
require('./css');
require('./images');
require('./scripts');
require('./misc');

gulp.task('dev:css:watch', function() {
  gulp.start('dev:css');
  watch(['src/**/*.styl',
    'src/themes/*.json'], batch(function (events, done) {
    gulp.start('dev:css', done);
  }));
});

gulp.task('dev:html:watch', function() {
  gulp.start('dev:html');
  watch('src/**/*.jade', batch(function (events, done) {
    gulp.start('dev:html', done);
  }));
});

gulp.task('dev:js:watch', function() {
  gulp.start('dev:js');
  watch(['src/**/*.js'], batch(function (events, done) {
    gulp.start('dev:js', done);
  }));
});

gulp.task('dev:jsLibs:watch', function() {
  gulp.start('dev:jsLibs');
  watch('static/js/**/*.js', batch(function (events, done) {
    gulp.start('dev:jsLibs', done);
  }));
});

gulp.task('dev:images:watch', function() {
  gulp.start('dev:images');
  watch('static/**/*',- batch(function (events, done) {
    gulp.start('dev:images', done);
  }));
});

gulp.task('dev:misc:watch', function() {
  gulp.start('dev:misc');
  watch('static/**/*', batch(function (events, done) {
    gulp.start('dev:misc', done);
  }));
});

gulp.task('dev:watcher', function () {
  watch(['src/**', 'dist/app.js'], batch({
    limit: 100
  }, function (events, done) {
    events.on('data', server.reload).on('end', done);
  }));
});

gulp.task('server', function() {
  server.init({
    server: {
      baseDir: "./dist"
    },
    ghostMode: {
      clicks: false,
      forms: false,
      scroll: false
    }
  });
});

gulp.task('dev', function(cb) {
  runSequence(
    'dev:index',
    'dev:css:watch',
    'dev:html:watch',
    'dev:js:watch',
    'dev:jsLibs:watch',
    'dev:images:watch',
    'dev:misc:watch',
    'dev:watcher',
    'server',
    cb)
});
