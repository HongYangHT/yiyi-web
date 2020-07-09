<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-03 09:49:18
 * @LastEditTime: 2020-07-09 12:03:49
-->
<template>
<div :class="prefix">
  <inner-header></inner-header>
  <div :class="prefix + '__content'">
    <div :class="prefix + '__tab'">
      <ul>
        <li :class="[prefix + '__tab__new', 'pr-20']" @click="$_fetchTopicsSearch('')">最新内容</li>
        <li :class="prefix + '__tab__sf'" @click="$_fetchTopicsSearch('sf')">SF</li>
        <li :class="prefix + '__tab__juejin'" @click="$_fetchTopicsSearch('juejin')">掘金</li>
        <li :class="prefix + '__tab__zhihu'" @click="$_fetchTopicsSearch('zhihu')">前端外刊</li>
        <li :class="prefix + '__tab__csstricks'" @click="$_fetchTopicsSearch('cssTricks')">Css Tricks</li>
      </ul>
    </div>
    <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
    <div :class="prefix + '__tab__content'" v-if="topics && topics.length">
      <div :class="prefix + '__tab__content__item'" v-for="item in topics" :key="item.id">
        <h4><el-link :href="item.url" target="_blank" @click.native="$_onChangeVisit(item)">{{ item.title }}</el-link></h4>
        <div class="excerpt">
          {{ item.content }}
        </div>
        <div class="author">
          <span>来源：<em>{{ item.from || '未知' }}</em></span>
          <span class="ml-12">{{ item.commit }}</span>
          <span class="ml-12 d-flex" v-if="item && item.users && item.users.length">
            <template v-for="u in (item.users.length > 5 && item.users.slice(4) || item.users)">
              <el-tooltip :content="u.nickName || u.username" :key="u.id">
                <el-avatar :src="u.avatar" v-if="u.avatar"></el-avatar>
                <el-avatar icon="el-icon-user" v-else></el-avatar>
              </el-tooltip>
            </template>
            <span v-if="item.users.length > 5">...</span>
            <span class="ml-6" v-if="item.users.length > 5">等</span>
            <span :class="{ 'ml-6': item.users.length <= 5 }">
              已查看
            </span>
          </span>
          <el-link type="success" :href="item.url" target="_blank" @click.native="$_onChangeVisit(item)">查看详情</el-link>
        </div>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
      </div>
    </div>
    <div :class="prefix + '__tab__content'" v-else>
      <div class="d-flex text-center">
        <p class="w-100">暂无数据</p>
      </div>
    </div>
    <div :class="prefix + '__pagination'" v-if="topics && topics.length">
      <el-pagination
        @size-change="$_onSizeChange"
        @current-change="$_currentChange"
        :current-page.sync="pager.page"
        :page-size="pager.pageSize"
        layout="total, prev, pager, next"
        :total="pager.total">
      </el-pagination>
    </div>
  </div>
</div>
</template>
<script>
import { Carousel, CarouselItem, Image, Row, Col, Card, Tooltip, Link, Pagination, Avatar } from 'element-ui';
import InnerHeader from '@/modules/components/header.vue';
import Divider from '@/modules/components/divider.vue'
import { mapActions } from 'vuex'
import { getParameterFromHash, concatHashParameters } from '@/common/utils/lib'
const PREFIX = 'article'
export default {
  components: {
    Divider,
    InnerHeader,
    [Tooltip.name]: Tooltip,
    [Link.name]: Link,
    [Pagination.name]: Pagination,
    [Avatar.name]: Avatar
  },
  data() {
    return {
      prefix: PREFIX,
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      topics: [],
      from: ''
    }
  },
  mounted() {
    this.from = this.$route.query.type
    this.pager.page = getParameterFromHash('page') || 1
    this.$_fetchTopics()
  },
  methods: {
    ...mapActions('article', ['fetchTopics', 'changeVisit']),
    $_fetchTopicsSearch(from) {
      this.pager.page = 1
      this.from = from
      this.$_fetchTopics()
    },
    $_fetchTopics() {
      this.fetchTopics({
        params: {
          from: this.from || '',
          ...this.pager
        }
      }).then(result => {
        this.topics = (result && result.topics) || [];
        this.pager.total = (result && result.count) || [];
        concatHashParameters('page', this.pager.page)
      }).catch(() => {
      })
    },
    $_onSizeChange(pageSize) {
      this.pager.pageSize = pageSize;
      this.$_fetchTopics()
    },
    $_currentChange(page) {
      this.pager.page = page;
      this.$_fetchTopics()
    },
    $_onChangeVisit(item) {
      this.changeVisit({
        params: {
          id: item.id
        }
      }).then(result => {})
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/modules/article/_index.scss';
</style>
