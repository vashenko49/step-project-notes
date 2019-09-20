let gulp = require('gulp');
let gulpSass = require('gulp-sass');
let gulpCleanCss = require('gulp-clean-css');
let gulpAutoPreFixer = require('gulp-autoprefixer');
let gulpRename = require('gulp-rename');
let webpack = require('webpack-stream');
let ifElse = require('gulp-if-else');
let gulpImageMin = require('gulp-imagemin');
let nodemon = require('gulp-nodemon');

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
            cascade:true
        }))
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