const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = smart(base,{
  mode: 'production',
  
  optimization: { // 优化项
    minimizer: [
      new UglifyJsPlugin({ // 压缩js
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCss()  // 压缩css
    ]
  },
})