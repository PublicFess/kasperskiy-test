var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , errorHandler = require('../errorHandler')();

gulp.task('dev:js', function() {
  gulp.src(['src/app.js'])
    .pipe(browserify())
    .on('error', errorHandler)
    .pipe(gulp.dest('./dist'));
});

gulp.task('dev:jsLibs', function() {
  gulp.src('static/js/**/*.js')
    .pipe(gulp.dest('./dist/static/js'));
});
