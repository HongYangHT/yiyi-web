<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 09:52:56
 * @LastEditTime: 2020-07-03 10:07:26
-->
<template>
  <div :class="prefix"></div>
</template>

<script>
const PREFIX = 'about-me'
export default {
  components: {},
  data: () => ({
    prefix: PREFIX
  }),
  methods: {}
}
</script>
<style lang="scss">
@import "@/assets/scss/modules/about-me/_index.scss";
</style>
