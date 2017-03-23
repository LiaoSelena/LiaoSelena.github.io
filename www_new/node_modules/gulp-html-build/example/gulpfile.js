var gulp = require('gulp');
var htmlInsert = require('gulp-html-build').htmlInsert,
    generateView = require('gulp-html-build').generateView;


gulp.task('default',['pubilc'], function() {
  return gulp.src('src/*.html')
    .pipe(htmlInsert({src:"src/public/"}))    
    .pipe(gulp.dest('build'));
});


gulp.task('pubilc', function() {
  return gulp.src('src/views/*.html')
    .pipe(generateView({dest:"src/public/"}))    
    .pipe(gulp.dest('src/public'));
});