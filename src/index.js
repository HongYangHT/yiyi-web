/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-01 16:24:49
 * @LastEditTime: 2020-05-20 14:32:06
 */
import Vue from 'vue'
import App from './modules/app.vue'
import router from './router'
import store from './store'
import {
  sync
} from 'vuex-router-sync'

import { Loading, MessageBox, Notification, Message } from 'element-ui'

Vue.prototype.$ELEMENT = { size: 'medium', zIndex: 3000 }

Vue.prototype.$loading = Loading.service
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$notify = Notification
Vue.prototype.$message = Message

import '@/assets/scss/_index.scss'

// NOTE: 采取懒加载的模式
/* 全局注册是为了调用实例模式 */

import 'normalize.css'

import i18nManager from '@/common/i18n'

if (module.hot) {
  module.hot.accept()
}

// 将路由状态同步到store中
sync(store, router)

new Vue({
  el: '#app',
  router,
  store,
  i18n: i18nManager.i18n,
  render: h => h(App),
})
