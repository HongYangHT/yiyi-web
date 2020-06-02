<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-02 17:47:55
 * @LastEditTime: 2020-06-02 14:18:19
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
