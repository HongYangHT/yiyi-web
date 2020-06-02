<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-02 18:23:30
 * @LastEditTime: 2020-06-02 15:14:14
-->
<template>
  <div :class="prefix">
    <div :class="prefix + '__content'">
      <h1>{{ config[type].title }}</h1>
      <div :class="prefix + '__content__desc'">
        {{ config[type].desc }}
      </div>
      <div :class="prefix + '__action'">
        <el-button type="primary" @click="$_handleToHome">
          返回首页
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Button } from 'element-ui'
const PREFIX = 'exception'
export default {
  name: 'ExceptionFrame',
  components: {
    [Button.name]: Button,
  },
  props: {
    type: {
      type: String,
      default: '404',
    },
  },
  data() {
    return {
      config: {
        403: {
          title: '403',
          desc: '抱歉，你无权访问该页面',
        },
        404: {
          title: '404',
          desc: '抱歉，你访问的页面不存在或仍在开发中',
        },
        500: {
          title: '500',
          desc: '抱歉，服务器出错了',
        },
      },
      prefix: PREFIX
    }
  },
  methods: {
    $_handleToHome() {
      this.$router.push('/')
    },
  },
}
</script>
<style lang="scss">
@import "@/assets/scss/modules/exception/_index.scss";
</style>
