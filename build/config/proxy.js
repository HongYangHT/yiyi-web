/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于设置代理
 * @Date: 2020-04-01 18:20:21
 * @LastEditTime: 2020-04-11 22:03:29
 */
// 设置代理
module.exports = {
  proxy: {
    '/api/**': {
      target: 'https://feiapi.com',
      // pathRewrite: {
      //   '^/api/': ''
      // },
      changeOrigin: true,
      secure: false
    }
  }
}
