<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-02 15:27:04
 * @LastEditTime: 2020-06-03 11:58:14
 -->
<template>
  <section :class="prefix">
    <section :class="prefix + '__content'">
      <router-view />
    </section>
    <page-footer></page-footer>
  </section>
</template>

<script>
import PageFooter from '@/modules/components/page-footer.vue'
const PREFIX = 'app'
export default {
  components: {
    PageFooter,
  },
  data() {
    return {
      prefix: PREFIX
    }
  },
}
</script>
