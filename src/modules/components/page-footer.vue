<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 09:40:03
 * @LastEditTime: 2020-06-02 15:12:42
-->
<template>
  <div :class="prefix">
    <a :class="prefix + '__icp'" href="http://www.beian.gov.cn/portal/registerSystemInfo">
      <span>浙ICP 备 20016879 号 @2020</span>
    </a>
  </div>
</template>
<script>
const PREFIX = 'page__footer';
export default {
  name: 'PageFooter',
  data() {
    return {
      prefix: PREFIX,
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/_page-footer.scss";
</style>
