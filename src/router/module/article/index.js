/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-03 09:54:13
 * @LastEditTime: 2020-06-03 09:54:57
 */
export default [{
  path: '/article',
  name: 'article',
  component: () => import(/* webpackChunkName: "article" */ '@/modules/article/index.vue'),
  meta: {
    title: '文章列表'
  }
}]
