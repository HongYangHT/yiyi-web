/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于配置打包设置
 * @Date: 2020-04-01 18:19:45
 * @LastEditTime: 2020-06-03 15:50:11
 */
const proxy = require('./proxy')
module.exports = {
  ...proxy,
  port: 9001,
  // host: '0.0.0.0'
  host: 'localhost',
  useEslint: true,
  autoFix: true
}
