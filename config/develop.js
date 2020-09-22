const path = require("path"),
  common = require("./common"),
  webpack = require("webpack"),
  { merge } = require("webpack-merge");

/** develop config */
module.exports = merge(common, {
  mode: "development",
  entry: {
    hot: ["webpack-hot-middleware/client"]
  },
  output: {
    publicPath: "",
    filename: "[name].js"
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {
    namedModules: true,
    noEmitOnErrors: true,
    splitChunks: {
      chunks: "all"
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      {
        resourceQuery: /blockType=i18n/,
        type: "javascript/auto",
        loader: "@kazupon/vue-i18n-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/images/[name].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/fonts/[name].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
});
