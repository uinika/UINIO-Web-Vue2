const path = require("path"),
  common = require("./common"),
  webpack = require("webpack"),
  {merge} = require("webpack-merge"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin"),
  OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const target = "bundles/";

/** product config */
module.exports = merge(common, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "../output/build"),
    filename: target.concat("[name].[chunkhash].js"),
    chunkFilename: target.concat("[id].[chunkhash].js")
  },
  devtool: "source-map",
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new MiniCssExtractPlugin({
      filename: target.concat("[name].[contenthash].css")
    }),
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
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          extractCSS: true
        }
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
          name: "assets/images/[name].[hash].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          name: "assets/fonts/[name].[hash].[ext]"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../"
            }
          },
          {
            loader: "css-loader"
          },
          {
            loader: "postcss-loader"
          },
          {
            loader: "sass-loader"
          }
        ]
      }
    ]
  }
});
