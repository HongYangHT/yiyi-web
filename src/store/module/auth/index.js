/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 11:01:02
 * @LastEditTime: 2020-05-20 11:38:10
 */
import * as actions from './actions'
import mutations from './mutations'
export default {
  namespaced: true,
  state: {
    token: '',
    userInfo: {}
  },
  actions,
  mutations,
}
