/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-03 15:28:12
 * @LastEditTime: 2020-06-03 16:17:39
 */
import { articleService } from '@/common/http'

export function fetchTopics({ commit }, params) {
  return new Promise((resolve, reject) => {
    articleService.fetchTopics('/fetch', params).then(result => {
      if (result && result.data && result.data.status === 200) {
        resolve(result.data.data)
      } else {
        reject(result.data)
      }
    })
  })
}
