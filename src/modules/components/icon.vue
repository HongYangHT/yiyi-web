<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 14:57:18
 * @LastEditTime: 2020-06-02 15:13:13
-->
<template>
  <i :class="classes" :style="styles"></i>
</template>
<script>
export default {
  name: 'IconFont',
  props: {
    name: {
      type: String,
      default: 'github'
    },
    size: {
      type: Number,
      default: 16
    }
  },
  data () {
    return {

    }
  },
  computed: {
    classes() {
      return {
        'icon-font': true,
        [`icon-font-${this.name}`]: true
      }
    },
    styles() {
      return {
        fontSize: this.size + 'px'
      }
    }
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/common/_icon-font.scss";
</style>
