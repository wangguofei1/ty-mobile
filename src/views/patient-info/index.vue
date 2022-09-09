<template>
  <div>
    <div class="flex1 title1" style="background: #2b92f9; padding: 7px 0">
      <div style="width: 50%">
        <van-tabs
          v-model="ruleForm.queryType"
          background="#2b92f9"
          color="#fff"
          title-inactive-color="#fff"
          title-active-color="#fff"
        >
          <van-tab title="本年" name="1"></van-tab>
          <van-tab title="本季度" name="2"></van-tab>
          <van-tab title="本月" name="3"></van-tab>
        </van-tabs>
      </div>
      <div class="flex1 content1" @click="isShow = isShow ? false : true">
        <span style="color: #fff">筛选</span>
        <span v-show="!isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 1@3x.png"
        /></span>
        <span v-show="isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 2@3x.png"
        /></span>
      </div>
    </div>
    <!-- 信息卡 -->
    <div class="customer-info">
      <div class="info-card" style="background-color: #2d8effff">
        <p style="font-size: 14px; margin-top: 5px">患者总数</p>
        <p style="font-size: 20px">123112</p>
        <div style="background: linear-gradient(to left, #2eccfa, white, #2eccfa); height: 1px"></div>
        <p style="font-size: 16px">同比：35.56%</p>
        <p style="font-size: 16px">环比：35.56%</p>
      </div>
      <div class="info-card" style="background-color: rgba(0, 186, 173, 1)">
        <p style="font-size: 14px; margin-top: 5px">患者总数</p>
        <p style="font-size: 20px">123112</p>
        <div
          style="background: linear-gradient(to left, rgba(0, 186, 173, 1), white, rgba(0, 186, 173, 1)); height: 1px"
        ></div>
        <p style="font-size: 16px">同比：35.56%</p>
        <p style="font-size: 16px">环比：35.56%</p>
      </div>
      <div class="info-card" style="background-color: rgba(255, 141, 26, 1)">
        <p style="font-size: 14px; margin-top: 5px">患者总数</p>
        <p style="font-size: 20px">123112</p>
        <div
          style="background: linear-gradient(to left, rgba(255, 141, 26, 1), white, rgba(255, 141, 26, 1)); height: 1px"
        ></div>
        <p style="font-size: 16px">同比：35.56%</p>
        <p style="font-size: 16px">环比：35.56%</p>
      </div>
      <div class="info-card" style="background-color: #be81f7">
        <p style="font-size: 14px; margin-top: 5px">患者总数</p>
        <p style="font-size: 20px">123112</p>
        <div style="background: linear-gradient(to left, #be81f7, white, #be81f7); height: 1px"></div>
        <p style="font-size: 16px">同比：35.56%</p>
        <p style="font-size: 16px">环比：35.56%</p>
      </div>
    </div>

    <!-- 患者图表 -->
    <div class="info-chart">
      <div class="chart-title">患者数据统计</div>
      <div style="font-size: 12px">
        <van-tabs v-model="activeChart" color="#2D8EFFFF">
          <van-tab title="患者数量">
            <div class="barChart">
              <div class="indexRow flex1" style="justify-content: space-between">
                <div class="flex1"></div>
              </div>
              <div style="padding: 5px">
                <bar-chart
                  v-if="medicine1Data.length > 0"
                  :medicine1Data="medicine1Data"
                  :medicine2Data="medicine2Data"
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="患者DOT">
            <div class="barChart">
              <div class="indexRow flex1" style="justify-content: space-between">
                <div class="flex1"></div>
              </div>
              <div style="padding: 5px">
                <bar-chart
                  v-if="medicine1Data.length > 0"
                  :medicine1Data="medicine1Data"
                  :medicine2Data="medicine2Data"
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="新增患者">
            <div class="barChart">
              <div class="indexRow flex1" style="justify-content: space-between">
                <div class="flex1"></div>
              </div>
              <div style="padding: 5px">
                <bar-chart
                  v-if="medicine1Data.length > 0"
                  :medicine1Data="medicine1Data"
                  :medicine2Data="medicine2Data"
                />
              </div>
            </div>
          </van-tab>
          <van-tab title="患者脱落数量">
            <div class="barChart">
              <div class="indexRow flex1" style="justify-content: space-between">
                <div class="flex1"></div>
              </div>
              <div style="padding: 5px">
                <bar-chart
                  v-if="medicine1Data.length > 0"
                  :medicine1Data="medicine1Data"
                  :medicine2Data="medicine2Data"
                />
              </div>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { queryHospitalSales } from '@/api/salesFlow'
