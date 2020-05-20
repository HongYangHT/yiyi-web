/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: http 请求配置文件
 * @Date: 2019-06-27 15:22:55
 * @LastEditTime: 2020-05-20 11:53:32
 */

export default {
  baseUrl: {
    // development: '//test-pay-gateway.sdongpo.com', // 测试服务器环境
    development: 'http://localhost:9000/api/v1',
    production: '/api/v1', // 正式服务器环境
  },
  // NOTE: 不设置请求过期时间，一直等待接口返回
  // timeout: 60000,
}
