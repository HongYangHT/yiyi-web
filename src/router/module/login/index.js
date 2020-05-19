/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 登录
 * @Date: 2020-04-09 23:06:50
 * @LastEditTime: 2020-04-14 12:32:00
 */
export default [{
  path: '/',
  name: 'login',
  component: () => import(/* webpackChunkName: "login" */ '@/modules/login/index.vue'),
  meta: {
    title: '登录'
  }
}]
