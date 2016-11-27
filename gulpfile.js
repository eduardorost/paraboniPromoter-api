var gulp = require('gulp'),
    change = require('gulp-change')


gulp.task('change-mongoUrl', function() {
    var mongoUrl = process.env.MONGODB_URL || 'mongodb://localhost:27017/parabonipromoters';
    var mongoServer = '\"connectionString\": \"' + mongoUrl + '\"';

    gulp.src('./default-config.json')
        .pipe(change(function(content) {
            return content.replace(/\"connectionString\": \"([^']*)\"/, mongoServer);
        })).pipe(gulp.dest('.'));
});