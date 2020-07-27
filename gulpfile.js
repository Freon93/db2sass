const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const rimraf = require('rimraf');

gulp.task('server', function () {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });


    gulp.watch('build/**/*').on('change', browserSync.reload);
});


gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('build/css'));
});
gulp.task('clean:css', function del(cb) {
    return rimraf('build/css', cb);
});



gulp.task('clean:images', function del(cb) {
    return rimraf('build/images', cb);
});

gulp.task('clean',
    gulp.parallel('clean:css', 'clean:images')
);



gulp.task('copy:images', function () {
    return gulp.src('source/images/**/*')
        .pipe(gulp.dest('build/images'))
});


gulp.task('watch', function () {
    gulp.watch('source/styles/main.scss', gulp.series('styles:compile'));
});

gulp.task('default', gulp.series(
    'clean',
    gulp.parallel('styles:compile', 'copy:images'),
    gulp.parallel('server', 'watch')
    )
);