var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var exec = require('child_process').exec;
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var clean = require('gulp-clean');

var htmlInsert = require('gulp-html-build').htmlInsert,
    generateView = require('gulp-html-build').generateView;

var config = {	
    src:"src/**.html",
    pubilc:"src/public/**.html",
    css:"src/styles/*.css",
    js:"src/scripts/*.js",
    img:"src/images/*.*",
    views:"src/views/*.html"
}

gulp.task('clean-css', ['contact-css'], function () {
    return gulp.src('src/css/main.min.css', {read: false})
        .pipe(clean());
});
 
gulp.task('default', ['clean-css','contact-js', 'copy-css', 'copy-scripts', 'copy-images','copy-video', 'buildSever', 'serve']);

gulp.task('serve', function() {

    browserSync.init({
        server: {
            baseDir: "build"
        }
    });

    gulp.watch(config.views, ['buildSever']);
    gulp.watch(config.pubilc, ['buildSever']);
    gulp.watch(config.src, ['buildSever']);
    gulp.watch(config.css, ['clean-css','copy-css']);
    gulp.watch(config.js, ['copy-scripts']);
    gulp.watch(config.img, ['copy-images']);
});

gulp.task("buildSever", ['views'], function(){
   	return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});

gulp.task("views", function(){
    return gulp.src('src/views/*.html')
    .pipe(generateView({dest:"src/public/"}))
});

gulp.task("copy-css", function(){
    return gulp.src('src/css/**/*')
    .pipe(gulp.dest('build/css'));
});

gulp.task("copy-images", function(){
    return gulp.src('src/images/*')
    .pipe(gulp.dest('build/images'));
});

gulp.task("copy-video", function(){
    return gulp.src('src/video/*')
    .pipe(gulp.dest('build/video'));
});

gulp.task("copy-scripts", function(){
    return gulp.src('src/scripts/**/*')
    .pipe(gulp.dest('build/scripts'));
});


gulp.task('minify-css', function() {
  return gulp.src(config.css)
    .pipe(minifyCss({compatibility: 'ie8'}))
    .pipe(concat('main.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('src/css/'));
});

gulp.task('contact-css', ['minify-css'], function() {
  return gulp.src(['src/lib/bootstrap3/css/bootstrap.min.css','src/css/main.min.css'])
    .pipe(concat('style.css'))
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(gulp.dest('src/css/'));
});

gulp.task('contact-js', function() {
  return gulp.src(['src/lib/jquery/js/jquery.min.js','src/lib/functions/*.js','src/lib/bootstrap3/js/bootstrap.min.js','src/lib/jquery/js/jquery.mousewheel.min.js'])
    .pipe(concat('lib.js'))
    .pipe(rename({
            suffix: '.min'
        }))    
    .pipe(gulp.dest('src/scripts/'));
});

var minify = require('gulp-minify');

gulp.task('compress', function() {
  gulp.src('src/lib/minify/*.js')
    .pipe(minify())
    .pipe(gulp.dest('src/lib/functions'))
});
