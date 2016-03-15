var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    'main': './main.js',
    'css': ['./less/styles.less']
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, "build/js")
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: { presets: ['es2015', 'react']}
    }, {
      test: /\.less$/,
      exclude: /node_modules/,
      loader: 'style!css!less'
    }]
  }
};