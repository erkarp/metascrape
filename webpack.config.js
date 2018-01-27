const path = require('path');
const webpack = require('webpack');


module.exports =[
{
  name: 'client',
  target: 'web',

  entry: [
    path.join(__dirname, 'client/index.js')
  ],

  output:
  {
    path: path.resolve('./public'),
    filename: 'bundle.js',
    publicPath: '/'
  },

  module:
  {
    rules: [
    {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader",
            options: {
                includePaths: ['./sass']
            }
        }]
    },
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react']
        }
      }
    }]
  },
   plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
},
{
  name: 'server',
  target: 'node',

  entry: [
    path.join(__dirname, 'app.js')
  ],

  output:
  {
    path: path.join(__dirname, '/dist/'),
    filename: 'app.js',
    publicPath: ''
  },

  module:
  {
    rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['env']
        }
      }
    }]
  }
}
];