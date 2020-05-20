/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: dashboard 首页
 * @Date: 2020-04-09 23:07:05
 * @LastEditTime: 2020-05-20 19:46:32
 */
export default [{
  path: '/dashboard',
  name: 'dashboard',
  component: () => import(/* webpackChunkName: "dashboard" */ '@/modules/dashboard/index.vue'),
  meta: {
    title: '首页'
  }
}]
