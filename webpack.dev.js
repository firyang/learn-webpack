const { smart } = require('webpack-merge')
const base = require('./webpack.base.js')

module.exports = smart(base,{
  mode: 'development',  
  devServer: { // 开发服务器
    port: 3000,
    contentBase: './dist',
    // historyApiFallback: { // 返回404页面时定向到特定页面
    //   rewrites:[
    //     {from:/./, to:'/404.html'}
    //   ]
    // }, 
    hot: true,
    inline: true,
    progress: false,
    compress: true,
    overlay: { // 在浏览器输出编译错误
      warnings: true,
      errors: true
    },
    stats: 'errors-only', // 控制编译的时候shell上的输出内容
    open: false,
    proxy:{}
  },
})