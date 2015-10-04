var webpack = require('webpack');
var path = require('path');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
  entry: {
    app: './modules/app.js',
    search: ['./modules/search/index.js'],
    player: ['./modules/player/index.js'],
    details: ['./modules/details/index.js'],
  },
  output: {
    path: 'public/bundle',
    publicPath: '/bundle/',
    filename: '[name].js'
  },
  plugins: [commonsPlugin],
  module: {
    loaders: [
      { test: /\.worker.js$/, loader:'babel!worker' },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.js(x)?$/, loader: 'babel', exclude: /.*node_modules.*/ },
    ],
    noParse: [path.resolve(__dirname, 'node_modules/react/dist/react.min.js')]
  }
};
