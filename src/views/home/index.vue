<!-- home -->
<template>
  <div>
    12313
  </div>
</template>

<script>
import { getUserInfo, bindDelegate } from '@/api/home.js'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
export default {
  name: 'index',
  data() {
    return {
      show: true
    }
  },
  created() {},
  computed: {},

  mounted() {},

  methods: {
    showPopup() {
      Dialog.alert({
        message: res.msg
      })
      this.show = true
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
