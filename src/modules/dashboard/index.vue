<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-05-20 19:44:51
 * @LastEditTime: 2020-06-02 18:26:48
-->
<template>
  <div :class="prefix">
    <!-- 欢迎来到 YIYI 的世界 -->
    <inner-header></inner-header>
    <div :class="prefix + '__banner'">
      <el-carousel :loop="false" arrow="nerver" indicator-position="none" trigger="click" height="500px">
        <el-carousel-item v-for="(item, index) in banners" :key="index">
          <div :class="prefix + '__banner__img'" :style="{ backgroundImage: `url(${ item.img })` }"></div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div :class="prefix + '__nav'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div :class="prefix + '__nav__top'">
              <div>
                SF 思否
              </div>
            </div>
            <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
            <div :class="prefix + '__nav__bottom'">
              <h2>SegmentFault 思否</h2>
              <el-tooltip class="item" effect="dark" content="SegmentFault 思否是中国领先的新一代开发者社区和专业的技术媒体。" placement="bottom">
                <div class="tip">SegmentFault 思否是中国领先的新一代开发者社区和专业的技术媒体。</div>
              </el-tooltip>
            </div>
            <i class="light"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div :class="prefix + '__nav__top'">
              <div>
                <el-image src="https://b-gold-cdn.xitu.io/v3/static/img/logo.a7995ad.svg" lazy></el-image>
              </div>
            </div>
            <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
            <div :class="prefix + '__nav__bottom'">
              <h2>掘金</h2>
              <el-tooltip class="item" effect="dark" content="掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。" placement="bottom">
                <div class="tip">掘金是一个帮助开发者成长的社区，是给开发者用的 Hacker News，给设计师用的 Designer News，和给产品经理用的 Medium。</div>
              </el-tooltip>
            </div>
            <i class="light"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div :class="[prefix + '__nav__top', prefix + '__nav__top__zhihu']">
              <div>
                前端外刊
              </div>
            </div>
            <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
            <div :class="prefix + '__nav__bottom'">
              <h2>前端外刊</h2>
              <el-tooltip class="item" effect="dark" content="关注前端技术，探寻深邃思想" placement="bottom">
                <div class="tip">关注前端技术，探寻深邃思想</div>
              </el-tooltip>
            </div>
            <i class="light"></i>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <div :class="[prefix + '__nav__top', prefix + '__nav__top__csstricks']">
              <div>
                Css Tricks
              </div>
            </div>
            <divider :scale="0.3" color="rgba(0, 0, 0, .6)"></divider>
            <div :class="prefix + '__nav__bottom'">
              <h2>Css Tricks</h2>
              <el-tooltip class="item" effect="dark" content="Css Tricks, CSSer的眼界扩展网站" placement="bottom">
                <div class="tip">Css Tricks, CSSer的眼界扩展网站</div>
              </el-tooltip>
            </div>
            <i class="light"></i>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import InnerHeader from '@/modules/components/header.vue';
import { Carousel, CarouselItem, Image, Row, Col, Card, Tooltip } from 'element-ui';
import Divider from '@/modules/components/divider.vue'
const PREFIX = 'dashboard'
export default {
  components: {
    Divider,
    InnerHeader,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem,
    [Image.name]: Image,
    [Row.name]: Row,
    [Col.name]: Col,
    [Card.name]: Card,
    [Tooltip.name]: Tooltip
  },
  data() {
    return {
      prefix: PREFIX,
      banners: [/* {
        img: 'http://cdn.alloyteam.com/assets/img/banner_2-37b0e7.jpg'
      },  */{
        img: 'http://cdn.alloyteam.com/assets/img/banner_1-ec70a4.jpg'
      }]
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/modules/dashboard/_index.scss';
</style>
