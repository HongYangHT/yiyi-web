/*
 * @Author: sam.hongyang
 * @LastEditors  : sam.hongyang
 * @Description: http 请求配置文件
 * @Date: 2019-06-27 15:22:55
 * @LastEditTime : 2020-01-15 14:14:30
 */

export default {
  baseUrl: {
    // development: '//test-pay-gateway.sdongpo.com', // 测试服务器环境
    development: '/api',
    production: '//pay-gateway.sdongpo.com', // 正式服务器环境
  },
  // NOTE: 不设置请求过期时间，一直等待接口返回
  // timeout: 60000,
}
