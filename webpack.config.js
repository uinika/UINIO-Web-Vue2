var path = require("path");

module.exports = {
  context: path.resolve(__dirname, "sources"),
  entry: ["./app.js", 'webpack-dev-server/client?http://localhost:8000/', 'webpack/hot/dev-server'],
  output: {
    filename: "scripts.js",
    path: path.resolve(__dirname, "sources/bundles")
  },
  module: {
    rules: [{
      test: /\.vue$/,
      loader: 'vue-loader',
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader"
      }, {
        loader: "sass-loader"
      }]
    }]
  }
};