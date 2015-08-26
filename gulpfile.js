// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var livereload = require('gulp-livereload');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('client/scripts/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
    return gulp.src('client/styles/style.scss')
        .pipe(sass())
        .pipe(gulp.dest('server/public/assets/styles'))
        .pipe(livereload());
});

// Concatenate & Minify JS
gulp.task('scripts', function() {
    return gulp.src('client/scripts/*.js')
        .pipe(concat('all.js'))
        .pipe(rename('project.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('server/public/assets/scripts'));
});

// Copy Client Views to Public Assets
gulp.task('views', function() {
   return gulp.src('client/views/*.html')
       .pipe(gulp.dest('server/public/assets/views'))
       .pipe(livereload());
});

// Copy Node Modules to Public Vendors
gulp.task('copy-vendors', function() {
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(gulp.dest('server/public/vendors/bootstrap'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('client/scripts/*.js', ['lint', 'scripts']);
    gulp.watch('client/styles/*.scss', ['sass']);
    gulp.watch('client/views/*.html', ['views']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'views', 'copy-vendors', 'watch']);

