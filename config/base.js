const path = require("path"),
  _ = require("lodash"),
  webpack = require("webpack"),
  base = require("./base"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "bundles",
  context: path.resolve(__dirname, "../sources"),
  entry: {
    app: "./app.js",
    vendor: [
      "jquery", "lodash", "moment", "element-ui",
      "vue", "vuex", "vue-router", "vue-resource",
    ]
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  plugins: {
    UglifyJsPlugin: new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true
    }),
    HtmlWebpackPlugin: new HtmlWebpackPlugin({
      favicon: "assets/favicon.ico",
      template: "index.html",
      filename: "index.html"
    }),
    CommonsChunkPlugin: new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
  },
  module: {
    rules: {
      "vue-loader": {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true
        }
      },
      "babel-loader": {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      "style-css-loader": {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      },
      "url-image-loader": {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/images/[name].[hash].[ext]"
        }
      },
      "url-font-loader": {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/fonts/[name].[hash].[ext]"
        }
      }
    }
  }
}
