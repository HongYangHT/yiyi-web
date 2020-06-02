<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-02 15:11:40
 * @LastEditTime: 2020-06-02 17:52:34
-->
<template>
    <div :class="[prefix, { 'active': active }]">
      <div :class="prefix + '__content'">
        <div :class="prefix + '__logo'">YIYI 学习</div>
        <div :class="prefix + '__menu'">
          <el-dropdown @command="$_onCommand">
            <div :class="prefix + '__dropdown'">
              <el-image :class="prefix + '__user__logo'" :src="userInfo && userInfo.avatar" lazy>
                <div slot="error" class="image-slot">
                  <i class="el-icon-user"></i>
                </div>
              </el-image>
              <span>{{ (userInfo && userInfo.nickName) || (userInfo && userInfo.username) }}</span>
            </div>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile">个人详情</el-dropdown-item>
              <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import { localStore } from '@/common/utils/storage'
import { Dropdown, DropdownMenu, DropdownItem, Image } from 'element-ui'
const PREFIX = 'header'
export default {
  name: 'InnerHeader',
  components: {
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Image.name]: Image
  },
  data() {
    return {
      prefix: PREFIX,
      active: false
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.auth.userInfo || localStore.get('user-info')
    })
  },
  mounted() {
    document.addEventListener('scroll', e => {
      if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        this.active = true
      } else {
        this.active = false
      }
    }, false)
  },
  methods: {
    ...mapMutations('auth', ['setToken', 'setUserInfo']),
    $_onCommand(name) {
      switch (name) {
        case 'profile':
          break
        case 'logout':
          this.$_logout()
          break
      }
    },
    $_logout() {
      localStore.remove('user-info')
      localStore.remove('access_token')
      this.setToken({})
      this.setUserInfo({})
      this.$router.replace({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/_header.scss";
</style>
