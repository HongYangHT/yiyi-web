/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 11:11:04
 * @LastEditTime: 2020-05-20 17:31:15
 */
import BaseService from './base'

class AuthSerivce extends BaseService {
  constructor(options) {
    super(options)
    this.baseUrl = options.baseUrl
  }

  /**
   * 帐号登录
   * @param {*} path
   * @param {*} params
   */
  login(path, params) {
    return this.post(path, params)
  }

  /**
   * 注册
   * @param {*} path
   * @param {*} params
   */
  signin(path, params) {
    return this.post(path, params)
  }

  /**
   * github 授权完成后，获取信息
   * @param {*} path
   * @param {*} params
   */
  fetchGithubUser(path, params) {
    return this.get(path, params)
  }
}

export default AuthSerivce
