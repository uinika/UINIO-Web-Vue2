const gulp = require("gulp"),
  webpack = require("webpack"),
  del = require("del"),
  express = require("express"),
  moment = require("moment"),
  gulpZip = require("gulp-zip"),
  chalk = require("chalk"),
  develop = require("./config/develop.js"),
  product = require("./config/product.js"),
  merge = require('webpack-merge'),
  webpackDevServer = require("webpack-dev-server"),
  webpackDevMiddleware = require("webpack-dev-middleware");

// config for devServer
const devServer = {
  publicPath: "/wiserv",
  contentBase: "./sources",
  watchContentBase: true,
  hot: true,
  lazy: false,
  stats: {
    colors: true
  },
};

/** gulp default */
gulp.task("default", function () {
  const compiler = webpack(develop);
  const server = new webpackDevServer(compiler, devServer);
  server.listen(8000, "127.0.0.1", () => {
    console.info(
      chalk.blue.bgGreen("Starting webpackDevServer on http://localhost:8000/wiserv/index.html")
    );
  });
});

/** gulp build */
gulp.task("build", () => {
  const compiler = webpack(product);
  compiler.run((err, stats) => {
    if (err) {
      console.error(err);
      return;
    };
    console.info(stats.toString({
      chunks: false,
      colors: true
    }));
  });
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

/** gulp express */
gulp.task("middleware", () => {
  var app = express();
  const compiler = webpack(webpackConfig.development);
  app.use(webpackDevMiddleware(compiler, devServer));
  app.listen(5000, () => {
    console.info(
      "Starting express on \
      http://localhost:5000/wiserv/index.html"
    );
  });
});

/** gulp test */
gulp.task("test", () => {

});
