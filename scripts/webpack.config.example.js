const path = require('path')

module.exports = {
  context: path.resolve(__dirname, '../example'),
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, '../example'),
    filename: '__build__.js'
  },
  resolve: {
    modules: [
      path.resolve(__dirname, '../dist'),
      'node_modules'
    ],
    alias: {
      'vue-range-slider/dist/vue-range-slider.css': 'vue-range-slider.css',
      'vue-range-slider': 'vue-range-slider.cjs.js'
    }
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /(node_modules|dist)/ },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.vue$/, loader: 'vue' }
    ]
  },
  devServer: {
    contentBase: './example'
  }
}
