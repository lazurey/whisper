import gulp from 'gulp'

export default {
  'files': [
    {
      'src': [
        `${gulp.config('base.src')}/*.html`
      ],
      'dest': `${gulp.config('base.dist')}`
    },
    {
      'src': [
        `${gulp.config('base.src')}/vendor/**/*.*`
      ],
      'dest': `${gulp.config('base.dist')}/assets`
    }
  ]
}