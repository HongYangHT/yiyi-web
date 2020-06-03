/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 抛出请求，请求分层化设计
 * @Date: 2019-06-27 15:11:19
 * @LastEditTime: 2020-06-03 16:17:20
 */
import config from './config'
import { localStore } from '@/common/utils/storage'
import { Message, MessageBox } from 'element-ui'
import AuthService from './auth'
import qs from 'qs'
import ArticleService from './article'

let toast = false

const responseError = error => {
  if (error && error.response && error.response.status === 401) {
    Message.error('登录令牌已过期，请退出应用后重新登录')
  } else if (error && error.response && error.response.status !== 200) {
    if (error && error.response && error.response.data && error.response.data.message) {
      Message.error(error.response.data && error.response.data.message)
    } else {
      Message.error('系统繁忙，请稍后再试！')
    }
  }
}

const requestInterceptor = config => {
  const token = localStore.get('access_token') || ''

  if (config.url !== '/login') {
    config.headers['Authorization'] = `Bearer ${token}`
  }
  if (config.method.toLocaleLowerCase() === 'post') {
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
    config.data = qs.stringify(config.data)
  }
  return config
}

const responseInterceptor = response => {
  let errors = {
    400: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: '参数错误',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    404: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: '接口不存在',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    405: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: '传参错误',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    415: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: '传参错误',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    500: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: '服务繁忙，请稍后再试',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    502: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: 'Bad Gateway',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    503: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: 'Service Unavailable',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
    504: () => {
      if (toast) return
      toast = true
      Message({
        showClose: true,
        message: 'Gateway Timeout',
        duration: 3000,
        type: 'error',
      })
      toast = false
    },
  }

  let code = response && (response.status + '').startsWith('20') ? +response.data.status : response.status
  if (errors[code]) {
    errors[code]()
  } else {
    !(code + '').startsWith('20') && Message.error(response.data && response.data.message)
  }
  return response
}

export const authService = new AuthService({
  baseUrl: process.env.NODE_ENV === 'production' ? config.production : config.development,
  basePath: 'auth',
  responseError: error => {
    responseError(error)
  },
  requestError: error => {},
  responseInterceptor: config => {
    return responseInterceptor(config)
  },
  requestInterceptor: config => {
    return requestInterceptor(config)
  },
})

export const articleService = new ArticleService({
  baseUrl: process.env.NODE_ENV === 'production' ? config.production : config.development,
  basePath: 'topic',
  responseError: error => {
    responseError(error)
  },
  requestError: error => {},
  responseInterceptor: config => {
    return responseInterceptor(config)
  },
  requestInterceptor: config => {
    return requestInterceptor(config)
  },
})
