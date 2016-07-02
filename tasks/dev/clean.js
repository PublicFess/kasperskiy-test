var gulp = require('gulp')
  , del = require('del');

gulp.task('dev:clean', function () {
  del([
    'dist/'
  ])
});