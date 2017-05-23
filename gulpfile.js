const gulp = require("gulp"),
  webpack = require("webpack"),
  del = require("del"),
  webpackConfig = require("./webpack.config.js"),
  webpackDevServer = require("webpack-dev-server");

/** gulp default */
gulp.task("default", function () {
  const compiler = webpack(webpackConfig);
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
      http://localhost:8000/bundle/index.html"
    );
  });
});

/** gulp clean */
gulp.task("clean", () => {
  del([
    "./release/**/*", "./build/**/*"
  ]);
});