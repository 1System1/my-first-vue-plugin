const path = require('path');

//path.resolve为文件当前目录
function resolve(dir) {
  return path.resolve(__dirname, dir);
}
const NODE_ENV = process.env.NODE_ENV;

module.exports = {

  // 选项...
  pages: {
    index: {
      // page 的入口
      entry: './src/main.js',
      // entry: NODE_ENV === 'development' ? './packages/main.js' : './dist/index.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    subpage: 'src/main.js'
  },
  // 向 CSS 相关的 loader 传递选项。例如：
  css: {
   // 将组件内的 CSS 提取到一个单独的 CSS 文件 (只用在生产环境中)
    // 也可以是一个传递给 `extract-text-webpack-plugin` 的选项对象
    extract: true,

   // 为预处理器的 loader 传递自定义选项。
    loaderOptions: {
      css: {
        // 这里的选项会传递给 css-loader

      },
      sass: {
        prependData: `@import "src/styles/global.scss";`
      },
      postcss: {
        // 这里的选项会传递给 postcss-loader
      }
    }
  },
  publicPath: '/',
  chainWebpack:config=>{

    // 添加别名
    config.resolve.alias
      .set('@c', resolve('src/components'))
      .set('@', resolve('src'))
  },
  configureWebpack:{
    output:{
      // path: resolve("./dist"),
      //修改输出打包后的脚本文件名，该文件即是 package.json 中配置的 main 属性的对应文件
      // filename: '[name].[chunkhash].chunk.js',
      // filename: 'vue-cli-plugin-cnbi.min.js',
      filename: '[name].js',
      // chunkFilename: '[name].[chunkhash].chunk.js',
      // ,
      //增加以下库配置信息
      library: 'indicator',
      libraryTarget: 'umd',
      umdNamedDefine: true
    },
    module:{
      rules:[
        {
          test:/\.js$/,
          loader:'babel-loader',
          // include:path.join(__dirname,'src'),
          include:[
            path.join(__dirname, 'src'),
            // 解决插件es6语法报错
            path.join(__dirname,'node_modules/_vue-cli-plugin-cnbi@0.1.0@vue-cli-plugin-cnbi/src')
            ],
          // exclude:/node_modules/
        },
        {
          test: / \.scss$/ ,
          use: [ 'style' , 'css' , 'sass' ]
        }
      ]
    },

    // externals: {
    //   vue: {
    //     root: 'Vue',
    //     commonjs: 'vue',
    //     commonjs2: 'vue',
    //     amd: 'vue'
    //   }
    // }

  },

  // 如果你的前端应用和后端 API 服务器没有运行在同一个主机上，你需要在开发环境下将 API 请求代理到 API 服务器。这个问题可以通过 vue.config.js 中的 devServer.proxy 选项来配置。
  devServer: {
    port: "8080",
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    proxy: {
      '/aapi': {
        target: "http://192.168.2.236",
        changeOrigin: true,
        pathRewrite: {
          '^/aapi': '/'
        }
      }
    },
  }

}
