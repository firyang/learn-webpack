# webpack安装
- 安装本地的webpack
- webpack webpack-cli -d

# webpack可以进行0配置
- 打包工具 -> 输出后的结果(js模块)
- 打包(支持我们的js的模块化)

# 手动配置webpack
- 默认配置文件的名字 webpack.config.js
- 指定配置文件： npx webpack --config filename
- npm run build -- --config webpack.config.js

# 引入第三方模块
## loader类型
- 内联loader
- pre 前置loader
- normal 普通loader
- 后置 postloader

## expose-loader 将模块暴露到全局  
`import $ from 'expose-loader?$!jquery'`

## webpack.config.js中配置rules  
`{`  
`test: require.resolve('jquery')`  
`use: 'expose-loader?$'`  
`}`

## 使用webpack插件 - webpack.ProvidePlugin, 在每个模块中注入  
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
## file-loader 默认会在内部生成一张图片到build目录下，把生成的图片名字返回
`{`  
  `test: /\.(jpg|png|gif)$/,`  
  `use: 'file-loader'`  
`}`
## url-loader 可限制图片小于多少k时，用base64转化。否则用file-loader产生真实图片
`{`  
  `test: /\.(jpg|png|gif)$/,`  
  `use: {`  
    `loader: 'url-loader',`  
    `options: {`  
      `limit: 10 * 1024`  
`}}}`
## html-withimg-loader 处理<img src="">
`{`  
  `test: /\.html$/,`  
  `use: 'html-withimg-loader'`  
`}`  