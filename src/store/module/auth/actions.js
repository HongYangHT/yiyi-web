/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 11:02:03
 * @LastEditTime: 2020-05-21 13:54:57
 */
import { authService } from '@/common/http'
import * as types from './types'

export function login ({ commit }, params) {
  return new Promise((resolve, reject) => {
    authService.login('/login', params).then(result => {
      if (result && result.data && result.data.status === 200) {
        commit(types.SET_TOKEN, result.data.data)
        commit(types.SET_USER_INFO, result.data.data)
        resolve(result.data.data)
      } else {
        reject(result.data)
      }
    })
  })
}

export function signin({ commit }, params) {
  return new Promise((resolve, reject) => {
    authService.signin('/signin', params).then(result => {
      if (result && result.data && result.data.status === 200) {
        resolve(result.data.data)
      } else {
        reject(result.data)
      }
    })
  })
}

export function fetchGithubUser ({ commit }, params) {
  return new Promise((resolve, reject) => {
    authService.fetchGithubUser('/login/github', params).then(result => {
      if (result && result.data && result.data.status === 200) {
        commit(types.SET_TOKEN, result.data.data)
        commit(types.SET_USER_INFO, result.data.data)
        resolve(result.data.data)
      } else {
        reject(result.data)
      }
    })
  })
}
