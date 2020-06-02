<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 分割线
 * @Date: 2020-04-11 23:01:41
 * @LastEditTime: 2020-06-02 15:13:42
 -->
<template>
<div :class="prefix" :style="scaleStyle"></div>
</template>

<script>
const PREFIX = 'divider'
export default {
  name: 'Divider',
  props: {
    scale: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: '#FFF'
    }
  },
  data() {
    return {
      prefix: PREFIX
    }
  },
  computed: {
    scaleStyle () {
      return {
        transform: `scaleY(${this.scale})`,
        backgroundColor: this.color
      }
    }
  }
}
</script>
<style lang="scss">
@import "@/assets/scss/components/_divider.scss";
</style>
