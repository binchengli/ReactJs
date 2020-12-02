console.log("gulpfile start------------------->");
var gulp = require('gulp');
var concat = require('gulp-concat');
var uglifycss = require('gulp-uglifycss');
var cleanCss = require('gulp-clean-css'); 

// var minimist = require('minimist');
// var ENV = minimist(process.argv.slice(2));

gulp.task('copyGeneralSrc', function() {

    var src_root_dir = 'src';

    gulp.src([src_root_dir+'/css/index.css'])
        .pipe(concat('index.min.css'))
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));

    /* self definition */
    gulp.src([src_root_dir+'/index.html'])
        .pipe(gulp.dest('dist'));
    gulp.src([src_root_dir+'/img/*'])
        .pipe(gulp.dest('dist/img'));
    gulp.src([src_root_dir+'/icon/*'])
        .pipe(gulp.dest('dist/icon'));
    gulp.src([src_root_dir+'/flag/*'])
        .pipe(gulp.dest('dist/flag'));
    gulp.src([src_root_dir+'/file/*'])
        .pipe(gulp.dest('dist/file/'));
});

gulp.task('copyBasicModules', function() {
    /* bootstrap */
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css'])
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
    gulp.src(['node_modules/bootstrap/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));
    
    /* font-awesome */
    gulp.src(['node_modules/font-awesome/css/font-awesome.min.css'])
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
    gulp.src(['node_modules/font-awesome/fonts/*'])
        .pipe(gulp.dest('dist/fonts'));


    /* icheck */
    gulp.src(['node_modules/icheck/skins/all.css'])
        .pipe(concat('icheck.min.css'))
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css/icheck_skins'));
    gulp.src(['node_modules/icheck/skins/**/*.png'])
        .pipe(gulp.dest('dist/css/icheck_skins'));
});

gulp.task('copyAdditionalModules', function() {

    /* react-bootstrap-switch */
    gulp.src(['node_modules/react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.min.css'])
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));

    /* react-rangeslider */
    gulp.src(['node_modules/react-rangeslider/umd/rangeslider.min.css'])
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));

    /* react-credit-cards */
    gulp.src(['node_modules/react-credit-cards/lib/styles-compiled.css'])
        .pipe(concat('react-credit-cards.min.css'))
        .pipe(uglifycss())
        .pipe(cleanCss())
        .pipe(gulp.dest('dist/css'));
});


gulp.task('default', ['copyGeneralSrc', 'copyBasicModules', 'copyAdditionalModules']);
console.log("------------------->gulpfile");