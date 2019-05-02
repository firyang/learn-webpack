/**
 * 打包多页应用
 * 多个入口文件
 * 对应生成多个html和js
 */

const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    home:'./src/home.js', 
    other:'./src/other.js'
  }, 
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'home.html',
      chunks: ['home']
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'other.html',
      chunks: ['other']
    })
  ]
}