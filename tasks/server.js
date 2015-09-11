import gulp from 'gulp'
import browserSync from 'browser-sync'

const TASK_NAME = 'server'

function serverOnce(fileConf) {
  browserSync(fileConf.options)
}

function server() {
  gulp.autoRegister(TASK_NAME, serverOnce, (config)=> {
    if (process.env.NODE_ENV !== 'production') {
      gulp.watch(config.src)
        .on('change', browserSync.reload)
    }
  })
}

export default gulp.task(TASK_NAME, server)