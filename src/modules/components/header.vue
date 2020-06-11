<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-02 15:11:40
 * @LastEditTime: 2020-06-11 14:17:57
-->
<template>
    <div :class="[prefix, { 'active': active }]">
      <div :class="prefix + '__content'">
        <div :class="prefix + '__logo'"></div>
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
              <el-dropdown-item command="profile" v-if="(userInfo && userInfo.nickName) || (userInfo && userInfo.username)">个人详情</el-dropdown-item>
              <el-dropdown-item command="logout" divided v-if="(userInfo && userInfo.nickName) || (userInfo && userInfo.username)">退出登录</el-dropdown-item>
              <el-dropdown-item command="login" v-if="!((userInfo && userInfo.nickName) || (userInfo && userInfo.username))">去登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <div :class="prefix + '__menu__weather'">
            {{ weather.city }} {{ weather.tem + ' ℃' }} <img :src="`http://tq.daodaoim.com//tianqiapi/skin/pitaya/${weather.wea_img}.png`"/>
            <!-- <span>{{ weather.city }}</span><span>今天{{ weather.wea }}{{
              weather.win }}{{ weather.tem }} <img :src="`http://tq.daodaoim.com//tianqiapi/skin/pitaya/${weather.wea_img}.png`"/></span><span>白天最高温度：{{ weather.tem_day }}</span>
            <span>晚间温度：{{ weather.tem_night }}</span><span>空气质量：{{ weather.air }}</span> -->
          </div>
        </div>
      </div>
    </div>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
      active: false,
      weather: {
        wea_img: 'yun'
      }
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.auth.userInfo || localStore.get('user-info')
    })
  },
  async mounted() {
    document.addEventListener('scroll', e => {
      if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        this.active = true
      } else {
        this.active = false
      }
    }, false)

    this.weather = await this.$_fetchWeather()
  },
  methods: {
    ...mapMutations('auth', ['setToken', 'setUserInfo']),
    ...mapActions('weather', ['fetchWeather']),
    $_fetchWeather() {
      return this.fetchWeather({
        params: {
          appid: '76658489',
          appsecret: 'VHgHxD77',
          version: 'v9'
        }
      })
    },
    $_onCommand(name) {
      switch (name) {
        case 'profile':
          break
        case 'logout':
          this.$_logout()
          break
        case 'login':
          this.$router.replace({
            name: 'login'
          })
          break
        default:
          this.$router.replace({
            name: 'login'
          })
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
