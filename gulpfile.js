const gulp = require("gulp"),
  webpack = require("webpack"),
  del = require("del");
  webpackConfig = require("./webpack.config.js"),
  webpackDevServer = require("webpack-dev-server");

/** gulp default */
gulp.task("default", function () {
  const compiler = webpack(webpackConfig);
  const server = new webpackDevServer(compiler, {
    contentBase: "./sources",
    publicPath: "/build/bundles/",
    watchContentBase: true,
    stats: {
      colors: true
    }
  });
  server.listen(8000, "127.0.0.1", function () {
    console.log("Starting server on http://localhost:8000");
  });
});

/** gulp clean */
gulp.task("clean", () => {
  del([
    "./release/**/*", "./build/**/*"
  ]);
});