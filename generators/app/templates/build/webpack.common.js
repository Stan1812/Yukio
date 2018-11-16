const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js', // 入口文件
  mode: 'development',
  output: {
    filename: 'bundle.[hash:4].js', // 添加hash可以防止文件缓存，每次都会生成4位的hash串
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        // use: ExtractTextWebpackPlugin.extract({
        //   use: ['css-loader', 'postcss-loader'],
        // }),
        use: [{ loader: 'style-loader/url' }, { loader: 'file-loader' },{loader:'postcss-loader'}],
      },
      {
        test: /\.(jpe?g|png|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192, // 小于8k的图片自动转成base64格式，并且不会存在实体图片
              outputPath: 'images/', // 图片打包后存放的目录
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
    inline: true,
    hot: true,
    port: 7777,
    // open: true, //自动拉起浏览器
  },
  plugins: [
    new HtmlWebpackPlugin({
      // 用哪个html作为模板
      // 在根目录目录下创建一个index.html页面当做模板来用
      template: './index.html',
      hash: true, // 在打包的bundle.js后面加上hash串
    }),
    // new ExtractTextWebpackPlugin('css/style.css'),
    new CleanWebpackPlugin('dist'),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
