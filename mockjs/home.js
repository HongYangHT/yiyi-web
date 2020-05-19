/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-11 20:31:49
 * @LastEditTime: 2020-04-11 20:40:59
 */
const mockjs = require('mockjs')

exports.getUserInfo = app => {
  app.get('/user/user-info', (req, res) => {
    res.json(mockjs.mock({
      code: 200,
      msg: '请求成功',
      data: {
        username: mockjs.Random.cname(),
        id: mockjs.Random.guid(),
        created: mockjs.Random.date('yyyy-MM-dd hh:mm:ss')
      }
    }))
  })
}
