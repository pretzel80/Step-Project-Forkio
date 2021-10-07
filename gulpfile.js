const gulp = require('gulp');
const del = require('del');           //очистка папок
const sass = require('gulp-sass');     //обработка scss в css
const browserSync = require('browser-sync').create();
const purgecss = require('gulp-purgecss'); // удаление всех неиспользуемых стилей
const concat = require('gulp-concat'); // обьединение файлов по маске в один
const autoprefixer = require('gulp-autoprefixer'); //добавление префиксов поддержки всех браузеров
const cleanCss = require('gulp-clean-css'); // минификация CSS
const rename = require('gulp-rename');  // перименование файла
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cache = require('gulp-cache');


function styles(){
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(concat('style.css'))
        .pipe(purgecss({
            content: ['./*.html']
        }))
        .pipe(autoprefixer({browsers: ['last 5 versions', '> 1%', 'ie 8', 'ie 7'], cascade: true
        }))
        .pipe(cleanCss({
            level: 2
        }))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('./dist/css'))
        .pipe(browserSync.stream());
}

function scripts(){
    return gulp.src(['./src/js/**/*.js', '!./src/js/scripts.js'])
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename('scripts.min.js'))
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.stream());
}

function images(){
    return gulp.src('./src/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./dist/images'))
}

function watch(){
    browserSync.init({
        server: "./"
    });
    gulp.watch('./src/scss/**/*.scss', styles);
    gulp.watch(['./src/js/**/*.js', '!./src/js/scripts.js'], scripts);
    gulp.watch('./*.html').on('change', browserSync.reload);
}

function clean(){
    return del(['./dist/**/*.*'])
}


function cleanCache(){
    return cache.clearAll()
}

gulp.task('watch', watch);
gulp.task('clean', clean);
gulp.task('cleanCache', cleanCache);
gulp.task('images', images);
gulp.task('scripts', scripts);
gulp.task('styles', styles);




gulp.task('build', gulp.series('clean', 'styles', 'scripts', 'images'));
gulp.task('dev', gulp.series('build', 'watch', 'cleanCache'));

gulp.task('default', gulp.parallel('dev'));

