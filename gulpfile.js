var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var concatCSS = require('gulp-concat-css');
var less = require('gulp-less');
var sequence = require('gulp-sequence');
var connect = require('gulp-connect');
var react = require('gulp-react');
var markdown = require('gulp-markdown-to-json');
var inject = require('gulp-inject-string');

gulp.task('clean', function (cb) {
  del([
    'build/**'
  ], cb);
});

gulp.task('scripts', function () {
  gulp.src([
    'js/vendor/react.min.js',
    'js/vendor/react-router.min.js',
    'js/vendor/reflux.min.js',
    'js/vendor/TweenMax.min.js',
    'js/vendor/ScrollToPlugin.min.js',
    'js/vendor/500px-js-sdk.js',
    'js/vendor/bloom.js',
    'js/vendor/particles.js'
  ])
    .pipe(concat('vendor.min.js'))
    //.pipe(uglify())
    .pipe(gulp.dest('build/js'));

  gulp.src([
    'js/main.js'
  ])
    .pipe(react())
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

gulp.task('markdown', function(){
  return gulp.src('posts/**/*.md')
    .pipe(gutil.buffer())
    .pipe(markdown('posts.js'))
    .pipe(inject.prepend("var Posts = "))
    .pipe(inject.append(";var posts=[];for(var post in Posts){if(Posts.hasOwnProperty(post)){posts.push(Posts[post]);}};"))
    .pipe(gulp.dest('build/js/'))
});

gulp.task('watch', function () {
  gulp.watch('posts/**.*.md', ['markdown']);
  gulp.watch('js/**/*.js', ['scripts']);
  gulp.watch('less/**/*.less', ['styles']);
});

gulp.task('server', function() {
  connect.server({port: 4000});
});

gulp.task('default', sequence('clean', ['styles', 'scripts', 'markdown', 'server'], 'watch'));
