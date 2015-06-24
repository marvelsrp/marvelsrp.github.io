var gulp = require('gulp'),
    lr = require('tiny-lr'),
    connect = require('gulp-connect'),
    livereload = require('gulp-livereload'),
    server = lr();

gulp.task('http-server', function() {
    connect.server({
        livereload: true,
        port: 9000
    });

    console.log('Server listening on http://localhost:9000');
});

// Запуск сервера разработки gulp watch
gulp.task('watch', function() {
    // Подключаем Livereload
    server.listen(35729, function(err) {
        if (err) return console.log(err);

        gulp.watch('js/*', function() {
            livereload(server)
        });
    });
    gulp.run('http-server');
});

gulp.task('default', ['watch']);