const webpack = require("webpack"),
  nodemon = require("nodemon"),
  express = require("express"),
  chalk = require("chalk"),
  base = require("../base.js"),
  develop = require("../develop.js"),
  webpackDevMiddleware = require("webpack-dev-middleware"),
  webpackHotMiddleware = require("webpack-hot-middleware");

/* base config */
const Uri = base.client.uri;
const Port = base.client.port;

/* config for devServer */
const devServerConfig = {
  publicPath: Uri,
  watchContentBase: true,
  hot: true,
  lazy: false,
  stats: {
    colors: true
  }
};

/** npm start */
nodemon({
  script: "./server/app.js",
  watch: ["./server/*.js"]
});
const app = express();
const compiler = webpack(develop);
app.use(webpackDevMiddleware(compiler, devServerConfig));
app.use(webpackHotMiddleware(compiler));
app.listen(Port, () => {
  console.info(chalk.green.bgBlue("webpack-dev-server starting on http://localhost:" + Port + Uri));
});
