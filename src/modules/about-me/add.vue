<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 15:00:16
 * @LastEditTime: 2020-07-03 18:16:45
-->
<template>
  <div :class="prefix">
    <div :class="prefix + '__content'">
      <h2 :class="prefix + '__h2'">个人简历</h2>

      <div :class="prefix + '__info'">
        <h4>个人信息</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <el-form ref="info" :class="prefix + '__info__form'" :model="author" :rules="infoRules">
          <el-form-item prop="name">
            <el-input v-model="author.name" :maxlength="40" prefix-icon="el-icon-user-solid" size="small" placeholder="请输入姓名" clearable></el-input>
          </el-form-item>
          <el-form-item prop="virtualArea">
            <i class="el-icon-location"></i>
            <el-cascader v-model="author.virtualArea" :props="getProps()" size="small" placeholder="请选择地址" style="width: 100%;" clearable></el-cascader>
          </el-form-item>
          <el-form-item prop="phone">
            <el-input v-model="author.phone" :maxlength="40" prefix-icon="el-icon-phone" size="small" placeholder="请输入电话号码" clearable></el-input>
          </el-form-item>
          <el-form-item prop="mail">
            <el-input v-model="author.mail" :maxlength="40" prefix-icon="el-icon-chat-line-round" size="small" placeholder="请输入邮箱地址" clearable></el-input>
          </el-form-item>
          <el-form-item prop="github">
            <el-input v-model="author.github" :maxlength="40" prefix-icon="el-icon-paperclip" size="small" placeholder="请输入github地址" clearable></el-input>
          </el-form-item>
        </el-form>
      </div>

      <div :class="prefix + '__overview'">
        <h4>个人概况</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <el-form ref="overview" :class="prefix + '__overview__form'" :model="author" :rules="overviewRules">
          <el-form-item prop="overview">
            <el-input v-model="author.overview" :maxlength="300" type="textarea" rows="5" placeholder="请输入个人概况" show-word-limit></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div :class="prefix + '__resume'">
        <h4>个人经历</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__resume__form'">
          <div :class="prefix + '__resume__form--empty'" v-if="author.resumes">
            暂无记录，<el-link type="primary">马上添加</el-link>
          </div>
        </div>
      </div>
      <div :class="prefix + '__education'">
        <h4>个人教育</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__education__form'">
          <div :class="prefix + '__education__form--empty'" v-if="author.educations">
            暂无记录，<el-link type="primary">马上添加</el-link>
          </div>
        </div>
      </div>
      <div :class="prefix + '__skill'">
        <h4>技能</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__skill__form'">

        </div>
      </div>
      <div :class="prefix + '__favor'">
        <h4>爱好</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__favor__form'">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Cascader, Form, FormItem, Icon, Link } from 'element-ui'
import { mapActions } from 'vuex'
import Divider from '@/modules/components/divider.vue'
const PREFIX = 'about-me'
export default {
  components: {
    Divider,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Icon.name]: Icon,
    [Link.name]: Link
  },
  data: () => ({
    prefix: PREFIX,
    author: {
      name: '',
      phone: '',
      mail: '',
      github: '',
      virtualArea: [],
      province: '',
      city: '',
      area: '',
      overview: '',
      favor: '',
      skill: '',
      resumes: [],
      educations: []
    },
    infoRules: Object.freeze({
      name: [{
        required: true, message: '请输入姓名', trigger: 'blur'
      }],
      phone: [{
        required: true, message: '请输入电话号码', trigger: 'blur'
      }],
      mail: [{
        required: true, message: '请输入邮箱', trigger: 'blur'
      }],
      github: [{
        required: true, message: '请输入Github地址', trigger: 'blur'
      }],
      virtualArea: [{
        type: 'array', required: true, min: 1, message: '请选择地址', trigger: 'blur'
      }]
    }),
    overviewRules: Object.freeze({
      overview: [{
        required: true, message: '请输入个人概况', trigger: 'blur'
      }]
    })
  }),
  methods: {
    ...mapActions('weather', ['fetchArea']),
    getProps() {
      let that = this
      return {
        lazy: true,
        async lazyLoad(node, resolve) {
          const { level } = node,
              appkey = '1326fca47fb9faeb'
          let result
          switch (level) {
            case 0:
              result = await that.$_fetchArea({
                params: {
                  appkey,
                  level
                }
              })
              break;
            case 1:
              result = await that.$_fetchArea({
                params: {
                  appkey,
                  level,
                  province: node.value,
                }
              })
              break;
            case 2:
              result = await that.$_fetchArea({
                params: {
                  appkey,
                  level,
                  city: node.value
                }
              })
              break
            default:
              result = await that.$_fetchArea({
                params: {
                  appkey,
                  level
                }
              })
              break;
          }

          resolve(result)
        }
      }
    },
    async $_fetchArea(data) {
      let result = await this.fetchArea(data)
      return (result && result.map(item => ({
        value: item.id,
        label: item.name,
        leaf: data.params.level >= 2 || item.name.indexOf('区') !== -1
      }))) || [];
    }
  },
}
</script>

<style lang="scss">
@import '@/assets/scss/modules/about-me/_index.scss';
</style>
