var gulp = require('gulp');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var reactify = require('reactify');
var babelify = require('babelify');
var nodemon = require('gulp-nodemon');

gulp.task('browserify', scripts)
    .task('serve', serve);

function scripts() {
  var bundler = browserify({
    entries: ['./client/javascripts/main.js'],
    // transform: [reactify],

    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }).transform("babelify", {presets: ["es2015", "react"]});
  var watcher = watchify(bundler);

  return watcher
    .on('update', function() {
      var updateStart = Date.now();
      console.log('Updating!');
      watcher.bundle()
      .on('error', function(err) {
        console.log('Error with compiling components', err.message);
      })
      .pipe(source('bundle.js'))
      .pipe(gulp.dest('./build/'));
      console.log('Updated!', (Date.now() - updateStart) + 'ms');
    })
    .bundle()
    .on('error', function(err) {
      console.log('Error with compiling components', err.message);
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
}

function serve() {
  nodemon({
    script: 'server/server.js',
    ignore: ['client/', 'build/']
  });
}


gulp.task('default', ['browserify', 'serve']);
