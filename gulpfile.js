'use strict';

var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var del = require('del');

// handling gulp errors:
// https://github.com/terinjokes/gulp-uglify/blob/master/docs/why-use-pump/README.md#why-use-pump

var paths = {
    srcServer: 'src/server/**/*.js',
    srcHTML: 'src/client/**/*.html',
    srcCSS: 'src/client/**/*.scss',
    srcJS: 'src/client/**/*.js',
    
    buildServer: 'build',
    buildClient: 'build/www',
    
    sourcemapOutput: './sourcemaps',
    
    cleanup: 'build/*'
};

gulp.task('clean', function() {
    return del([
        paths.cleanup
    ]);
});

gulp.task('copyserver', ['clean'], function () {
    return gulp.src(paths.srcServer)
        .pipe(gulp.dest(paths.buildServer));
});

gulp.task('copyhtml', ['clean'], function () {
    return gulp.src(paths.srcHTML)
        .pipe(gulp.dest(paths.buildClient));
});

//, , paths.srcJS

var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

gulp.task('sass', ['clean'], function () {
    return gulp.src(paths.srcCSS)
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write(paths.sourcemapOutput))
        .pipe(gulp.dest(paths.buildClient));
});

gulp.task('uglifyjs', ['clean'], function () {
    return gulp.src(paths.srcJS)
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write(paths.sourcemapOutput))
        .pipe(gulp.dest(paths.buildClient));
});


gulp.task('build', ['clean', 'copyserver', 'copyhtml', 'sass', 'uglifyjs']);
gulp.task('default', ['build']);

