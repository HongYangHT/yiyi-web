/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: webpack的开发设置
 * @Date: 2020-04-01 16:06:43
 * @LastEditTime: 2020-07-03 17:09:42
 */
const merge = require('webpack-merge')
const webpack = require('webpack')
const webpackConfig = require('./webpack.config')
const config = require('./config/index')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const checkVersion = require('./check-version')
const path = require('path')
const mock = require('../mockjs')
// NOTE: 用于加速打包构建, 有bug 会存在无法更新的情况
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin')
checkVersion()

let devConfig = merge(webpackConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    pathinfo: false,
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    libraryTarget: 'umd',
    filename: 'js/[name].js',
    chunkFilename: 'js/[name].js',
    umdNamedDefine: true
  },
  devServer: {
    contentBase: path.resolve(__dirname, '../dist'),
    clientLogLevel: 'warning',
    hot: true, // 热更新
    open: true, // 是否自动打开浏览器页面
    compress: true, // 是否启用gzip
    host: config.host,
    port: config.port,
    overlay: {
      warnings: true,
      errors: true
    },
    // overlay: true,
    hotOnly: true,
    historyApiFallback: true,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      aggregateTimeout: 300,
      poll: false
    },
    proxy: config.proxy,
    stats: 'minimal',
    // NOTE: 用于 mockjs 本地模拟数据请求
    before: (app) => {
      mock(app)
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    // new HardSourceWebpackPlugin(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  // 如果是设置了PORT 就用设置的 PORT， 没有，就需要用我们设置的
  portfinder.basePort = process.env.PORT || config.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
      console.log(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devConfig.plugins.push(
        new FriendlyErrorsPlugin({
          compilationSuccessInfo: {
            messages: [
              `Your application is running here: http://${devConfig.devServer.host ||
                'localhost'}:${port}`
            ]
          }
        })
      )

      resolve(devConfig)
    }
  })
})
