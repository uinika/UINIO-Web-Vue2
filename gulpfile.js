const gulp = require("gulp"),
  webpack = require("webpack"),
  del = require("del"),
  moment = require("moment"),
  gulpZip = require("gulp-zip"),
  webpackConfig = require("./webpack.config.js"),
  webpackDevServer = require("webpack-dev-server");

/** gulp default */
gulp.task("default", function () {
  const compiler = webpack(webpackConfig.development);
  const server = new webpackDevServer(compiler, {
    contentBase: "./sources",
    publicPath: "/wiserv",
    watchContentBase: true,
    stats: {
      colors: true
    },
    hot: true
  });
  server.listen(8000, "127.0.0.1", function () {
    console.info(
      "Starting server on \
      http://localhost:8000/wiserv/index.html"
    );
  });
});

/** gulp build */
gulp.task("build", () => {
  console.info("production", webpackConfig.production);
  return gulp.src('./sources/app.js')
    .pipe(webpack(webpackConfig.production))
    .pipe(gulp.dest('./build/'));
});

/** gulp release */
gulp.task("release", ["build"], () => {
  const timestamp = moment().format("YYYY-MM-DD HH.mm.ss");
  const file = ("release " + timestamp + ".zip");
  gulp.src("./build/**/*")
    .pipe(gulpZip(file))
    .pipe(gulp.dest("./release"))
});

/** gulp clean */
gulp.task("clean", () => {
  del([
    "./release/**/*", "./build/**/*"
  ]);
});