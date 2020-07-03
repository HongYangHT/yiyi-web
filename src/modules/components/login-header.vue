<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 登录头部
 * @Date: 2020-04-11 22:06:41
 * @LastEditTime: 2020-07-03 09:51:40
 -->
<template>
  <section :class="prefix">
    <section :class="prefix + '__inner'">
      <div :class="prefix + '__logo'">
        <img :src="logo"/>
      </div>
      <section :class="[prefix + '__right', 'ml-auto']">
        <router-link :to="{ name: 'about-me' }" :class="prefix + '__right__item'">关于我</router-link>
      </section>
    </section>
  </section>
</template>
<script>
import logoSrc from '@/assets/img/logo.png'
const PREFIX = 'login-header'
export default {
  name: 'LoginHeader',
  data() {
    return {
      prefix: PREFIX,
      logo: logoSrc
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/_login-header.scss";
</style>