import saleForm from '../../components/saleForm/index.vue'
import hosImg from '@/assets/images/hospitalImg.png'
import barChart from './components/BarChart.vue'
export default {
  name: 'SalesFlow',
  components: { saleForm, barChart },
  data() {
    return {
      ruleForm: {
        queryType: '1',
        year: '',
        startMonth: '',
        endMonth: '',
        productId: 127,
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
      },
      isShow: false,
      page: 1,
      pageNum: 10,
      loading: false,
      saleList: [],
      finished: false,
      count: 0,
      hosImg: hosImg,
      medicine1Data: [6, 5, 8, 6, 7, 9, 8, 5, 4, 3, 2, 1],
      medicine2Data: [10, 9, 8, 7, 5, 4, 3, 4, 5, 5, 6, 7],
      activeChart: 0
    }
  },
  created() {
    this.queryHospitalSales({ queryType: this.ruleForm.queryType, page: this.page, pageNum: this.pageNum })
  },
  methods: {
    // 医院流向数据
    queryHospitalSales(form) {
      var that = this
      queryHospitalSales(form).then(res => {
        if (res.code == 0) {
          that.count = res.data.count
          that.saleList = that.saleList.concat(res.data.data)
        }
      })
    },
    // 跳到详情页
    xsGoDetail(item) {
      this.$router.push({
        name: 'HospitalDataFlow',
        query: { hospital: JSON.stringify(item) }
      })
    },
    changeForm(form) {
      this.saleList = []
      console.log(form)
      form.queryType = this.ruleForm.queryType
      form.page = this.page
      form.pageNum = this.pageNum
      this.queryHospitalSales(form)
    },
    onLoad() {
      setTimeout(() => {
        this.page++
        this.queryHospitalSales({ queryType: this.ruleForm.queryType, page: this.page, pageNum: this.pageNum })
        // 加载状态结束
        this.loading = false

        // 数据全部加载完成
        if (this.saleList.length >= this.count) {
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>
  
  <style lang="scss" scoped>
.xsBox {
  padding: 15px;
  box-sizing: border-box;
  .xsItem {
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;
    .xsTitle {
      display: flex;
      width: calc(100%-30px);
      margin: 0 15px;
      .xsImg {
        width: 36px;
        height: 36px;
      }
      .xsText {
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
        color: rgba(25, 28, 47, 1);
        margin-left: 10px;
        max-width: 190px;
      }
      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        width: 78px;
        color: rgba(58, 160, 255, 1);
        font-size: 14px;
      }
    }
    .xsContent {
      width: calc(100%-30px);
      margin: 10px 15px 23px 15px;
      display: flex;
      .xsNumBox,
      .xsNumBox1 {
        padding-left: 5px;
        width: calc(50% - 3px);
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
        .yeFont {
          margin-top: 6px;
          color: rgba(255, 141, 26, 1);
        }
      }
      .xsNumBox1 {
        padding-left: 28px;
      }
      > .xsNumBox:first-child {
        border-right: 1px solid rgba(245, 245, 245, 1);
      }
    }
    .xsFoot {
      width: 100%;
      height: 37px;
      background: rgba(250, 250, 250, 1);
      padding: 0 15px;
      line-height: 37px;
      display: flex;
      .xsFootBox,
      .xsFootBox1 {
        padding-left: 5px;
        width: calc(50% - 2px);
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
        .blkFont {
          color: #000;
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
  <style lang="scss" scoped>
.van-tab {
  font-size: 12px;
}
.customer-info {
  height: 210px;
  position: relative;
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;

  .info-card { 
    width: 140px;
    height: 165px;
    margin: 17px 10px 20px 10px;
    background-color: #2eccfa;
    position: relative;
    border-radius: 10px;
    display: inline-block;
    text-align: center;
    overflow: hidden;
    padding: 10px;
    color: white;
    border-top：1px solid transparent； .card-title {
      position: relative;
      display: block;
    }
  }
}
.info-chart {
  width: 335px;
  border-radius: 10px;
  margin: 20px auto 0;
  background-color: #fff;

  .chart-title {
    background-color: #2d8effff;
    border-radius: 10px 10px 0 0;
    color: white;
    padding: 15px;
    font-size: 14px;
  }
}

.chartBox {
  width: 100%;
  box-sizing: border-box;
  margin-top: 10px;

  .barChart {
    margin: 0 15px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    height: 268px;
    width: calc(100%-30px);
    border-radius: 8px;
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
</style>