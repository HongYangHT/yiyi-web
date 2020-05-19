/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-11 20:29:23
 * @LastEditTime: 2020-04-11 20:41:40
 */
const mockjs = require('mockjs')
const homeService = require('./home')
const mock = app => {
  homeService.getUserInfo(app)
}

module.exports = mock
