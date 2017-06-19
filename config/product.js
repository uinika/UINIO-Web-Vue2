const base = require("./base"),
  _ = require("lodash"),
  path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: path.join(target, "[name].[contenthash].css")
});

/** Product Config */
module.exports = {
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
      base.module.rules["style-css-loader"], {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/images/[name].[hash].[ext]"
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/fonts/[name].[hash].[ext]"
        }
      }, {
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
