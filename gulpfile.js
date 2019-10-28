const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();

gulp.task('css', () => {
    return gulp.src('resources/scss/main.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Style"
        }))
        .pipe(minifyCSS())
        .pipe(concat('style.css'))
        .pipe(gulp.dest('resources/css'));
});

gulp.task('watch', () => {
    gulp.watch('resources/scss/**/*.scss', gulp.series('css'));
});

gulp.task('serve', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    browserSync.watch('index.html', browserSync.reload);
    browserSync.watch('resources/css', browserSync.reload);
});

gulp.task('default', gulp.series(
    'css',
    gulp.parallel('watch', 'serve')
));