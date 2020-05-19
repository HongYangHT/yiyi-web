/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 路由都需要做模块分层设计
 * @Date: 2019-12-18 11:46:46
 * @LastEditTime: 2020-04-09 23:10:47
 */
import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'

/**
 * 重写路由的push方法，解决 `Navigating to current location is not allowed`
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}

Vue.use(Router)

let router = new Router({
  mode: 'history',
  // base: `/${pkg.name}/`,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes: [
    ...routes,
    {
      // 会匹配所有路径
      path: '/403/:lang',
      name: '403',
      component: () => import(/* webpackChunkName: "403" */ '@/modules/exception/403.vue'),
    },
    {
      // 会匹配所有路径
      path: '/500/:lang',
      name: '500',
      component: () => import(/* webpackChunkName: "500" */ '@/modules/exception/500.vue'),
    },
    {
      // 会匹配所有路径
      path: '*',
      name: '404',
      component: () => import(/* webpackChunkName: "404" */ '@/modules/exception/404.vue'),
    },
  ],
})

// 做相关拦截
router.beforeEach((to, from, next) => {
  next()
})

export default router
