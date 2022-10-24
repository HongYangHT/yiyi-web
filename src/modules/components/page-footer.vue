<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 09:40:03
 * @LastEditTime: 2022-10-20 15:13:33
-->
<template>
  <div :class="prefix">
    <a :class="prefix + '__icp'" href="http://www.beian.gov.cn/portal/registerSystemInfo">
      <span>湘ICP备2022021902号-1 © 2022 ~ {{new Date().getFullYear()}} Shoppee.TOP</span>
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
