// module.exports = {
//   module: {
//     rules: [{
//       test: /\.css$/,
//       use: ['style-loader', 'css-loader']
//     }]
//   }
// }

var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
  module: {
    rules: [{
      test: /\.css$/,
      use: ExtractTextPlugin.extract({
        use: 'css-loader'
      })
    }]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
  ]
}