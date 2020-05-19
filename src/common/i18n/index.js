/*
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: 用于国际化，并实现国际化的懒加载
 * @Date: 2020-04-02 17:25:34
 * @LastEditTime: 2020-04-09 22:46:23
 */
/**
 * 通过以下步骤添加新语言：
 * - 1. 在`src/asset/locals`目录下添加新语言对应的资源文件；
 * - 2. 在本文件里通过`import`关键字将新语言资源文件导入；
 * - 3. 修改常量`SUPORTED_LIST`的值加入新支持的语言。
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

// 引入组件库国际化语言资源
// import iviewZh from 'view-design/dist/locale/zh-CN';
// import iviewZh from 'view-design/dist/locale/en-US';
// 引入工程国际化语言资源
import zhLocale from '@/assets/locals/zh-CN'
// import enLocale from '@/asset/locals/en-US'

// 导入事件总线对象
import bus from '@/common/utils/bus'

// 应用支持的语言列表
const SUPORTED_LIST = ['zh-CN']
// 默认语言
const DEFAULT_LANG = 'zh-CN'
// 生僻国家，绕过重复设置locale属性无效的问题
const EMPTY_LANG = 'ky'
// 本地存储key
const STORAGE_KEY = 'sako-language'

// 注册国际化插件
Vue.use(VueI18n)

/**
 * 国际化资源管理类
 * @class
 */
class I18nManager {
  /**
   * 构造函数
   * @constructs
   * @param  {VueI18n} i18n `VueI18n`实例对象
   */
  constructor() {
    const browserLanguage = navigator.language
    let localLanguage = window.localStorage.getItem(STORAGE_KEY)

    if (!localLanguage) {
      localLanguage = SUPORTED_LIST.indexOf(browserLanguage) >= 0 ? browserLanguage : DEFAULT_LANG
    }

    /**
     * 是否将语言存入本地存储对象，默认为`true`(即:将当前语言写入本地存储对象)
     * @name wantToStore
     * @memberof I18nManager
     * @type {Boolean}
     */
    this.wantToStore = true

    // 创建国际化对象。
    this._i18n = new VueI18n({
      locale: localLanguage,
      fallbackLocale: localLanguage,
      messages: {
        // NOTE: 采用了异步加载
        // 设置本地化资源
        // 'en-US': {
        //   ...enLocale
        // },
        'zh-CN': {
          ...zhLocale,
        },
      },
    })
  }

  /**
   * 设置语言
   * @private
   * @param {String} newLanguage 新语言
   */
  _setLanguage(newLanguage) {
    const oldLanguage = this._i18n.locale
    if (oldLanguage === newLanguage) {
      // 先设置为一个生僻国家，否则反复设置locale不会刷新视图
      this._i18n.locale = EMPTY_LANG
    }
    this._i18n.locale = newLanguage
    document.querySelector('html').setAttribute('lang', newLanguage)
    if (this.wantToStore) {
      window.localStorage.setItem(STORAGE_KEY, newLanguage)
    }
    bus.$emit('g-i18n-language-changed', newLanguage, oldLanguage) // 通知其他对象语言已改变
    return newLanguage
  }

  /**
   * 获得当前语言
   * @property
   * @readonly
   * @type {String}
   */
  get language() {
    return this._i18n.locale
  }

  /**
   * 改变语言
   * @param  {String} newLanguage 新语言
   * @return {Promise} 一个`Promise`对象实例
   */
  changeLanguage(newLanguage) {
    if (typeof newLanguage === 'string' && newLanguage !== '' && newLanguage !== this._i18n.locale) {
      this._setLanguage(newLanguage)
    }
  }

  /**
   * 获得`VueI18n`实例
   * @property
   * @readonly
   * @type {VueI18n}
   */
  get i18n() {
    return this._i18n
  }

  /**
   *
   */
  loadLanguageAsync(lang) {
    if (this._i18n.locale !== lang) {
      if (!SUPORTED_LIST.includes(lang)) {
        return import(/* webpackChunkName: "lang-[request]" */ `@/assets/locals/${lang}`).then(msgs => {
          this._i18n.setLocaleMessage(lang, msgs.default)
          SUPORTED_LIST.push(lang)
          return this.changeLanguage(lang)
        })
      }
      return Promise.resolve(this.changeLanguage(lang))
    }
    return Promise.resolve(lang)
  }
}

const i18nManagerInstance = new I18nManager()

export default i18nManagerInstance
