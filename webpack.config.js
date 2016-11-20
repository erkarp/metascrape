module.exports =
{
  entry: ['./javascripts/client.js'],

  output:
  {
    path: './public',
    filename: 'bundle.js',
    publicPath: '/'
  },

  module:
  {
    loaders:
    [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query:
      {
        presets: ['react', 'es2015']
      }
    }]
  }

};
