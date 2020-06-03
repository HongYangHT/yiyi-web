<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-06-03 09:49:18
 * @LastEditTime: 2020-06-03 17:58:20
-->
<template>
<div :class="prefix">
  <inner-header></inner-header>
  <div :class="prefix + '__content'">
    <div :class="prefix + '__tab'">
      <ul>
        <li :class="[prefix + '__tab__new', 'pr-20']">最新内容</li>
        <li :class="prefix + '__tab__sf'">SF</li>
        <li :class="prefix + '__tab__juejin'">掘金</li>
        <li :class="prefix + '__tab__zhihu'">前端外刊</li>
        <li :class="prefix + '__tab__csstricks'">Css Tricks</li>
      </ul>
    </div>
    <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
    <div :class="prefix + '__tab__content'">
      <div :class="prefix + '__tab__content__item'" v-for="item in topics" :key="item.id">
        <h4><el-link :href="item.url" target="_blank">{{ item.title }}</el-link></h4>
        <div class="excerpt">
          {{ item.content }}
        </div>
        <div class="author">
          <span>{{ item.commit }}</span><el-link type="success" :href="item.url" target="_blank">查看详情</el-link>
        </div>
        <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
      </div>
    </div>
    <div :class="prefix + '__pagination'">
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
import { Carousel, CarouselItem, Image, Row, Col, Card, Tooltip, Link, Pagination } from 'element-ui';
import InnerHeader from '@/modules/components/header.vue';
import Divider from '@/modules/components/divider.vue'
import { mapActions } from 'vuex'
const PREFIX = 'article'
export default {
  components: {
    Divider,
    InnerHeader,
    [Tooltip.name]: Tooltip,
    [Link.name]: Link,
    [Pagination.name]: Pagination
  },
  data() {
    return {
      prefix: PREFIX,
      pager: {
        pageSize: 10,
        page: 1,
        total: 0
      },
      topics: []
    }
  },
  mounted() {
    this.$_fetchTopics()
  },
  methods: {
    ...mapActions('article', ['fetchTopics']),
    $_fetchTopics() {
      this.fetchTopics({
        params: {
          ...this.pager
        }
      }).then(result => {
        this.topics = (result && result.topics) || [];
        this.pager.total = (result && result.count) || [];
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
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/modules/article/_index.scss';
</style>
