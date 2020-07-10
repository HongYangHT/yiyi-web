<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-07-03 15:00:16
 * @LastEditTime: 2020-07-10 16:42:12
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
          <div :class="prefix + '__resume__form--empty'" v-if="author.resumes && !author.resumes.length">
            暂无记录，<el-link type="primary" @click="$_addNewResume">马上添加</el-link>
          </div>
          <div :class="prefix + '__resume__form--content'" v-else>
            <template v-for="(form, index) in author.resumes">
              <el-form :ref="'resume' + index" :model="form" :rules="resumeRules" :key="index" label-width="100px">
                <el-row>
                  <el-col :span="9">
                    <el-form-item prop="virtualTime" label="在职时间">
                      <el-date-picker
                        v-model="form.virtualTime"
                        type="daterange"
                        range-separator="至"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        style="width: 100%;">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="virtualArea" label="所在城市">
                      <i class="el-icon-location"></i>
                      <el-cascader v-model="form.virtualArea" :props="getProps()" size="small" placeholder="请选择地址" clearable></el-cascader>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="location" label="所在公司">
                      <el-input v-model="form.location" :maxlength="100" prefix-icon="el-icon-s-home" size="small" placeholder="请输入所在公司" clearable></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="5">
                    <el-form-item prop="role" label="公司职位">
                      <el-input v-model="form.role" :maxlength="100" prefix-icon="el-icon-monitor" size="small" placeholder="请输入在公司职位" clearable></el-input>
                    </el-form-item>
                  </el-col>
                </el-row>
              </el-form>

              <el-form :ref="'resume__content' + index" :model="form" :rules="resumeRules" :key="'content' + index">
                <el-form-item prop="content">
                  <editor v-model="form.content" :init="editorInit">

                  </editor>
                </el-form-item>
              </el-form>
            </template>
          </div>
        </div>
      </div>
      <div :class="prefix + '__education'">
        <h4>个人教育</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__education__form'">
          <div :class="prefix + '__education__form--empty'" v-if="author.educations && !author.educations.length">
            暂无记录，<el-link type="primary">马上添加</el-link>
          </div>
        </div>
      </div>
      <div :class="prefix + '__skill'">
        <h4>技能</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__skill__form'">
          <div :class="prefix + '__skill__form--empty'" v-if="author.skill && !author.skill.length">
            暂无记录，<el-link type="primary">马上添加</el-link>
          </div>
        </div>
      </div>
      <div :class="prefix + '__favor'">
        <h4>爱好</h4>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
        <div :class="prefix + '__favor__form'">
          <div :class="prefix + '__favor__form--empty'" v-if="author.favor && !author.favor.length">
            暂无记录，<el-link type="primary">马上添加</el-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Input, Cascader, Form, FormItem, Icon, Link, DatePicker, Row, Col } from 'element-ui'
import { mapActions } from 'vuex'
import Divider from '@/modules/components/divider.vue'
import Editor from '@tinymce/tinymce-vue'
import tinymce from 'tinymce'
import 'tinymce/themes/silver'

// A theme is also required
import 'tinymce/themes/silver/theme';
import 'tinymce/icons/default';

// Any plugins you want to use has to be imported
import 'tinymce/plugins/advlist';
import 'tinymce/plugins/autolink';
import 'tinymce/plugins/lists';
import 'tinymce/plugins/charmap';
import 'tinymce/plugins/print';
import 'tinymce/plugins/preview';
import 'tinymce/plugins/anchor';
import 'tinymce/plugins/searchreplace';
import 'tinymce/plugins/visualblocks';
import 'tinymce/plugins/paste';
import 'tinymce/plugins/code';
import 'tinymce/plugins/fullscreen';
import 'tinymce/plugins/insertdatetime';
import 'tinymce/plugins/table';
import 'tinymce/plugins/help';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/wordcount';
import 'tinymce/plugins/link';
import 'tinymce/plugins/autoresize';
import 'tinymce/plugins/image';
import 'tinymce/plugins/media';
import 'tinymce/plugins/autoresize';

import 'tinymce/skins/ui/oxide/skin.min.css'
import 'tinymce/skins/ui/oxide/skin.mobile.min.css'
import 'tinymce/skins/ui/oxide/content.min.css'
import 'tinymce/skins/content/default/content.min.css'

const PREFIX = 'about-me'
let resume = {
  virtualTime: [],
  virtualArea: [],
  position: '', // 所在城市， 拼接省市
  province: '',
  city: '',
  area: '',
  location: '', // 所在公司
  role: '',
  startTime: '',
  endTime: '',
  content: '', // 具体工作内容
}

export default {
  components: {
    Divider,
    Editor,
    [Input.name]: Input,
    [Cascader.name]: Cascader,
    [Form.name]: Form,
    [FormItem.name]: FormItem,
    [Icon.name]: Icon,
    [Link.name]: Link,
    [DatePicker.name]: DatePicker,
    [Row.name]: Row,
    [Col.name]: Col
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
      favor: [],
      skill: [],
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
        required: true, message: '请输入Github地址', trigger: 'change'
      }],
      virtualArea: [{
        type: 'array', required: true, min: 1, message: '请选择地址', trigger: 'change'
      }]
    }),
    overviewRules: Object.freeze({
      overview: [{
        required: true, message: '请输入个人概况', trigger: 'blur'
      }]
    }),
    resumeRules: Object.freeze({
      virtualArea: [{
        type: 'array', required: true, min: 1, message: '请选择地址', trigger: 'blur'
      }],
      virtualTime: [{
        type: 'array', required: true, min: 2, message: '请选择在职时间', trigger: 'change'
      }],
      location: [{
        required: true, message: '请输入所在公司', trigger: 'blur'
      }],
      role: [{
        required: true, message: '请输入公司职位', trigger: 'blur'
      }]
    }),
    editorInit: Object.freeze({
      language_url: '../../common/tinymce/langs/zh_CN.js',// 语言包的路径
      language: 'zh_CN',//语言
      height: 300,//编辑器高度
      branding: false,//是否禁用“Powered by TinyMCE”
      menubar: false,//顶部菜单栏显示
      plugins: [
        'advlist autolink lists link image charmap print preview anchor',
        'searchreplace visualblocks code fullscreen',
        'insertdatetime media table paste code help wordcount'
      ],
      toolbar:
        'undo redo | formatselect | bold italic backcolor | \
        alignleft aligncenter alignright alignjustify | \
        bullist numlist outdent indent | removeformat | link image | help',
      automatic_uploads: true,
      images_upload_url: 'https://www.hcy.cool/api/v1/file/upload/avatar',
      // images_upload_handler: (blobInfo, success, failure) => {
      //   const img = 'data:image/jpeg;base64,' + blobInfo.base64()
      //   success(img)
      // }
    })
  }),
  mounted () {
    tinymce.init({})
  },
  methods: {
    ...mapActions('weather', ['fetchArea']),
    $_addNewResume() {
      this.author.resumes.push(resume)
    },
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
