<!--
 * @Author: sam.hongyang
 * @LastEditors: sam.hongyang
 * @Description: function description
 * @Date: 2020-04-02 15:27:04
 * @LastEditTime: 2020-05-20 09:59:13
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
    PageFooter
  },
  data() {
    return {
      prefix: PREFIX
    }
  },
}
</script>
