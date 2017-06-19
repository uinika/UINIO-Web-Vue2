const base = require("./base"),
  _ = require("lodash"),
  path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: "[name].css"
});

/** Develop Config */
module.exports = {
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
    base.plugins.HtmlWebpackPlugin,
    base.plugins.CommonsChunkPlugin,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"development"'
      }
    }),
    styles
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
