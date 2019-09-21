const gulp = require('gulp');
const gulpSass = require('gulp-sass');
const gulpCleanCss = require('gulp-clean-css');
const gulpAutoPreFixer = require('gulp-autoprefixer');
const gulpRename = require('gulp-rename');
const webpack = require('webpack-stream');
const ifElse = require('gulp-if-else');
const gulpImageMin = require('gulp-imagemin');
const nodemon = require('gulp-nodemon');
const cssmini = require('gulp-minify-css');

let isDevelopment = true;

let webPackConfig = {
    output:{
        filename: 'scripts.min.js'
    },
    module:{
        rules:[
            {
                test:/\.js/,
                loader:'babel-loader',
            }
        ]
    },
    mode:isDevelopment?'development':'production',
    devtool:isDevelopment?'eval-source-map':'none'
};

gulp.task('client-script',function () {
    return gulp.src('front/js/index.js')
        .pipe(webpack(webPackConfig))
        .pipe(gulp.dest('storage/'))
});

gulp.task('sass',function () {
    return gulp
        .src('front/style/main.scss')
        .pipe(gulpSass())
        .on('error', function (err) {
            console.log(err.toString());
            this.emit('end');
        })
        .pipe(gulpCleanCss())
        .pipe(gulpAutoPreFixer([
            'last 15 versions',
            '> 1%',
            'ie 8',
            'ie 7'
        ],{
            cascade:false
        }))
        .pipe(cssmini({keepSpecialComments : 0}))
        .pipe(gulpRename('styles.min.css'))
        .pipe(gulp.dest('storage'))
});

gulp.task('img',function () {
    return gulp.src('front/img/**/*')
        .pipe(ifElse(!Boolean(isDevelopment), gulpImageMin))
        .pipe(gulp.dest('storage/img/'))
});

gulp.task('nodemon', function () {
    return nodemon({
        script: 'index.js',
        ignore: [
            'storage',
            'client',
            'node_modules/',
            'gulpfile.js',
            'package.json'
        ]
        }).on('restart', function () {
            console.log('restarted!');
        });
});

gulp.task('watcher', function () {
    gulp.watch("front/style/**/*.scss", gulp.series('sass'));
    gulp.watch('front/**/*.js',gulp.series('client-script'))
});

gulp.task('default',gulp.parallel(['client-script', 'sass', 'img', "watcher"],'nodemon'));