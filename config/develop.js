const path = require("path"),
  base = require("./base"),
  common = require("./common"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = common.target;

/** Develop Config */
module.exports = {
  context: common.context,
  entry: {
    app: common.entry.app,
    vendor: common.entry.vendor,
    live: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:" + base.front
    ]
  },
  resolve: common.resolve,
  output: {
    publicPath: "",
    filename: "[name].js",
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    common.plugins.HtmlWebpackPlugin,
    common.plugins.CommonsChunkPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    })
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
          name: "assets/images/[name].[ext]"
        }
      }, {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/fonts/[name].[ext]"
        }
      }, {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader"
        }]
      }
    ]
  }
};
