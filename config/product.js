const path = require("path"),
  base = require("./base"),
  common = require("./common"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: path.join(target, "[name].[contenthash].css")
});

/** Product Config */
module.exports = {
  context: common.context,
  entry: {
    app: common.entry.app,
    vendor: common.entry.vendor
  },
  resolve: common.resolve,
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: path.join(target, "[name].[chunkhash].js"),
    chunkFilename: path.join(target, "[id].[chunkhash].js")
  },
  devtool: "source-map",
  plugins: [
    common.plugins.HtmlWebpackPlugin,
    common.plugins.CommonsChunkPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    styles
  ],
  module: {
    rules: [
      common.module.rules["vue-loader"],
      common.module.rules["babel-loader"],
      common.module.rules["style-css-loader"], {
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
            loader: "css-loader",
            options: {
              minimize: true
            }
          }, {
            loader: "less-loader"
          }],
          fallback: "style-loader"
        })
      }
    ]
  }
};
