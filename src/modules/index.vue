<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-02 17:47:55
 * @LastEditTime: 2020-05-21 09:16:45
 -->
<template>
  <div :class="prefix"></div>
</template>
<script>
const PREFIX = 'root'
export default {
  data() {
    return {
      prefix: PREFIX
    }
  }
}
</script>
