let gulp = require('gulp');
let gulpClean = require('gulp-clean');
let gulpSass = require('gulp-sass');
let gulpCleanCss = require('gulp-clean-css');
let gulpAutoPreFixer = require('gulp-autoprefixer');
let gulpRename = require('gulp-rename');
let webpack = require('webpack-stream');
let ifElse = require('gulp-if-else');
let gulpImageMin = require('gulp-imagemin');
let nodemon = require('gulp-nodemon');

let isDevelopment = false;
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
    return gulp.src('src/client/js/index.js')
        .pipe(webpack(webPackConfig))
        .pipe(gulp.dest('build/'))
});

gulp.task('sass',function () {
    return gulp
        .src('src/client/style/main.scss')
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
        .pipe(gulp.dest('build'))
});

gulp.task('cleanFolder',function () {
    return gulp.src('build/*',{read:false})
        .pipe(gulpClean({force:true}))
});

gulp.task('img',function () {
    return gulp.src('src/client/img/**/*')
        .pipe(ifElse(!Boolean(isDevelopment), gulpImageMin))
        .pipe(gulp.dest('build/img/'))
});

gulp.task('nodemon', function () {
    nodemon({
        script: 'src/index.js'
    }).on('restart', function(){
        console.log('restarted');
    })
});

gulp.task('watcher', function () {
    gulp.watch("src/client/style/**/*.scss", gulp.series('sass'));
    gulp.watch('src/client/**/*.js',gulp.series('client-script'))
});

gulp.task('default',gulp.series('cleanFolder', 'client-script', 'sass', 'img','nodemon'));