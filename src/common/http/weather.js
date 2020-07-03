/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:36:09
 * @LastEditTime: 2020-07-03 16:10:55
 */
import BaseService from './base'

class WeatherService extends BaseService {
  constructor(options) {
    super(options)
    this.baseUrl = options.baseUrl
  }

  /**
   * 实时天气
   * @param {*} path
   * @param {*} data
   */
  fetchWeather(path, data) {
    return this.get(path, data)
  }

  /**
   * 获取城市信息
   * @param {*} path
   * @param {*} data
   */
  fetchArea(path, data) {
    return this.get(path, data)
  }
}

export default WeatherService
