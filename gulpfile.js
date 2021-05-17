const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const imageminJpegRecompress = require('imagemin-jpeg-recompress');
const imageminPngquant = require('imagemin-pngquant');
const webp = require('gulp-webp');
const ttf2woff = require('gulp-ttf2woff');
const ttf2woff2 = require('gulp-ttf2woff2');

// Конвертация шрифтов
function fonts() {
  return gulp.src('./src/assets/fonts/source/*.ttf')
    .pipe(ttf2woff())
    .pipe(gulp.dest('./src/assets/fonts/')),
    gulp.src('./src/assets/fonts/source/*.ttf')
    .pipe(ttf2woff2())
    .pipe(gulp.dest('./src/assets/fonts/'));
}

// Подключение шрифтов в CSS
const fs = require('fs');
let project_folder = "dist";
let source_folder = "src";

let path = {
  src: {
    fonts: source_folder + "/assets/fonts/",
  }
}

function fontsStyle(params) {
  let file_content = fs.readFileSync(source_folder + '/styles/_fonts.scss');
  if (file_content == '') {
    fs.writeFile(source_folder + '/styles/_fonts.scss', '', cb);
    return fs.readdir(path.src.fonts, function (err, items) {
      if (items) {
        let c_fontname;
        for (var i = 0; i < items.length; i++) {
          let fontname = items[i].split('.');
          fontname = fontname[0];
          if (c_fontname != fontname) {
            fs.appendFile(source_folder + '/styles/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
          }
          c_fontname = fontname;
        }
      }
    })
  }
}

function cb() {

}

// Изображения
function image() {
  return gulp.src("src/assets/img/app/**/*.{jpg,png}")
    .pipe(webp({
      quality: 90
    }))
    .pipe(gulp.dest('src/assets/img/dist/')),
    gulp.src("src/assets/img/app/**/*.{jpg,png,svg,ico}")
    .pipe(imagemin([
      imagemin.gifsicle({
        interlaced: true
      }),
      imageminJpegRecompress({
        progressive: true,
        max: 80,
        min: 70
      }),
      imageminPngquant({
        quality: [0.75, 0.85]
      }),
      imagemin.svgo({
        plugins: [{
          removeViewBox: false
        }]
      })
    ]))
    .pipe(gulp.dest('src/assets/img/dist/'));
};

exports.fonts = fonts;
exports.fontsStyle = fontsStyle;
exports.image = image;