import gulp from 'gulp'
import path from 'path'
import gutil from 'gulp-util'
import requireDir from 'require-dir'
import gulpTaskConfig from './tasks/libs/gulp-task-config'

gulpTaskConfig(gulp)

requireDir('./tasks')

gulp.config('base.src', './src')
gulp.config('base.dist', './public')

gulp.config('tasks', requireDir('./tasks/config'))

gulp.config('tasks.build', {
  taskQueue: [
    'clean',
    'copy',
    'imagemin',
    'stylus',
    'browserify'
  ]
})

gulp.task('dev', () => {
  gulp.config(gulp.DEV_MODE, true)
  gulp.start(['build', 'server'])
})

gulp.task("heroku:production", ['build']);

gulp.task('default', ['build'])