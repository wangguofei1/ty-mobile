<template>
  <div>
    <foot-bar @goUrl="toUrl" :active="tabActive"></foot-bar>
  </div>
</template>
  
  <script>
import { Dialog } from 'vant'
export default {
  name: 'DataAnalysis',
  components: {
    footBar: () => import('@/components/footBar')
  },
  data() {
    return {
      tabActive: 1
    }
  },
  created() {},
  computed: {},

  mounted() {},

  methods: {
    toUrl(e) {
        console.log(e)
      if (e == 0) {
        this.$router.push({
          name: 'Home'
        })
      } else if (e == 2) {
        this.$router.push({
          name: 'PersonalCenter'
        })
      }
    }
  }
}
</script>
  <style lang="scss" scoped>
</style>