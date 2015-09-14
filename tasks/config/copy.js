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
    },
    {
      'src': [
        `${gulp.config('base.src')}/images/**`
      ],
      'dest': `${gulp.config('base.dist')}/assets/images`,
      'options': {
        'baseRegExp': /.+images/
      }
    },
    {
      'src': [
        `${gulp.config('base.src')}/index.hyperesources/**`
      ],
      'dest': `${gulp.config('base.dist')}/index.hyperesources`
    }
  ]
}