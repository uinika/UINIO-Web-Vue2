const path = require("path"),
  webpack = require("webpack"),
  vueLoaderPlugin = require("vue-loader/lib/plugin"),
  HtmlWebpackPlugin = require("html-webpack-plugin");

/** common config */
module.exports = {
  context: path.resolve(__dirname, "../sources"),
  entry: {
    app: "./app.js",
    vendor: ["vue", "vuex", "vue-router", "axios", "rxjs", "lodash", "moment"]
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      vue$: "vue/dist/vue.esm.js"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon: "assets/favicon.ico",
      template: "index.html",
      filename: "index.html"
    }),
    new vueLoaderPlugin()
  ],
  optimization: {
    runtimeChunk: "single",
    concatenateModules: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          "postcss-loader"
        ]
      }
    ]
  }
};
