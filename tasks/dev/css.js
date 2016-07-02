var gulp = require('gulp')
  , stylus = require('gulp-stylus')
  , autoprefixer = require('gulp-autoprefixer')
  , nib = require('nib')
  , reload = require('browser-sync').reload
  , errorHandler = require('../errorHandler')();

gulp.task('dev:css', function() {
  gulp.src(['src/css/*.styl',
    '!src/css/_*.styl'])
    .pipe(stylus({
      'include css': true,
      use: nib()
    }).on('error', errorHandler))
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }).on('error', errorHandler))
    .pipe(gulp.dest('./dist/'));
});
