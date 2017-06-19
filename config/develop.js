const path = require("path"),
  _ = require("lodash"),
  webpack = require("webpack"),
  base = require("./base"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: "[name].css"
});

const develop = {
  context: base.context,
  entry: {
    app: base.entry.app,
    vendor: base.entry.vendor,
    live: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8000"
    ]
  },
  resolve: base.resolve,
  output: {
    publicPath: "",
    filename: "[name].js",
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    styles,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    }),
    base.plugins.HtmlWebpackPlugin,
    base.plugins.CommonsChunkPlugin,
  ],
  module: {
    rules: [
      base.module.rules["vue-loader"],
      base.module.rules["babel-loader"],
      base.module.rules["style-css-loader"],
      base.module.rules["url-image-loader"],
      base.module.rules["url-font-loader"],
      {
        test: /\.less$/,
        use: styles.extract({
          use: [{
            loader: "css-loader"
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  }
};

module.exports = develop;
