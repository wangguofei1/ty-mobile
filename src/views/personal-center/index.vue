<template>
  <div>
    <foot-bar @goUrl="toUrl" :active="tabActive"></foot-bar>
  </div>
</template>
    
    <script>
import { Dialog } from 'vant'
export default {
  name: 'PersonalCenter',
  components: {
    footBar: () => import('@/components/footBar')
  },
  data() {
    return {
      tabActive: 2
    }
  },
  created() {},
  computed: {},

  mounted() {},

  methods: {
    toUrl(e) {
      if (e == 1) {
        this.$router.push({
          name: 'DataAnalysis'
        })
      } else if (e == 0) {
        this.$router.push({
          name: 'Home'
        })
      }
    }
  }
}
</script>
    <style lang="scss" scoped>
</style>