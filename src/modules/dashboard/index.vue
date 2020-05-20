<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 19:44:51
 * @LastEditTime: 2020-05-20 19:45:53
-->
<template>
  <div :class="prefix">
    欢迎来到 YIYI的世界
  </div>
</template>
<script>
const PREFIX = 'dashboard'
export default {
  data() {
    return {
      prefix: PREFIX,
    }
  }
}
</script>
