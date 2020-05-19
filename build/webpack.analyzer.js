/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于分析打包代码组成，便于进行代码优化
 * @Date: 2020-04-02 10:19:24
 * @LastEditTime: 2020-04-09 22:55:16
 */
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const prodConfig = require('./webpack.prod')
const merge = require('webpack-merge')

module.exports = merge(prodConfig, {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
})
