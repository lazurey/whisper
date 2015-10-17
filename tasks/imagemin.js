// import gulp from 'gulp'
// import gutil from 'gulp-util'
// import imagemin from 'gulp-imagemin'
// import pngquant from 'imagemin-pngquant'
// import imageminGifsicle from 'imagemin-gifsicle'

// const TASK_NAME = 'imagemin'

// function imageminTask() {
//   return gulp.autoRegister(TASK_NAME, (config)=> {
//     gulp.src(config.src)
//         .pipe(imagemin({
//             progressive: true,
//             svgoPlugins: [{removeViewBox: false}],
//             use: [pngquant(), imageminGifsicle({interlaced: false})]
//         }))
//         .pipe(gulp.dest(config.dest));
//   })
// }

// export default gulp.task(TASK_NAME, imageminTask)
