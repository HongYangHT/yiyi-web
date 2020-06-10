/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-10 17:41:19
 * @LastEditTime: 2020-06-10 18:14:42
 */
import { weatherService } from '@/common/http'

export function fetchWeather ({ commit }, params) {
  return new Promise((resolve, reject) => {
    weatherService.fetchWeather('/fetch', params).then(result => {
      if (result && result.data && result.data.status === 200) {
        resolve(result.data.data)
      } else {
        reject(result.data)
      }
    })
  })
}
