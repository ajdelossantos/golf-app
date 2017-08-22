var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');

gulp.task('scss', function() {
  return gulp.src('./assets/styles/scss/site.scss')
    .pipe(sass() .on('error', sass.logError))
    .pipe(gulp.dest('./assets/styles/'))
    .pipe(browserSync.stream());
});

gulp.task('js', function() {
  return gulp.src('./scripts/dev/*.js')
    .pipe(concat('site.js'))
    .pipe(gulp.dest('./scripts/'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: './'
  });
  gulp.watch('./scripts/dev/**', ['js']).on('change', browserSync.reload);
  gulp.watch('./assets/styles/scss/**', ['scss']).on('change', browserSync.reload);
  gulp.watch('./*.html').on('change', browserSync.reload);
});


gulp.task('default', ['serve']);