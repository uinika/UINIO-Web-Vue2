const webpack = require("webpack"),
  nodemon = require("nodemon"),
  chalk = require("chalk"),
  base = require("../base.js"),
  develop = require("../develop.js"),
  fs = require("fs"),
  path = require("path"),
  webpackDevServer = require("webpack-dev-server");

// base config
const Uri = base.client.uri;
const Port = base.client.port;

// config for devServer
const devServerConfig = {
  // publicPath: Uri,
  port: Port,
  hot: true,
  open: true,
  host: "hank",
  // disableHostCheck: true,
  https: {
    key: fs.readFileSync(path.resolve(__dirname, "../certificate/hank-key.pem")),
    cert: fs.readFileSync(path.resolve(__dirname, "../certificate/hank.pem")),
  },
};

/** npm run test */
// "webpack/hot/dev-server",
// "webpack-dev-server/client?http://localhost:" + Port
nodemon({
  script: "./server/app.js",
  watch: ["./server/*.js"]
});
const compiler = webpack(develop);
const server = new webpackDevServer(devServerConfig, compiler);

const runServer = async () => {
  console.info(chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + Port + Uri));
  await server.start();
};

runServer();