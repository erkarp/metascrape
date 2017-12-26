module.exports =
{
  entry:
  [
    'webpack-hot-middleware',
    './client/index'
  ],

  output:
  {
    path: require('path').resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module:
  {
    loaders:
    [{
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:
      {
        presets: ['react', 'env']
      }
    }]
  }

};
