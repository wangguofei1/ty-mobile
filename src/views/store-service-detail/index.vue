<template>
  <div>
    <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="getQueryType"></topNav>
    <div class="storeServiceTitle">
      门店服务情况总览
    </div>
    <div class="storeServiceChart">
      <van-tabs v-model="active" title-active-color="#389AFC" color="#389AFC">
        <van-tab title="信息完善度">
          <infoRateChart v-if="infoRate.length>0" :chartData="infoRate"></infoRateChart>
          <div class="noData" v-if="!infoRate.length">暂无数据</div>
        </van-tab>
        <van-tab title="回访率">
          <returnRatioChart v-if="returnRatio.length>0" :chartData="returnRatio"></returnRatioChart>
          <div class="noData" v-if="!returnRatio.length">暂无数据</div>
        </van-tab>
        <van-tab title="配送时效">
          <timeDiffAvgChart v-if="timeDiffAvg.length>0" :chartData="timeDiffAvg"></timeDiffAvgChart>
          <div class="noData" v-if="!timeDiffAvg.length">暂无数据</div>
        </van-tab>
        <van-tab title="患教次数">
          <eduTimesAvgChart v-if="eduTimesAvg.length>0" :chartData="eduTimesAvg"></eduTimesAvgChart>
          <div class="noData" v-if="!eduTimesAvg.length">暂无数据</div>
        </van-tab>
      </van-tabs>
    </div>
    <div class="xstitle">门店列表</div>
    <div class="xsBox" v-if="shopList.length>0">
      <div class="xsItem" v-for="(item, index) in shopList" :key="index">
        <div class="xsTitle">
          <div>
            <div class="shopName">{{ item.name }} <span class="sectionName">{{item.sectionName}}</span>
            </div>
            <div class="shopInfo">
              <div>
                <p>信息完善度</p>
                <p class="shopInfoData">{{ item.infoRate}}</p>
              </div>
              <div>
                <p>回访率</p>
                <p class="shopInfoData">{{ item.returnRatio}}</p>
              </div>
              <div>
                <p>配送时效</p>
                <p class="shopInfoData">{{ item.timeDiffAvg}}</p>
              </div>
              <div>
                <p>患教次数</p>
                <p class="shopInfoData">{{ item.eduTimesAvg}}</p>
              </div>
            </div>
            <div class="shopVip">
              <p>患者总数：<span>{{item.customerNum}}</span></p>
              <p>新患者占比：<span>{{item.newCustomerRate}}</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
      
<script>
import { shopServiceList, shopServiceCharts } from '@/api/home'
import topNav from "../../components/topNav.vue"
import infoRateChart from './component/infoRateChart.vue'
import returnRatioChart from './component/returnRatioChart.vue'
import timeDiffAvgChart from './component/timeDiffAvgChart.vue'
import eduTimesAvgChart from './component/eduTimesAvgChart.vue'
export default {
  name: 'storeServiceDetail',
  components: { topNav, infoRateChart, returnRatioChart, timeDiffAvgChart, eduTimesAvgChart },
  data() {
    return {
      queryType: '1',
      ruleForm: {
        time: "year",
        year: "",
        startMonth: "",
        endMonth: "",
        goods: "",
        bigArea: "",
        middleArea: "",
        provienceArea: "",
        shop: "",
        page: 1,
        pageSize: 5
      },
      isShow: false,
      active: 0,
      total: 0,
      serviceList: [], //月度统计数据
      returnRatio: [], //回访率
      infoRate: [], //信息完善度
      timeDiffAvg: [], //平均配送时效
      eduTimesAvg: [], //平均患教次数
      shopList: []
    }
  },
  created() {
    this.getQueryType()
  },
  methods: {
    async getData() {
      this.ruleForm.pageSize = 5
      const res = await shopServiceCharts(this.ruleForm)
      const result = await shopServiceList(this.ruleForm)
      let { data: shopList } = result.data
      let { returnRatio, infoRate, eduTimesAvg, timeDiffAvg } = res.data;
      this.returnRatio = returnRatio
      this.infoRate = infoRate
      this.eduTimesAvg = eduTimesAvg
      this.timeDiffAvg = timeDiffAvg
      this.shopList = shopList
    },
    async getQueryType(form) {
      this.saleList = []
      const res = await shopServiceCharts({queryType: this.queryType, page: 1, pageSize: 5})
      const result = await shopServiceList({queryType: this.queryType, page: 1, pageSize: 5})
      let { data: shopList } = result.data
      let { returnRatio, infoRate, eduTimesAvg, timeDiffAvg } = res.data;
      this.returnRatio = returnRatio
      this.infoRate = infoRate
      this.eduTimesAvg = eduTimesAvg
      this.timeDiffAvg = timeDiffAvg
      this.shopList = shopList
    },
    changeForm(form) {
      this.saleList = []
      this.ruleForm = form
      this.getData()
    },
  }
}
</script>
      
<style lang="scss" scoped>
.storeServiceTitle {
  text-align: center;
  font-size: 16px;
  margin-top: 20px;
}

.storeServiceChart {
  background-color: #fff;
  margin: 20px 10px;
}

.xstitle {
  font-weight: 700;
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
}

.xstitle::after {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 1px;
  background: rgba(56, 154, 252, 1);
  position: absolute;
  font-size: 15px;
  left: 15px;
  top: 1px;
}
.noData {
  height: 50px;
  color: #666;
  text-align: center;
  font-size: 18px;
  margin-top: 20px;
}
.xsBox {
  padding: 15px;
  box-sizing: border-box;

  .xsItem {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;

    .shopName {
      font-size: 14px;

      .sectionName {
        padding: 3px 5px;
        opacity: 0.7;
        /** 文本1 */
        font-size: 13px;
        font-weight: 500;
        letter-spacing: 0px;
        color: rgba(56, 154, 252, 1);
        text-align: center;
        vertical-align: top;
        background: rgba(236, 245, 255, 1);

        border: 1px solid rgba(198, 226, 255, 1);

      }
    }

    .shopInfo {
      display: flex;
      justify-content: space-between;
      color: rgba(128, 128, 128, 1);
      flex-wrap: wrap;
      // margin: 10px 0;
      border-bottom: 1px solid #ddd;
      text-align: center;

      .shopInfoData {
        color: rgba(42, 130, 228, 1);
      }
    }

    .shopVip {
      display: flex;
      justify-content: space-between;
      color: rgba(128, 128, 128, 1);
      // padding: 0px 10px;
      flex-wrap: wrap;



      p {
        padding: 10px 0;
        margin: 0;
        // width: 100%;
        text-align: right;

        span {
          color: rgba(255, 141, 26, 1);
        }
      }
    }
  }
}

.flex1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.title1 {
  height: 0.733rem;

  .content1 {
    box-sizing: border-box;
    width: 50%;
    justify-content: flex-end;
    align-items: center;

    img {
      width: 50%;
      height: 50%;
    }
  }
}
</style>
<style lang="scss">
.title1 {
  .van-tabs--line {
    .van-tabs__wrap {
      height: 0.733rem !important;
    }
  }
}

.title1 .van-tabs__line {
  width: 15px;
}
</style>