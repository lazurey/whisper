import gulp from 'gulp';
import gutil from 'gulp-util';
import watcher from './tasks/libs/watcher';

import clean from './tasks/clean'
import browserify from './tasks/browserify'
import copy from './tasks/copy'
import stylus from './tasks/stylus'

import build from './tasks/build'

build.setOptions({
  taskQueue: [
    'clean',
    'copy',
    'stylus',
    'browserify'
  ]
});

if (gutil.env.prod) {
  process.env.NODE_ENV = 'production';
}

if (gutil.env.watch) {
  watcher.setWatcher();
}

gulp.task('dev', ()=> {
  watcher.setWatcher();
  gulp.start(['build']);
});

gulp.task('default', ['build']);
