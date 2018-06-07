const path = require('path'),
  common = require('./common'),
  webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const target = 'bundles';

const extractTextPlugin = new ExtractTextPlugin({
  filename: path.join(target, '[name].[contenthash].css')
});

/** product config */
module.exports = webpackMerge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: path.join(target, '[name].[chunkhash].js'),
    chunkFilename: path.join(target, '[id].[chunkhash].js')
  },
  devtool: 'source-map',
  optimization: {
    minimize: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    extractTextPlugin,
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
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
      loader: 'vue-loader',
      options: {
        extractCSS: true
      }
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/images/[name].[hash].[ext]'
      }
    }, {
      test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
      loader: 'url-loader',
      options: {
        limit: 10000,
        name: 'assets/fonts/[name].[hash].[ext]'
      }
    }, {
      test: /\.scss$/,
      use: extractTextPlugin.extract({
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'sass-loader'
        }],
        fallback: 'style-loader'
      })
    }]
  }
});
