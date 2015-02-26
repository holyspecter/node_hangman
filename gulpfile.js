var gulp = require('gulp');
var install = require('gulp-install');

gulp.task('default', function () {
    gulp.src(['packages.json', './bower.json'])
        .pipe(install());
});
