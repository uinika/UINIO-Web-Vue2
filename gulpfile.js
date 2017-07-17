const gulp = require("gulp"),
  webpack = require("webpack"),
  del = require("del"),
  archiver = require("archiver"),
  express = require("express"),
  moment = require("moment"),
  chalk = require("chalk"),
  nodemon = require("nodemon"),
  base = require("./config/base.js"),
  develop = require("./config/develop.js"),
  product = require("./config/product.js"),
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

// config for express mock server
const mockServer = {
  path: "./server/app.js"
};

/** gulp default */
gulp.task("default", function () {
  nodemon({
    script: mockServer.path,
    watch: ["./server/*.js"],
  });
  const compiler = webpack(develop);
  const server = new webpackDevServer(compiler, devServer);
  server.listen(base.front, "127.0.0.1", () => {
    console.info(
      chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + base.front + "/wiserv/index.html")
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
  app.listen(base.front, () => {
    console.info(
      "Starting express on \
      http://localhost:" + base.front + "/wiserv/index.html"
    );
  });
});

/** gulp test */
gulp.task("test", () => {

});
