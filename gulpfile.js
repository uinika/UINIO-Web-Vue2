const gulp = require("gulp"),
  webpack = require("webpack"),
  fs = require("fs"),
  del = require("del"),
  archiver = require("archiver"),
  nodemon = require("nodemon"),
  express = require("express"),
  moment = require("moment"),
  chalk = require("chalk"),
  base = require("./config/base.js"),
  develop = require("./config/develop.js"),
  product = require("./config/product.js"),
  webpackDevServer = require("webpack-dev-server"),
  webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware");

// base config
const Uri = base.client.uri;
const Port = base.client.port;

// config for devServer
const devServerConfig = {
  publicPath: Uri,
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
gulp.task("default", () => {
  nodemon({
    script: mockServer.path,
    watch: ["./server/*.js"],
  });
  var app = express();
  const compiler = webpack(develop);
  app.use(webpackDevMiddleware(compiler, devServerConfig));
  app.use(webpackHotMiddleware(compiler));
  app.listen(Port, () => {
    console.info(
      chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + Port + Uri)
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
gulp.task("release", () => {
  const timestamp = moment().format("YYYY-MM-DD HH.mm.ss");
  !fs.existsSync("release") ? fs.mkdirSync("release") : {};
  const output = fs.createWriteStream("./release/release " + timestamp + ".zip");
  const archive = archiver("zip", {
    prefix: "release"
  });
  archive.pipe(output);
  archive.directory("./build", false);
  archive.finalize();
});

/** gulp clean */
gulp.task("clean", () => {
  del(["./release/**/*", "./build/**/*"]);
});

/** gulp test */
// "webpack/hot/dev-server",
// "webpack-dev-server/client?http://localhost:" + Port
gulp.task("test", function () {
  nodemon({
    script: mockServer.path,
    watch: ["./server/*.js"],
  });
  const compiler = webpack(develop);
  const server = new webpackDevServer(compiler, devServerConfig);
  server.listen(Port, () => {
    console.info(
      chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + Port + Uri)
    );
  });
});
