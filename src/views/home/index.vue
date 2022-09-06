<!-- home -->
<template>
  <div>
    <header class="headBox">
      <van-tabs v-model="active">
        <van-tab title="今日统计"></van-tab>
        <van-tab title="本月统计"></van-tab>
        <van-tab title="季度统计"></van-tab>
        <van-tab title="本年统计"></van-tab>
      </van-tabs>
      <panel-group
        :dotInfo="dotInfo"
        :salesNumInfo="salesNumInfo"
        :salesPriceInfo="salesPriceInfo"
        :salesInfo="salesInfo"
        @handleClick1="getClick1"
        @handleClick2="getClick2"
        @handleClick3="getClick3"
        @handleClick4="getClick4"
      />
    </header>
  </div>
</template>

<script>
import { queryDot, querySalesPrice, querySalesNum, querySalesInfo } from '@/api/home'
import PanelGroup from './component/PanelGroup'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
export default {
  name: 'index',
  components: {
    PanelGroup
  },
  data() {
    return {
      salesPriceInfo: {},
      salesNumInfo: {},
      dotInfo: {},
      salesInfo: {},
      show: true,
      active: 0
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
    },
    // 查DOT
    queryDot() {
      queryDot({
        queryType: this.dateActive,
        medicineId: this.dotData.medicineId
      }).then(res => {
        if (res.code == 0) {
          this.dotInfo = res.data[0]
        }
      })
    },
    // 查患者数
    querySalesInfo() {
      querySalesInfo({
        queryType: this.dateActive,
        medicineId: this.salesInfoData.medicineId
      }).then(res => {
        if (res.code == 0) {
          this.salesInfo = res.data[0]
        }
      })
    },
    // 查销售额
    querySalesPrice() {
      querySalesPrice({
        queryType: this.dateActive,
        medicineId: this.salesPriceData.medicineId
      }).then(res => {
        if (res.code == 0) {
          this.salesPriceInfo = res.data[0]
        }
      })
    },
    // 查销售数量
    querySalesNum() {
      querySalesNum({
        queryType: this.dateActive,
        medicineId: this.salesNumData.medicineId
      }).then(res => {
        if (res.code == 0) {
          this.salesNumInfo = res.data[0]
        }
      })
    },
    // 切换规格
    getClick1(item) {
      this.salesPriceData.medicineId = item
      this.querySalesPrice()
    },
    getClick2(item) {
      this.salesNumData.medicineId = item
      this.querySalesNum()
    },
    getClick3(item) {
      this.dotData.medicineId = item
      this.queryDot()
    },
    getClick4(item) {
      console.log('cpnclick', item)
    }
  }
}
</script>
<style lang="scss" scoped>
.headBox {
  width: 375px;
  height: 171px;
  opacity: 1;
  background: linear-gradient(180deg, rgba(56, 154, 252, 1) 22.92%, rgba(243, 246, 253, 1) 100%);
}
</style>
<style lang="scss">
.headBox {
  .van-tabs__nav {
    background: unset;
  }
  .van-tab--active,
  .van-tab {
    color: #fff;
    font-size: 14px;
  }
  .van-tabs__line {
    background: #fff;
    width: 30px;
  }
}
</style>