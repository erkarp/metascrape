var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
 
var config = {
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015']
      }
    }, 
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: [ 'css-loader', 'sass-loader' ]
      })
    }, 
    {
      test: /\.node$/,
      use: 'node-loader'
    }]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    new ExtractTextPlugin('../stylesheet/style.css'),
    new LiveReloadPlugin({appendScriptTag: true})
    // new InlineManifestWebpackPlugin{ name: 'webpackManifest' })
  ]
};

var server = Object.assign({}, config, {
  entry: './server/index.js',
  output: {
    filename: 'serverBundle.js',
    path: path.resolve(__dirname, 'server')
  }
});

var client = Object.assign({}, config,{
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts')
  }
});

// Return Array of Configurations
module.exports = [server, client];