/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于分层设计，将路由提取出来, 便于做权限相关设置
 * @Date: 2020-04-09 22:43:04
 * @LastEditTime: 2020-05-20 19:48:12
 */
import login from './module/login'
import dashboard from './module/dashboard'
export default [
  ...login,
  ...dashboard
]
