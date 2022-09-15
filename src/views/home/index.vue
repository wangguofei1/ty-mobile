<!-- home -->
<template>
  <div>
    <header class="headBox">
      <div class="tebBox">
        <van-tabs @click="handleClick" v-model="queryType">
          <van-tab name="1" title="本年统计"></van-tab>
          <van-tab name="2" title="季度统计"></van-tab>
          <van-tab name="3" title="本月统计"></van-tab>
          <van-tab name="4" title="今日统计"></van-tab>
        </van-tabs>
      </div>
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
    <div class="chartBox">
      <div class="barChart">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/xsImg.png" />
          <div class="headTitle">年度销售统计</div>
        </div>
        <div style="padding: 5px">
          <bar-chart v-if="medicine1Data.length > 0" :medicine1Data="medicine1Data" :medicine2Data="medicine2Data" />
        </div>
      </div>
    </div>
    <div class="chartBox mt15">
      <div class="phTable">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/xsImg.png" />
          <div class="headTitle">门店销售排行榜（TOP10）</div>
          <!-- <div class="showAll" @click="height = height == '244px' ? 'auto' : '244px'">
            {{ height == '244px' ? '查看全部' : '收起' }}
          </div> -->
        </div>
        <div :style="{ height: 'auto' }" style="padding: 10px; overflow: hidden">
          <ul>
            <li class="pbBox">
              <div class="firstPb">排行</div>
              <div class="secondPb">药房</div>
              <div class="thirdPb">本月销售额（万元）</div>
            </li>
            <li v-for="(item, index) in shopSaleList" :key="index" class="pbBox bgfff">
              <div class="firstPb">
                <img v-if="index == 0" src="@/assets/images/gold.png" />
                <img v-if="index == 1" src="@/assets/images/silver.png" />
                <img v-if="index == 2" src="@/assets/images/bronze.png" />
                <div v-if="index > 2">{{ index + 1 }}</div>
              </div>
              <div class="secondPb">
                {{ item.shopName }}
              </div>
              <div class="thirdPb">￥{{ item.salePrice }}</div>
            </li>
            <li v-if="shopSaleList.length == 0" class="noData">暂无数据</li>
          </ul>
        </div>
      </div>
    </div>
    <foot-bar @goUrl="toUrl" :active="tabActive"></foot-bar>
  </div>
</template>

<script>
import {
  queryDot,
  querySalesPrice,
  querySalesNum,
  querySalesInfo,
  queryMonthSalesPrice,
  queryShopSale
} from '@/api/home'
import { mapGetters } from 'vuex'
import { Dialog } from 'vant'
export default {
  name: 'Home',
  components: {
    PanelGroup: () => import('./component/PanelGroup'),
    BarChart: () => import('./component/BarChart'),
    footBar: () => import('@/components/footBar')
  },
  data() {
    return {
      salesPriceInfo: {},
      salesNumInfo: {},
      dotInfo: {},
      salesInfo: {},
      show: true,
      showAll: true,
      queryType: 1,
      salesPriceInfo: {},
      salesPriceData: {
        medicineId: ''
      },
      dotInfo: {},
      dotData: {
        medicineId: ''
      },
      salesNumInfo: {},
      salesNumData: {
        medicineId: ''
      },
      salesInfo: {},
      salesInfoData: {
        medicineId: ''
      },
      shopSaleList: [],
      medicine1Data: [],
      medicine2Data: [],
      height: '244px',
      tabActive: 0
    }
  },
  created() {
    this.querySalesPrice()
    this.querySalesNum()
    this.queryMonthSalesPrice()
    this.queryShopSale()
    setTimeout(() => {
      this.queryDot()
    }, 2000)
    setTimeout(() => {
      this.querySalesInfo()
    }, 3000)
  },
  computed: {},

  mounted() {},

  methods: {
    toUrl(e) {
      if (e == 1) {
        this.$router.push({
          name: 'DataAnalysis'
        })
      } else if (e == 2) {
        this.$router.push({
          name: 'PersonalCenter'
        })
      }
    },
    // 切换年季月日
    handleClick(name, title) {
      // this.queryDot()
      this.querySalesPrice()
      this.querySalesNum()
      // this.querySalesInfo()
      setTimeout(() => {
        this.queryDot()
      }, 2000)
      setTimeout(() => {
        this.querySalesInfo()
      }, 3000)
      this.queryShopSale()
    },
    showPopup() {
      Dialog.alert({
        message: res.msg
      })
      this.show = true
    },
    // 查DOT
    queryDot() {
      queryDot({
        queryType: this.queryType,
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
        queryType: this.queryType,
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
        queryType: this.queryType,
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
        queryType: this.queryType,
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
      this.salesInfoData.medicineId = item
      this.querySalesInfo()
    },
    // 每月销售柱状图
    queryMonthSalesPrice() {
      queryMonthSalesPrice({
        queryType: this.queryType,
        type: 2
      }).then(res => {
        if (res.code == 0) {
          let arr1 = []
          let arr2 = []
          res.data.monthSalesNum160.forEach(item => {
            arr1.push(item.salesNum)
          })
          res.data.monthSalesNum357.forEach(item => {
            arr2.push(item.salesNum)
          })
          this.medicine1Data = arr1
          this.medicine2Data = arr2
        }
      })
    },
    // 门店排行榜
    queryShopSale() {
      queryShopSale({
        queryType: this.queryType
      }).then(res => {
        this.shopSaleList = []
        if (res.code == 0) {
          this.shopSaleList = res.data
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.headBox {
  width: 100%;
  box-sizing: border-box;
  padding: 15px;
  background: linear-gradient(180deg, rgba(56, 154, 252, 1) 22.92%, rgba(243, 246, 253, 1) 100%);
}
.noData {
  height: 50px;
  color: #666;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
.chartBox {
  width: 100%;
  box-sizing: border-box;
  .barChart {
    margin: 0 15px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    height: 268px;
    width: calc(100%-30px);
    border-radius: 8px;
  }
  .phTable {
    margin: 0 15px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    height: auto;
    padding-bottom: 12px;
    width: calc(100%-30px);
    border-radius: 8px;
    .pbBox {
      display: flex;
      background: rgba(245, 247, 250, 1);
      padding: 9px;
      color: rgba(127, 143, 164, 1);
      font-size: 14px;
      .firstPb {
        width: 15%;
      }
      .secondPb {
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .thirdPb {
        width: 30%;
        text-align: right;
        padding-right: 12px;
      }
    }
    .bgfff {
      background-color: #fff;
      border-bottom: 1px solid rgba(216, 220, 229, 1);
      line-height: 30px;
      box-sizing: border-box;
      height: 42px;
    }
  }
  .indexRow {
    position: relative;
    display: flex;
    width: 347px;
    line-height: 42px;
    font-size: 15px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
    border-bottom: 1px solid rgba(216, 220, 229, 1);

    .indexMg {
      height: 25px;
      margin-right: 10px;
      position: relative;
      top: 7px;
      left: 11px;
    }
    .headTitle {
      margin-left: 10px;
      color: #000;
    }
    .showAll {
      color: rgba(24, 144, 255, 1);
      margin-left: auto;
      margin-right: 20px;
    }
  }
}
.mt15 {
  margin-top: 15px;
  margin-bottom: 58px;
}
</style>
<style lang="scss">
.headBox {
  .tebBox {
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
}
</style>