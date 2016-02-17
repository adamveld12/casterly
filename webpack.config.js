var webpack = require('webpack');
var path = require('path');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');
var reactHotPlugin = new webpack.HotModuleReplacementPlugin();

module.exports = {
  entry: {
    app: './client/app.js'
  },
  output: {
    path: "public/bundle/",
    publicPath: "/bundle/",
    filename: "[name].js"
  },
  module: {
    loaders: [
      {
        test: /\.(worker\.)?js(x)?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'react-hot!babel?presets[]=react,presets[]=es2015',
        //query: { presets: ['react', 'es2015'] }
      },
      { test: /\.less$/, loader: 'style!css!less' },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.(png|jpg)$/, loader: 'url-loader?limit=8192'}
    ]
  },
  plugins: [commonsPlugin],
  resolve: {
    extensions: ['', '.js', '.json', '.less']
  }
};
