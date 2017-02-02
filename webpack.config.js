'use strict';
var path = require("path");
var webpack = require('webpack');

module.exports = {
  entry: {
      background: "./background/index.js",
      content: "./content/index.js",
      options: "./options/index.js",
      popup: "./popup/index.js"
  },
  output: {
      path: path.join(__dirname, "build"),
      filename: "[name].js"
  },
  context: __dirname,
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2015', 'stage-2']
        }
      }
    ]
  }
};
