const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.[hash:4].js',
    path: path.resolve('dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k，打包base64
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|svg)$/,
        use: 'file-loader',
      },
      {
        test: /\.(htm|html)$/,
        use: 'html-withimg-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: /src/,
        exclude: /node_modules/,
      },
    ],
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 7777,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: true,
    }),
    new ExtractTextWebpackPlugin('css/style.css'),
    new CleanWebpackPlugin('dist'),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
