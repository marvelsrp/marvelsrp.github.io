var gulp = require('gulp');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var templateCache = require('gulp-angular-templatecache');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var flatten = require('gulp-flatten');

var connect = require('gulp-connect');
var open = require('gulp-open');

var paths = {
  sass_vendors: ['./app/vendors.scss'],
  sass_app: ['./app/app.scss', './app/controllers/**/*.scss'],
  templatecache: ['./app/controllers/**/*.html'],
  js_vendors: [
    './bower_components/angular/angular.js'
  ],
  js_app: [
    './app/**/**/*.js',
    './app/**/*.js',
    './app/app.js'
  ],
  index: './app/app.html'
};
gulp.task('default', ['watch']);
gulp.task('app', ['sass_app', 'js_app', 'index']);
gulp.task('vendors', ['sass_vendors', 'js_vendors']);
gulp.task('watch', ['connect'], function () {
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.sass_app, ['sass_app']);
  gulp.watch(paths.templatecache, ['js_app']);
  gulp.watch(paths.js_app, ['js_app']);
});

gulp.task('index', function () {

  return gulp.src(paths.index)
    .pipe(rename({basename: "index"}))
    .pipe(gulp.dest("./www", {overwrite: true}))
    .pipe(connect.reload());

});

gulp.task('sass_vendors', function () {

  gulp.src(paths.sass_vendors)
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({basename: "vendors", extname: '.min.css'}))
    .pipe(gulp.dest('./www/css', {overwrite: true}))
    .pipe(connect.reload());
});

gulp.task('sass_app', function () {

  gulp.src('./app/app.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({
      errLogToConsole: true,
      outputStyle: 'compressed'
    }))
    .pipe(sourcemaps.write())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest('./www/css', {overwrite: true}))
    .pipe(connect.reload());
});

gulp.task('js_app_1', function (done) {

  //HTML templates to cache /tmp/templates.js
  gulp.src(paths.templatecache)
    .pipe(templateCache({
      standalone: true,
      module: 'app.templates'
    }))
    .pipe(gulp.dest('./tmp/js', {overwrite: true}))
    .on('end', done);
});
gulp.task('js_app_2', function (done) {

  //Application to app.js
  gulp.src(paths.js_app)
    .pipe(concat('app.js'))
    .pipe(ngAnnotate({
      single_quotes: true
    }))
    .pipe(gulp.dest('./tmp/js', {overwrite: true}))
    .on('end', done);
});

gulp.task('js_app', ['js_app_1', 'js_app_2'], function (done) {
  //Concat and uglify js to app.min.js
  gulp.src(['./tmp/js/app.js', './tmp/js/templates.js'])
    .pipe(concat('app.js'))
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest('./www/js', {overwrite: true}))
    .pipe(connect.reload())
    .on('end', done);
});
gulp.task('js_vendors_1', function (done) {
  console.log(paths.js_vendors);
  //Concat to vendors.js
  gulp.src(paths.js_vendors)
    .pipe(concat('vendors.js'))
    .pipe(gulp.dest('./tmp/js'))
    .on('end', done);

});
gulp.task('js_vendors', ['js_vendors_1'], function (done) {
  //Uglify js to vendors.min.js
  gulp.src('./tmp/js/vendors.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(rename({basename: "vendors", extname: '.min.js'}))
    .pipe(gulp.dest('./www/js', {overwrite: true}))
    .pipe(connect.reload())
    .on('end', done);
});


gulp.task('connect', ['app', 'vendors'], function () {
  var port = 8002;
  connect.server({
    livereload: true,
    port: port,
    root: './www'
  });
  gulp.src('./')
    .pipe(open({uri: 'http://localhost:' + port}));
});
