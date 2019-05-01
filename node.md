## webpack安装
- 安装本地的webpack
- webpack webpack-cli -d

## webpack可以进行0配置
- 打包工具 -> 输出后的结果(js模块)
- 打包(支持我们的js的模块化)

## 手动配置webpack
- 默认配置文件的名字 webpack.config.js
- 指定配置文件： npx webpack --config filename
- npm run build -- --config webpack.config.js


# 引入第三方模块
## loader类型
- 内联loader
- pre 前置loader
- normal 普通loader
- 后置 postloader

## 一. expose-loader 将模块暴露到全局  
`import $ from 'expose-loader?$!jquery'`

## 二. webpack.config.js中配置rules  
`{`  
`test: require.resolve('jquery')`  
`use: 'expose-loader?$'`  
`}`

## 三. 使用webpack插件 - webpack.ProvidePlugin, 在每个模块中注入  
- 引入webpack  
`const webpack = require('webpack')` 
- plugins中配置  
`new webpack.ProvidePlugin:{`  
`$: 'jquery'`  
`}`  
- 打包时忽略第三方模块  
`externals:{`  
`jquery: "jQuery"`  
`}`  

# 处理图片
## 图片引用类型
- js中创建图片  
`import logo from './logo.png'`  
`let image = new Image()`  
`image.src = logo`  
`document.body.appendChild(image)`  
- 在css中引入图片
- `<img src="">`
## 一. file-loader 默认会在内部生成一张图片到build目录下，把生成的图片名字返回
`{`  
  `test: /\.(jpg|png|gif)$/,`  
  `use: 'file-loader'`  
`}`
## 二. url-loader 可限制图片小于多少k时，用base64转化。否则用file-loader产生真实图片
`{`  
  `test: /\.(jpg|png|gif)$/,`  
  `use: {`  
    `loader: 'url-loader',`  
    `options: {`  
      `limit: 10 * 1024`  
`}}}`
## 三. html-withimg-loader 处理`<img src="">`
`{`  
  `test: /\.html$/,`  
  `use: 'html-withimg-loader'`  
`}` 

# source map
## devtool 增加映射文件，可以帮我们调试源代码
- 1. 源码映射 会单独生成一个sourcemap文件 出错了 会标识  当前报错的列和行  
`devtool： 'source-map'`  
- 2. 不会产生单独文件，但是可以显示行和列   
`devtool： 'eval-source-map'`  
- 3. 不会产生列，但是是一个单独的映射文件  
`devtool： 'cheap-module-source-map'`  
- 4. 不会产生文件，集成在打包后的文件中，不会产生列  
`devtool： 'cheap-module-eval-source-map'` 

# watch 实时打包
## 配置 watch
- `watch: true`  
## 配置 watchOptions
- poll 每秒问我多少次
- aggregateTimeout 防抖 停止输入500ms后再打包
- ignored 配置不需要监控的文件夹   
`watchOptions: {`  
  `poll: 1000,`  
  `aggregateTimeout: 500,`  
  `ignored: /node_modules/`  
`}`  