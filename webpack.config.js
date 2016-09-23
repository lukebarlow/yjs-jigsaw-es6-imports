var path = require('path')
var webpack = require('webpack')

module.exports = {
  devtool: 'source-map',
  entry: [
    './src/'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'jigsaw.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.IgnorePlugin(/SpecHelper/),
    new webpack.IgnorePlugin(/.*\.md/),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: [ 'babel' ],
        exclude: /node_modules/
      }
    ]
  }
}