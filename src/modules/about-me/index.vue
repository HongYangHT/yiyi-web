<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 09:30:53
 * @LastEditTime: 2020-07-31 11:34:05
-->
<template>
  <!-- 制作个人简历 -->
  <div :class="prefix"></div>
</template>
<script>
const PREFIX = 'about-me'
export default {
  components: {},
  data: () => ({
    prefix: PREFIX
  }),
  mounted() {
  },
  methods: {
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/modules/about-me/_index.scss";
</style>
