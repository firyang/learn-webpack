const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin') // 将样式放入css文件中
const OptimizeCss = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
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
  devServer: { // 开发服务器
    port: 3000,
    progress: true,
    contentBase: './dist',
    compress: true
  },
  mode: 'development', // 模式 默认两种 production development
  entry: './src/index.js', // 入口
  output: {
    filename: 'bundle.js', // 打包后的文件名
    // filename: 'bundle.[hash:8].js', // 打包后的文件名
    path: path.resolve(__dirname, 'dist') // 路径必须是一个绝对路径
  },
  plugins: [ // 数组 放着所有的webpack插件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      minify: {
        removeAttributeQuotes: true, // 清除双引号
        collapseWhitespace: true // 清除断行
      },
      hash: true
    }),
    new MiniCssExtractPlugin({
      filename: 'main.css'
    })
  ],
  module: { // 模块
    rules: [ // 规则
      // loader的特点 希望单一
      // loader的用户 字符串只用一个loader
      // 多个loader需要 []
      // loader的顺序 默认是从右向左, 从下到上执行
      // 可写成对象
      //---------------------------
      // 代码校验
      // 安装 eslint eslint-loader
      {
        // enforce: "pre",
        // test: /\.js$/,
        // exclude: /node_modules/,
        // loader: "eslint-loader"
      },
      //---------------------------
      // 处理js, es6,7 -> es5
      // babel-loader
      // @babel/preset-env es6 -> es5
      // @babel/plugin-proposal-decorators 类装饰器 -> es5
      // @babel/plugin-proposal-class-properties 类属性 -> es5
      // @babel/plugin-transform-runtime
      // @babel/runtime --save
      // @babel/polyfill --save 将高级实例方法转换polyfill 安装后在脚本中引入require("@babel/polyfill")
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env'
            ],
            plugins: [
              ["@babel/plugin-proposal-decorators", { "legacy": true }],
              ["@babel/plugin-proposal-class-properties", { "loose": true }],
              "@babel/plugin-transform-runtime"
            ]
          }
        },
        include: path.resolve(__dirname, 'src'),
        exclude: /node_modules/
      },
      // ---------------------------
      // 处理css
      // css-loader 解析@import这种语法
      // style-loader 它是把css 插入到head标签中
      {
        test: /\.css$/,
        use: [
          // { // 把css 插入到head标签中
          //   loader:'style-loader',
          //   options:{ // 配置项
          //     // 插入到head顶部
          //     insertAt: 'top'
          //   }
          // },
          // 把css抽离, 并放入main.css,
          MiniCssExtractPlugin.loader,
          // 解析@import路径
          'css-loader',
          // 添加浏览器前缀
          // 1. 安装postcss-loader autoprefixer
          // 2. 添加postcss.config.js配置文件 
          'postcss-loader',
        ]
      },
      // ---------------------------
      // 处理less文件 sass stylus
      { 
        test: /\.less$/,
        use: [
          // {
          //   loader: 'style-loader',
          //   options: {
          //     insertAt: 'top'
          //   }
          // },
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          // less -> css
          'less-loader'
        ]
      }
    ]
  }
}