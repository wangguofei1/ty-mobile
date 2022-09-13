<template>
  <div>
    <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="getQueryType"></topNav>
    <!-- 信息卡 -->
    <div class="customer-info">
      <div class="info-card" style="background-color: #2d8effff">
        <p style="font-size: 14px; margin-top: 5px">患者总数</p>
        <p style="font-size: 20px">{{ num.value }}人</p>
        <div style="background: linear-gradient(to left, #2eccfa, white, #2eccfa); height: 1px"></div>
        <p style="font-size: 16px">同比：{{ num.yoy }}</p>
        <p style="font-size: 16px">环比：{{ num.mom }}</p>
      </div>
      <div class="info-card" style="background-color: rgba(0, 186, 173, 1)">
        <p style="font-size: 14px; margin-top: 5px">患者DOT</p>
        <p style="font-size: 20px">{{ dot.value }}月</p>
        <div
          style="background: linear-gradient(to left, rgba(0, 186, 173, 1), white, rgba(0, 186, 173, 1)); height: 1px"
        ></div>
        <p style="font-size: 16px">同比：{{ dot.yoy }}</p>
        <p style="font-size: 16px">环比：{{ dot.mom }}</p>
      </div>
      <div class="info-card" style="background-color: rgba(255, 141, 26, 1)">
        <p style="font-size: 14px; margin-top: 5px">新增患者数</p>
        <p style="font-size: 20px">{{ newNum.value }}人</p>
        <div
          style="background: linear-gradient(to left, rgba(255, 141, 26, 1), white, rgba(255, 141, 26, 1)); height: 1px"
        ></div>
        <p style="font-size: 16px">同比：{{ newNum.yoy }}</p>
        <p style="font-size: 16px">环比：{{ newNum.mom }}</p>
      </div>
      <div class="info-card" style="background-color: #be81f7">
        <p style="font-size: 14px; margin-top: 5px">患者脱落数</p>
        <p style="font-size: 20px">{{ stopNum.value }}人</p>
        <div style="background: linear-gradient(to left, #be81f7, white, #be81f7); height: 1px"></div>
        <p style="font-size: 16px">同比：{{ stopNum.yoy }}</p>
        <p style="font-size: 16px">环比：{{ stopNum.mom }}</p>
      </div>
    </div>

    <!-- 患者图表 -->
    <div class="info-chart">
      <div class="chart-title">患者数据统计</div>
      <div style="font-size: 12px">
        <van-tabs v-model="activeChart" color="#2D8EFFFF">
          <van-tab title="患者数量"> </van-tab>
          <van-tab title="患者DOT"> </van-tab>
          <van-tab title="新增患者"> </van-tab>
          <van-tab title="患者脱落数量"> </van-tab>
        </van-tabs>
        <div class="barChart" v-show="activeChart == 0">
          <div class="indexRow flex1" style="justify-content: space-between">
            <div class="flex1"></div>
          </div>
          <div style="padding: 5px">
            <div id="chart1" style="width: 338px; height: 240px"></div>
          </div>
        </div>
        <div class="barChart" v-show="activeChart == 1">
          <div class="indexRow flex1" style="justify-content: space-between">
            <div class="flex1"></div>
          </div>
          <div style="padding: 5px">
            <div id="chart2" style="width: 338px; height: 240px"></div>
          </div>
        </div>
        <div class="barChart" v-show="activeChart == 2">
          <div class="indexRow flex1" style="justify-content: space-between">
            <div class="flex1"></div>
          </div>
          <div style="padding: 5px">
            <div id="chart4" style="width: 338px; height: 240px"></div>
          </div>
        </div>
        <div class="barChart" v-show="activeChart == 3">
          <div class="indexRow flex1" style="justify-content: space-between">
            <div class="flex1"></div>
          </div>
          <div style="padding: 5px">
            <div id="chart3" style="width: 338px; height: 240px"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import topNav from '../../components/topNav.vue'
