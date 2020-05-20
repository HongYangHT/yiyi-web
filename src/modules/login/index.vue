<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-11 22:03:53
 * @LastEditTime: 2020-05-20 10:05:27
 -->
<template>
  <div :class="prefix">
    <login-header></login-header>
    <divider :scale="0.3"></divider>
    <div :class="prefix + '__content'">
      <img :src="loginBaaner" :class="prefix + '__banner'"/>
      <el-card>
        <el-tabs v-model="activeName" :stretch="true" @tab-click="$_onChangeTab">
          <el-tab-pane label="登录" name="login">
            <el-form ref="login" :model="loginModel" :rules="loginRules">
              <el-form-item></el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="signin">注册</el-tab-pane>
        </el-tabs>
      </el-card>
    </div>
  </div>
</template>
<script>
import LoginHeader from '@/modules/components/login-header.vue'
import Divider from '@/modules/components/divider.vue'
import '@/assets/scss/modules/login/_index.scss'
import banner from '@/assets/img/login.png'
import { Card, Tabs, TabPane, Form, FormItem, Input, Button } from 'element-ui'
const PREFIX = 'login'
export default {
  components: {
    LoginHeader,
    Divider,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button
  },
  data() {
    return  {
      prefix: PREFIX,
      loginBaaner: banner,
      activeName: 'login',
      loginModel: {},
      loginRules: {}
    }
  },
  methods: {
    $_onChangeTab(tab) {
    }
  }
}
</script>
