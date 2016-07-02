var gulp = require('gulp')
  , imagemin = require('gulp-imagemin')
  , errorHandler = require('../errorHandler')();

gulp.task('dev:images', function() {
  gulp.src('static/img/**/*')
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist/static/img'));
});
