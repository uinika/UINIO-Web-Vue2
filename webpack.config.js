const path = require("path"),
  webpack = require("webpack"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const extractSass = new ExtractTextPlugin({
  filename: "styles.css"
});

module.exports = {
  context: path.resolve(__dirname, "sources"),
  entry: {
    app: "./app.js",
    webpack: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8000/"
    ],
    vendor: ["jquery", "lodash", "moment"]
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build/bundles")
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    extractSass,
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: "vendor"
    })
  ],
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue$": "vue/dist/vue.esm.js"
    }
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader",
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.scss$/,
      use: extractSass.extract({
        use: [{
          loader: "css-loader"
        }, {
          loader: "sass-loader"
        }],
        fallback: "style-loader"
      })
    }]
  }
};