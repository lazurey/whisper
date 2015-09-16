import gulp from 'gulp'

export default {
  'src': [
    `${gulp.config('base.src')}/images/*`
  ],
  'dest': `${gulp.config('base.dist')}/assets/images`
}