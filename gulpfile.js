const del = require("del");
const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const { series } = require("gulp");

function build() {
  return gulp
    .src("./src/index.js")
    .pipe(
      babel({
        presets: ["@babel/env"]
      })
    )
    .pipe(uglify())
    .pipe(gulp.dest("dist"));
}

function clean() {
  return del(["dist"]);
}

exports.default = series(clean, build);
