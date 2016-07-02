var gulp = require('gulp')
  , errorHandler = require('../errorHandler')();

gulp.task('dev:misc', function() {
  gulp.src('static/misc/**')
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist/static/misc'));
});
