var gulp = require('gulp');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCSS = require('gulp-concat-css');
var less = require('gulp-less');
var sequence = require('gulp-sequence');
var connect = require('gulp-connect');

gulp.task('clean', function (cb) {
  del([
    'build/**'
  ], cb);
});

gulp.task('scripts', function () {
  gulp.src([
    'js/vendor/jquery-1.10.2.min.js',
    'js/vendor/react.min.js',
    'js/vendor/JSXTransformer.js',
    'js/vendor/react-router.min.js',
    'js/vendor/reflux.min.js',
    'js/vendor/TweenMax.min.js',
    'js/vendor/ScrollToPlugin.min.js',
    'js/vendor/500px-js-sdk.js',
    'js/vendor/bloom.js'
  ])
    .pipe(concat('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));

  gulp.src([
    'js/main.js'
  ])
    .pipe(concat('non-vendor.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('build/js'));
});

gulp.task('less', function() {
  return gulp.src('less/**/*.less')
    .pipe(less())
    .pipe(gulp.dest('css'));
});

gulp.task('styles', ['less'], function () {
  gulp.src([
    'css/normalize.css',
    'css/main.css',
    'css/global.css'
  ])
    .pipe(concatCSS("bundle.css"))
    .pipe(gulp.dest('build/styles'));

  gulp.src([
    'fonts/icomoon.eot',
    'fonts/icomoon.svg',
    'fonts/icomoon.ttf',
    'fonts/icomoon.woff'
  ])
    .pipe(gulp.dest('build/fonts'));
});

gulp.task('watch', function () {
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('less/**/*.less', ['styles']);
});

gulp.task('server', function() {
  connect.server({port: 4000});
});

gulp.task('default', sequence('clean', ['styles', 'scripts', 'server'], 'watch'));
