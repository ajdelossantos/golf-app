var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var cleanCss = require('gulp-clean-css');
var htmlReplace = require('gulp-html-replace');

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

// Build tasks
gulp.task('buildJs', function() {
  gulp.src('./scripts/*.js')
  .pipe(concat('site.min.js'))
  .pipe(uglify())
  .pipe(gulp.dest('./dist/scripts/'));
});

gulp.task('buildCss', function() {
  gulp.src('./assets/styles/scss/site.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(concat('site.min.css'))
    .pipe(cleanCss())
    .pipe(gulp.dest('./dist/assets/styles/'));
});

gulp.task('buildVendorCss', function() {
  gulp.src('./assets/styles/vendor/**')
  .pipe(gulp.dest('./dist/assets/styles/vendor/'));
});

gulp.task('replace', function() {
  gulp.src('./index.html')
  .pipe(htmlReplace({
    'js': './scripts/site.min.js',
    'css': './assets/styles/site.min.css',
  }))
  .pipe(gulp.dest('./dist/'));
});

gulp.task('default', ['serve']);
gulp.task('build', ['replace', 'buildJs', 'buildCss', 'buildVendorCss']);
