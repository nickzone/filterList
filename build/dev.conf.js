var path = require('path');
var webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/entry.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'ant-filterlist.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/, 
        use: [{
          loader: "babel-loader"
        }],
        exclude: "/node_modules/"
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader"
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options:{
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "dist")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: ('./src/index.html')
    })
  ]
}