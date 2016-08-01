var gulp = require('gulp');
var rename = require('gulp-rename');
var plumber = require('gulp-plumber');
var notify  = require('gulp-notify');
var uglify  = require('gulp-uglify');
var babel = require("gulp-babel");

gulp.task('js', function(){
    gulp.src('./src/jquery.bem.es6')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(babel())
        .pipe(uglify())
        .pipe(rename('jquery.bem.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('debug', function(){
    gulp.src('./src/jquery.bem.es6')
        .pipe(plumber({errorHandler: notify.onError("Error: <%= error.message %>")}))
        .pipe(babel())
        .pipe(rename('jquery.bem.min.js'))
        .pipe(gulp.dest('./dist/'));
});

gulp.task('watch', function() {
  gulp.watch('./src/jquery.bem.es6', ['js'])
});

gulp.task('default', ['js']);