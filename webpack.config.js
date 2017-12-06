var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'app/index.jsx'),
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'eval-source-map',
  resolve:{
    extensions:['.js','.jsx']
  },
  module: {
    loaders: [
      {
        test: /(\.jsx|\.js)$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {
            loader: "css-loader",
            options: {
              modules: true
            }
          },
          {
            loader: "postcss-loader"
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"},
          {loader: "postcss-loader"},
          {
            loader: "less-loader",
            options: {
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(png|gif|jpg|jpeg|bmp)$/i,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'img/[name].[chunkhash:7].[ext]'
        }
      },
      {
        test: /\.(png|woff|woff2|svg|ttf|eot)($|\?)/i,
        loader: 'url-loader',
        options: {
          limit: 5000,
          name: 'fonts/[name].[chunkhash:7].[ext]'
        }
      }
    ]
  },
  plugins: [
    // html 模板插件
    new HtmlWebpackPlugin({
      template: __dirname + '/app/index.tmpl.html'
    }),

    // 热加载插件
    new webpack.HotModuleReplacementPlugin(),

    // 打开浏览器
    new OpenBrowserPlugin({
      url: 'http://localhost:8081'
    }),

    // 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
    new webpack.DefinePlugin({
      __DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
    })
  ],
  devServer: {
    proxy: {
      // 凡是 `/api` 开头的 http 请求，都会被代理到 localhost:3000 上，由 koa 提供 mock 数据。
      // koa 代码在 ./mock 目录中，启动命令为 npm run mock
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    },
    contentBase: "./public", //本地服务器所加载的页面所在的目录
    stats: { colors: true }, //终端中输出结果为彩色
    historyApiFallback: true, //不跳转
    inline: true, //实时刷新
    hot: true  // 使用热加载插件 HotModuleReplacementPlugin
  }
  // eslint: {
  //   configFile: '.eslintrc'
  // }
}