module.exports = {
  entry: './index-es2015.js',
  output: {
    filename: 'dist.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: [{
        loader: 'babel-loader',
        options: {
          presets: [
            ['es2015', {
              modules: false
            }]
          ],
          plugins: ['syntax-dynamic-import']
        }
      }]
    }]
  }
};