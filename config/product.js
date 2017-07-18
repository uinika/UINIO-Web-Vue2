const path = require("path"),
  base = require("./base"),
  common = require("./common"),
  webpack = require("webpack"),
  webpackMerge = require("webpack-merge"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin"),
  ExtractTextPlugin = require("extract-text-webpack-plugin");

const target = base.target;

const styles = new ExtractTextPlugin({
  filename: path.join(target, "[name].[contenthash].css")
});

/** Product Config */
module.exports = webpackMerge(common, {
  output: {
    path: path.resolve(__dirname, "../build"),
    filename: path.join(target, "[name].[chunkhash].js"),
    chunkFilename: path.join(target, "[id].[chunkhash].js")
  },
  devtool: "source-map",
  plugins: [
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
    styles,
    new OptimizeCssAssetsPlugin({
      cssProcessor: require("cssnano"),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    })
  ],
  module: {
    rules: [{
      test: /\.vue$/,
      loader: "vue-loader",
      options: {
        extractCSS: true
      }
    }, {
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
      test: /\.scss$/,
      use: styles.extract({
        use: [{
          loader: "css-loader",
        }, {
          loader: "sass-loader"
        }],
        fallback: "style-loader"
      })
    }]
  }
});
