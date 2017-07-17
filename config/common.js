const path = require("path"),
  base = require("./base"),
  webpack = require("webpack"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

/** Base Config */
module.exports = {
  context: path.resolve(__dirname, "../sources"),
  entry: {
    app: "./app.js",
    vendor: [
      "vue", "vuex", "vue-router", "element-ui", "axios",
      "jquery", "lodash", "moment",
    ]
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  plugins: {
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
      "babel-loader": {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      "style-css-loader": {
        test: /\.css$/,
        use: [
          "style-loader", {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    }
  }
};