import { queryPatientAnalysis } from '@/api/system'
import hosImg from '@/assets/images/hospitalImg.png'
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
  name: 'SalesFlow',
  components: { topNav },
  data() {
    return {
      queryType: '1',
      ruleForm: {
        year: '',
        startMonth: '',
        endMonth: '',
        productId: '',
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
      },
      saleList: [],
      num: {},
      newNum: {},
      dot: {},
      stopNum: {},
      nameList: [],
      numList: [],
      dotList: [],
      stopNumList: [],
      newNumList: [],
      activeChart: 0
    }
  },
  created() {
    this.queryHospitalSales({ queryType: this.queryType, page: this.page, pageNum: this.pageNum })
  },
  watch: {
    // activeChart: function () {
    //   this.initChart2()
    //   this.initChart3()
    //   this.initChart4()
    // }
  },
  methods: {
    getQueryType(form) {
      this.queryType = form
      this.saleList = []
      this.queryHospitalSales({ queryType: this.queryType })
    },
    // 医院流向数据
    queryHospitalSales(form) {
      var that = this
      queryPatientAnalysis(form).then(res => {
        if (res.code == 0) {
          this.num = res.data.num
          this.newNum = res.data.newNum
          this.dot = res.data.dot
          this.stopNum = res.data.stopNum
          this.nameList = []
          this.numList = []
          this.dotList = []
          this.stopNumList = []
          this.newNumList = []
          res.data.list.forEach(item => {
            this.nameList.push(item.name)
            this.numList.push(item.num)
            this.dotList.push(item.dot)
            this.stopNumList.push(item.stopNum)
            this.newNumList.push(item.newNum)
          })
          this.initChart1()
          this.initChart2()
          this.initChart3()
          this.initChart4()
        }
      })
    },
    changeForm(form) {
      form.page = this.page
      form.pageNum = this.pageNum
      this.queryHospitalSales(form)
    },
    initChart1() {
      this.chart = echarts.init(document.getElementById('chart1'), 'macarons')
      this.chart.setOption({
        title: {
          top: 10,
          text: '单位（人）',
          textStyle: {
            fontSize: 13,
            color: 'rgba(166, 166, 166, 1)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgba(96, 98, 102, 1)'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.nameList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '患者数量',
            type: 'line',
            data: this.numList,
            itemStyle: {
              color: 'rgba(58, 160, 255, 1)'
            }
          }
        ]
      })
    },
    initChart2() {
      this.chart = echarts.init(document.getElementById('chart2'), 'macarons')
      this.chart.setOption({
        title: {
          top: 10,
          text: '单位（人）',
          textStyle: {
            fontSize: 13,
            color: 'rgba(166, 166, 166, 1)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgba(96, 98, 102, 1)'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.nameList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '患者DOT',
            type: 'line',
            data: this.dotList,
            itemStyle: {
              color: 'rgba(58, 160, 255, 1)'
            }
          }
        ]
      })
    },
    initChart3() {
      this.chart = echarts.init(document.getElementById('chart3'), 'macarons')
      this.chart.setOption({
        title: {
          top: 10,
          text: '单位（人）',
          textStyle: {
            fontSize: 13,
            color: 'rgba(166, 166, 166, 1)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgba(96, 98, 102, 1)'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.nameList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '新增患者',
            type: 'line',
            data: this.newNumList,
            itemStyle: {
              color: 'rgba(58, 160, 255, 1)'
            }
          }
        ]
      })
    },
    initChart4() {
      this.chart = echarts.init(document.getElementById('chart4'), 'macarons')
      this.chart.setOption({
        title: {
          top: 10,
          text: '单位（人）',
          textStyle: {
            fontSize: 13,
            color: 'rgba(166, 166, 166, 1)'
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgba(96, 98, 102, 1)'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'category',
            data: this.nameList
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ],
        series: [
          {
            name: '患者脱落数量',
            type: 'line',
            data: this.stopNumList,
            itemStyle: {
              color: 'rgba(58, 160, 255, 1)'
            }
          }
        ]
      })
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