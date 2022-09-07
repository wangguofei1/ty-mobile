<template>
  <div>
    <van-tabbar v-model="actives" @change="goUrl">
      <van-tabbar-item>
        <span>首页统计</span>
        <template #icon="props">
          <img :src="props.active ? icon.active : icon.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>数据分析</span>
        <template #icon="props">
          <img :src="props.active ? icon1.active : icon1.inactive" />
        </template>
      </van-tabbar-item>
      <van-tabbar-item>
        <span>个人中心</span>
        <template #icon="props">
          <img :src="props.active ? icon2.active : icon2.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>
  
  <script>
import select1 from '@/assets/images/select1.png'
import select2 from '@/assets/images/select2.png'
import select3 from '@/assets/images/select3.png'
import select4 from '@/assets/images/select4.png'
import select5 from '@/assets/images/select5.png'
import select6 from '@/assets/images/select6.png'
export default {
  props: {
    active: {
      type: Number
    }
  },
  data() {
    return {
      actives: 0,
      icon: {
        active: select1,
        inactive: select2
      },
      icon1: {
        active: select3,
        inactive: select4
      },
      icon2: {
        active: select5,
        inactive: select6
      }
    }
  },
  mounted() {
    this.actives = this.active
  },
  beforeDestroy() {},
  methods: {
    goUrl(tab, event) {
      this.$emit('goUrl', this.actives)
    }
  }
}
</script>
  