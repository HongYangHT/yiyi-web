/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于设置代理
 * @Date: 2020-04-01 18:20:21
 * @LastEditTime: 2020-05-20 11:47:44
 */
// 设置代理
module.exports = {
  proxy: {
    '/api/**': {
      // target: 'https://www.hcy.cool',
      target: 'http://localhost:9000',
      // pathRewrite: {
      //   '^/api/': ''
      // },
      changeOrigin: true,
      secure: false
    }
  }
}
