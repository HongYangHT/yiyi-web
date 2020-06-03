/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-03 15:24:25
 * @LastEditTime: 2020-06-03 19:08:15
 */
import BaseService from './base'

class ArticleService extends BaseService {
  constructor(options) {
    super(options)
    this.baseUrl = options.baseUrl
  }

  /**
   * 获取列表
   * @param {*} path
   * @param {*} data
   */
  fetchTopics(path, data) {
    return this.get(path, data)
  }

  /**
   * 记录访问记录
   * @param {*} path
   * @param {*} data
   */
  changeVisit(path, data) {
    return this.get(path, data)
  }
}

export default ArticleService
