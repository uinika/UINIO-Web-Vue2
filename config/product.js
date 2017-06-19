const path = require("path"),
  _ = require("lodash"),
  webpack = require("webpack"),
  base = require("./base"),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: path.join(target, "[name].[contenthash].css")
});

const product = {
  context: base.context,
  entry: {
    app: base.entry.app,
    vendor: base.entry.vendor
  },
  resolve: base.resolve,
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: path.join(target, "[name].[chunkhash].js"),
    chunkFilename: path.join(target, "[id].[chunkhash].js")
  },
  devtool: "source-map",
  plugins: [
    styles,
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    base.plugins.UglifyJsPlugin,
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

module.exports = product;
