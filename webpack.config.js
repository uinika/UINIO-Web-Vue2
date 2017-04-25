var path = require('path');

module.exports = function (env) {
  return {
    entry: {
      main: './app/index.js',
      vendor: 'moment'
    },
    output: {
      filename: '[name].[chunkhash].js',
      path: path.resolve(__dirname, 'dist')
    }
  }
}