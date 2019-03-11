const webpack = require("webpack"),
  nodemon = require("nodemon"),
  chalk = require("chalk"),
  base = require("../base.js"),
  develop = require("../develop.js"),
  webpackDevServer = require("webpack-dev-server"),

// base config
const Uri = base.client.uri;
const Port = base.client.port;

// config for devServer
const devServerConfig = {
  publicPath: Uri,
  watchContentBase: true,
  hot: true,
  lazy: false,
  stats: {
    colors: true
  }
};

/** gulp test */
// "webpack/hot/dev-server",
// "webpack-dev-server/client?http://localhost:" + Port
nodemon({
  script: "./server/app.js",
  watch: ["./server/*.js"]
});
const compiler = webpack(develop);
const server = new webpackDevServer(compiler, devServerConfig);
server.listen(Port, () => {
  console.info(chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + Port + Uri));
});
