const path = require("path"),
  webpack = require("webpack"),
  _ = require("lodash"),
  Merge = require('webpack-merge'),
  HtmlWebpackPlugin = require("html-webpack-plugin"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const styles = new ExtractTextPlugin({
  filename: "styles.css"
});

const development = {
  context: path.resolve(__dirname, "sources"),
  entry: {
    app: "./app.js",
    live: [
      "webpack/hot/dev-server",
      "webpack-dev-server/client?http://localhost:8000/wiserv"
    ],
    vendor: [
      "jquery", "lodash", "moment", "element-ui",
      "vue", "vuex", "vue-router", "vue-resource",
    ]
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build")
  },
  devtool: "cheap-module-eval-source-map",
  plugins: [
    styles,
    new HtmlWebpackPlugin({
      template: "index.html",
      filename: "index.html"
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"]
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
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.scss$/,
      use: styles.extract({
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

const production = {
  context: path.resolve(__dirname, "sources"),
  entry: {
    app: "./app.js",
    vendor: [
      "jquery", "lodash", "moment", "element-ui",
      "vue", "vuex", "vue-router", "vue-resource",
    ]
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "build")
  },
  plugins: [
    styles,
    new webpack.optimize.CommonsChunkPlugin({
      name: ["vendor", "manifest"]
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
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: "url-loader",
    }, {
      test: /\.scss$/,
      use: styles.extract({
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

module.exports = {
  production,
  development
};