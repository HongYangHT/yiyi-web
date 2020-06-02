<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 登录头部
 * @Date: 2020-04-11 22:06:41
 * @LastEditTime: 2020-06-02 15:12:22
 -->
<template>
  <section :class="prefix">
    <section :class="prefix + '__inner'">
      <!-- <img :src="logo" :class="prefix + '__logo'" /> -->
      <div :class="prefix + '__logo'">YIYI 学习</div>
      <section :class="[prefix + '__right', 'ml-auto']">
        <!-- <a href="" :class="prefix + '__right__item'">登录/注册</a> -->
        <a href="" :class="prefix + '__right__item'">关于我</a>
        <!-- <a href="" :class="prefix + '__right__item'">帮助</a> -->
      </section>
    </section>
  </section>
</template>
<script>
const PREFIX = 'login-header'
export default {
  name: 'LoginHeader',
  data() {
    return {
      prefix: PREFIX,
      // logo: logoSrc
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/_login-header.scss";
</style>
