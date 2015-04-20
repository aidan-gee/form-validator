var gulp = require('gulp');
var browser = require('browser-sync');
var uglify = require('gulp-uglify');
 
gulp.task('compress', function() {
  gulp.src('form-validator/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('lib/js'))
});

gulp.task('browsersync', ['html', 'js', 'css'], function() {
	browser({
	    port: 8080,
	    server: {
	      baseDir: "./"
	    }
	});
});

gulp.task('html', function () {
    gulp.watch("./*.html", browser.reload);
});
gulp.task('js', function () {
    gulp.watch(["**/*.js", "lib/js/*.js"], browser.reload);
});
gulp.task('css', function () {
    gulp.watch(["**/*.css"], browser.reload);
});

gulp.task('default', ['browsersync']);