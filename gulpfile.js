const {src, dest, series, watch, parallel} = require('gulp')
const sass = require('gulp-sass')
// const gsap = require('gsap')
cleanCSS = require('gulp-clean-css')
const csso = require('gulp-csso')
// const include = require('gulp-file-include')
// const htmlmin = require('gulp-htmlmin')
const del = require('del')
// const uglify = require('gulp-uglify-es').default
const concat = require('gulp-concat')
const autoprefixer = require('gulp-autoprefixer')
const browserSync = require('browser-sync').create()
// const sync = require('browser-sync').create()


function html() {
    return src('src/**.html')
        .pipe(browserSync.reload({ stream: true }))
        
}

function scss() {
    return src('app/sass/**/*.sass')
    .pipe(sass())
    .pipe(autoprefixer({
        cascade: 'true'
    }))
    .pipe(csso())
    .pipe(concat('style.css'))
    .pipe(dest('app/sass'))
    .pipe(browserSync.reload({ stream: true }))
}
function css() {
    return src(['app/libs/bootstrap/bootstrap.css', 'app/sass/style.css'])
    .pipe(concat('index.css'))
    .pipe(cleanCSS())
    .pipe(dest('app/css'))
    .pipe(browserSync.reload({ stream: true }))
}
function js() {
    return src('app/app.js')
    .pipe(browserSync.reload({ stream: true }))
}

function clear() {
    return del('dist/css')
}

function serve() {
    browserSync.init({
        server: 'app',
        online: true,
        host: "192.168.0.16"
    })
    watch('app/index.html', series(html)).on('change', browserSync.reload);
    watch('app/sass/**/*.sass', series(scss)).on('change', browserSync.reload);
    watch('app/sass/**/*.css', series(css)).on('change', browserSync.reload);
    watch('app/app.js', series(js)).on('change', browserSync.reload);
}


exports.build = series(clear, scss,  js, html)
exports.serve = series(clear, scss, css,  js, html, serve)
exports.default = series(clear, scss, css, js, html, serve)