var webpack = require('webpack');
var path = require('path');

var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var node_modules_dir = path.join(__dirname, 'node_modules');

var deps = [
  'react/dist/react.min.js',
  'react-router/dist/react-router.min.js',
  'moment/min/moment.min.js',
];

var config = {
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
  resolve: {
    alias: {}
  },
  module: {
    loaders: [
      { test: /\.worker.js$/, loader:'babel!worker' },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.js(x)?$/, loader: 'babel', exclude: /.*node_modules.*/ },
    ],
    noParse: []
  }
};

// Run through deps and extract the first part of the path, 
// as that is what you use to require the actual node modules 
// in your code. Then use the complete path to point to the correct
// file and make sure webpack does not try to parse it
deps.forEach(function (dep) {
  var depPath = path.resolve(node_modules_dir, dep);
  config.resolve.alias[dep.split(path.sep)[0]] = depPath;
  config.module.noParse.push(depPath);
});

module.exports = config;
