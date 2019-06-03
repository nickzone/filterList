const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const nodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './example/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: ('./example/index.html')
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: "babel-loader"
        }],
        exclude: /node_modules/
      },
      {
        test: /\.(le|c)ss$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: '../dist'
          },
        }, {
          loader: "css-loader"
        }, {
          loader: "less-loader",
          options: {
            javascriptEnabled: true
          }
        }]
      }
    ]
  },
  // externals: [nodeExternals()],
}