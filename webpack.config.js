var path = require('path');
var LiveReloadPlugin = require('webpack-livereload-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public/scripts')
  },
  context: __dirname,
  resolve: {
    extensions: ['.js', '.jsx', '.json', '*']
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
      loader: ExtractTextPlugin.extract(
          'style-loader', // backup loader when not building .css file
          'css-loader!sass-loader' // loaders to preprocess CSS
    )
    }
]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.COSMIC_BUCKET': JSON.stringify(process.env.COSMIC_BUCKET),
      'process.env.COSMIC_READ_KEY': JSON.stringify(process.env.COSMIC_READ_KEY),
      'process.env.COSMIC_WRITE_KEY': JSON.stringify(process.env.COSMIC_WRITE_KEY)
    }),
    new ExtractTextPlugin(path.resolve(__dirname, 'public/style.css')),
    new LiveReloadPlugin({appendScriptTag: true})
    // new InlineManifestWebpackPlugin({ name: 'webpackManifest' })
  ]
};