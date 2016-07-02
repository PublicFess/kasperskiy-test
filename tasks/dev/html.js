var gulp = require('gulp')
  , jade = require('gulp-jade')
  , data = require('gulp-data')
  , errorHandler = require('../errorHandler')()
  , paths = ['src/**/*.jade',
    '!src/**/_*.jade'];

gulp.task('dev:html', function() {
  gulp.src(paths)
    .pipe(data(function () {
      return {
        staticUrl: '/static'
      };
    }))
    .pipe(jade({
      pretty: true
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist/templates'));
});

gulp.task('dev:index', function() {
  gulp.src('src/index.jade')
    .pipe(data(function () {
      return {
        staticUrl: '/static'
      };
    }))
    .pipe(jade({
      pretty: true
    }))
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist'));
});
