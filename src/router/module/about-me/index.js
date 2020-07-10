/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 09:45:16
 * @LastEditTime: 2020-07-10 11:41:38
 */
export default [{
  path: '/about-me',
  name: 'about-me',
  component: () => import(/* webpackChunkName: "about-me" */ '@/modules/about-me/index.vue'),
  meta: {
    title: '关于我'
  }
}, {
  path: '/about-me/edit',
  name: 'edit-me',
  component: () => import(/* webpackChunkName: "about-me-edit" */ '@/modules/about-me/edit.vue'),
  meta: {
    title: '编辑简历'
  }
}
, {
  path: '/about-me/add',
  name: 'edit-me',
  component: () => import(/* webpackChunkName: "about-me-add" */ '@/modules/about-me/add.vue'),
  meta: {
    title: '新增简历'
  }
}
]
