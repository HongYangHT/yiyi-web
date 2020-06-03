<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-11 22:03:53
 * @LastEditTime: 2020-06-03 20:28:31
 -->
<template>
  <div :class="prefix">
    <login-header></login-header>
    <divider :scale="0.3"></divider>
    <div :class="prefix + '__content'">
      <!-- <img :src="loginBaaner" :class="prefix + '__banner'"/> -->
      <el-card>
        <el-tabs v-model="activeName" :stretch="true" @tab-click="$_onChangeTab">
          <el-tab-pane label="登录" name="login">
            <el-form ref="login" :class="prefix + '__form'" :model="loginModel" :rules="loginRules" label-width="0px">
              <el-form-item prop="username">
                <el-input v-model="loginModel.username" placeholder="请输入帐号"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="loginModel.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" :class="prefix + '__btn__long'"  @click="$_login">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="注册" name="signin">
            <el-form ref="signin" :class="prefix + '__form'" :model="signinModel" :rules="signinRules" label-width="0px">
              <el-form-item prop="username">
                <el-input v-model="signinModel.username" placeholder="请输入手机号码或者邮箱地址"></el-input>
              </el-form-item>
              <el-form-item prop="password">
                <el-input v-model="signinModel.password" type="password" placeholder="请输入密码"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button :class="prefix + '__btn__long'" type="primary" @click="$_signin">注册</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
        </el-tabs>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__other'">
          <p>第三方登录</p>
          <div :class="prefix + '__other__login'">
            <a :href="`https://github.com/login/oauth/authorize?client_id=${client_id}`" target="_self">
              <icon-font name="github" :size="36"></icon-font>
            </a>
            <!-- <a href="" target="_self">
              <icon-font name="qq" :size="36"></icon-font>
            </a>
            <a href="" target="_self">
              <icon-font name="weixin" :size="36"></icon-font>
            </a> -->
          </div>
        </div>
      </el-card>
      <div class="night">
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
        <div class="shooting_star"></div>
      </div>
    </div>
  </div>
</template>
<script>
import LoginHeader from '@/modules/components/login-header.vue'
import Divider from '@/modules/components/divider.vue'
import IconFont from '@/modules/components/icon.vue'
// import banner from '@/assets/img/login.png'
import { Card, Tabs, TabPane, Form, FormItem, Input, Button } from 'element-ui'
import { mapActions } from 'vuex'
import { uuid } from '@/common/utils/lib'
const PREFIX = 'login'
export default {
  components: {
    LoginHeader,
    Divider,
    IconFont,
    [Card.name]: Card,
    [Tabs.name]: Tabs,
    [TabPane.name]: TabPane,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Input.name]: Input,
    [Button.name]: Button
  },
  data() {
    const validateUsername = (rule, value, cb) => {
      let phone = /^1[0-9]{10}/,
          email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
      if (!(phone.test(value) || email.test(value))) {
        cb(new Error('请输入正确的手机号码或者邮箱地址'))
      }
      cb()
    }
    const validateName = (rule, value, cb) => {
      let phone = /^1[0-9]{10}/,
          email = /^(\w+\.?)*\w+@(?:\w+\.)\w+$/
      if (!(phone.test(value) || email.test(value))) {
        cb(new Error('请输入正确的帐号'))
      }
      cb()
    }
    const validatePassword = (rule, value, cb) => {
      let reg = /^[0-9A-Za-z]{6,}$/
      if(!reg.test(value)) {
        cb(new Error('请输入密码长度不少于6位字符'))
      }
      cb()
    }
    return  {
      prefix: PREFIX,
      // loginBaaner: banner,
      activeName: 'login',
      loginModel: {
        username: '',
        password: ''
      },
      signinModel: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{
          required: true, message: '请输入帐号', trigger: 'blur'
        }, {
          validator: validateName
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          validator: validatePassword
        }]
      },
      signinRules: {
        username: [{
          required: true, message: '请输入手机号码或者邮箱地址', trigger: 'blur'
        }, {
          validator: validateUsername
        }],
        password: [{
          required: true, message: '请输入密码', trigger: 'blur'
        }, {
          validator: validatePassword
        }]
      },
      client_id: 'ae22cda54b2a70ddf868'
    }
  },
  mounted() {
    let { from, code } = this.$route.query
    if (from === 'github' && code) {
      // 授权成功
      this.fetchGithubUser({
        params: {
          code: code,
          client_id: this.client_id,
          state: uuid(8, 16)
        }
      }).then(result => {
        if (result) {
          this.$message.success('授权成功')
          this.$router.push({
            name: 'dashboard'
          })
        }
      })
    }
  },
  methods: {
    ...mapActions('auth', ['login', 'signin', 'fetchGithubUser']),
    $_onChangeTab(tab) {
      if (this.activeName === 'login') {
        this.$refs.login.clearValidate()
      } else {
        this.$refs.signin.clearValidate()
      }
    },
    $_login() {
      this.$refs.login.validate(valid => {
        if (valid) {
          this.login({
            data: {
              ...this.loginModel
            }
          }).then(result => {
            if (result) {
              this.$message.success('登录成功')
              this.$router.push({
                name: 'dashboard'
              })
            }
          })
        }
      })
    },
    $_signin() {
      this.$refs.signin.validate(valid => {
        if (valid) {
          this.signin({
            data: {
              ...this.signinModel,
              nickName: ''
            }
          }).then(result => {
            if (result) {
              this.$message.success('注册成功, 请登录')
              setTimeout(() => {
                this.activeName = 'login'
              }, 1000)
            }
          })
        }
      })
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/modules/login/_index.scss';
</style>
