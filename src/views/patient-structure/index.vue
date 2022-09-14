<template>
  <div>
    <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="getQueryType"></topNav>
    <div class="chartBox">
      <div class="dotBox">
        <div class="dotTitle">
          <img class="dotImg" src="@/assets/images/fenbuImg.png" />
          <div class="dotText">按DOT分布</div>
        </div>
        <div class="mapBox">
          <div id="chartBox1" ref="chartBox1" style="height: 366px; width: 100%" />
        </div>
      </div>
    </div>
    <div class="chartBox">
      <div class="dotBox">
        <div class="dotTitle">
          <img class="dotImg" src="@/assets/images/fenbuImg.png" />
          <div class="dotText">按适应症分布</div>
        </div>
        <div class="mapBox">
          <div id="chartBox2" ref="chartBox2" style="height: 366px; width: 100%" />
        </div>
      </div>
    </div>
    <div class="chartBox">
      <div class="dotBox">
        <div class="fxTitle">
          <div class="fxText">患者分布占比分析</div>
          <van-tabs
            v-model="active"
            color="rgba(56, 154, 252, 1)"
            title-inactive-color="rgba(56, 154, 252, 1)"
            title-active-color="rgba(56, 154, 252, 1)"
          >
            <van-tab title="省区" name="1"> </van-tab>
            <van-tab title="年龄" name="2"> </van-tab>
            <van-tab title="性别" name="3"> </van-tab>
            <van-tab title="BMI" name="4"> </van-tab>
          </van-tabs>
        </div>
        <div class="mapBox">
          <div id="smallChartBox1" v-show="active == 1" class="smallBox"></div>
          <div id="smallChartBox2" v-show="active == 2" class="smallBox"></div>
          <div id="smallChartBox3" v-show="active == 3" class="smallBox"></div>
          <div id="smallChartBox4" v-show="active == 4" class="smallBox"></div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import topNav from '../../components/topNav.vue'
import { getPatientStructure } from '@/api/salesFlow'
import * as echarts from 'echarts'
import _ from 'lodash'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'PatientStructure',
  components: { topNav },
  data() {
    return {
      active: 1,
      queryType: '1',
      ruleForm: {
        year: '2022',
        startMonth: '',
        endMonth: '',
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
      },
      isShow: false,
      dotRange: [],
      locationRange: [],
      ageRange: [],
      diseaseRange: [],
      genderRange: [],
      bmiRange: []
    }
  },
  created() {},
  mounted() {
    this.getPatientStructure({ queryType: this.queryType })
  },
  methods: {
    getQueryType(form) {
      this.queryType = form
      this.getPatientStructure({ queryType: this.queryType })
    },
    changeForm(form) {
      for (let keys in this.ruleForm) {
        if (form[keys]) {
          this.ruleForm[keys] = form[keys]
        }
      }
      if (this.ruleForm.queryType) {
        delete this.ruleForm.queryType
      }
      this.getPatientStructure(this.ruleForm)
    },
    // 医院流向数据
    getPatientStructure(form) {
      this.ruleForm = form
      getPatientStructure(this.ruleForm).then(res => {
        if (res.code == 0) {
          this.dotRange = res.data.dotRange
          this.locationRange = res.data.locationRange
          this.ageRange = res.data.ageRange
          this.diseaseRange = res.data.diseaseRange
          this.genderRange = res.data.genderRange
          this.bmiRange = res.data.bmiRange
        }
        this.initCharts1()
        this.initCharts2()
        this.initSmallChartBox1()
        this.initSmallChartBox2()
        this.initSmallChartBox3()
        this.initSmallChartBox4()
      })
    },
    initCharts1() {
      var arr1 = this.dotRange.map((item, index) => {
        if (index < 4) {
          return item.name
        }
      })
      var arr2 = this.dotRange.map((item, index) => {
        if (index > 3) {
          return item.name
        }
      })
      const charts1 = echarts.init(document.getElementById('chartBox1'), 'macarons')
      charts1.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: [
          {
            type: 'scroll',
            orient: 'vertical',
            bottom: 20,
            left: 60,
            data: arr1
          },
          {
            type: 'scroll',
            orient: 'vertical',
            bottom: 42,
            right: 60,
            data: arr2
          }
        ],
        series: [
          {
            top: -105,
            label: {
              show: true,
              position: 'inside',
              formatter: function (arg) {
                return arg.value
              }
            },
            emphasis: {
              label: {
                show: true
              }
            },
            name: '按DOT分布',
            type: 'pie',
            radius: [0, 100],
            data: this.dotRange
          }
        ]
      })
    },
    initCharts2() {
      var arr1 = this.diseaseRange.map((item, index) => {
        if (index < 3) {
          return item.name
        }
      })
      var arr2 = this.diseaseRange.map((item, index) => {
        if (index > 2) {
          return item.name
        }
      })
      const charts2 = echarts.init(document.getElementById('chartBox2'), 'macarons')
      charts2.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: [
          {
            type: 'scroll',
            orient: 'vertical',
            bottom: 20,
            left: 60,
            data: arr1
          },
          {
            type: 'scroll',
            orient: 'vertical',
            bottom: 42,
            right: 60,
            data: arr2
          }
        ],
        series: [
          {
            name: '按适应症分布',
            type: 'pie',
            radius: ['40%', '70%'],
            top: -80,
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: function (arg) {
                return arg.value
              }
            },
            emphasis: {
              label: {
                show: true
              }
            },
            labelLine: {
              show: false
            },
            data: this.diseaseRange
          }
        ]
      })
    },
    initSmallChartBox1() {
      const charts = echarts.init(document.getElementById('smallChartBox1'), 'macarons')
      charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          data: _.map(this.locationRange, function (v) {
            return v.name
          }),
          bottom: 60,
          textStyle: {
            color: '#999999',
            fontSize: 12,
            align: 'left',
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: 'transparent',
            rich: {
              b: {
                width: 200
              }
            }
          }
        },
        series: [
          {
            type: 'pie',
            top: -125,
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: function (arg) {
                return arg.value
              }
            },
            emphasis: {},
            labelLine: {},
            data: this.locationRange
          }
        ]
      })
    },
    initSmallChartBox2() {
      const charts = echarts.init(document.getElementById('smallChartBox2'), 'macarons')
      charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          data: _.map(this.ageRange, function (v) {
            return v.name
          }),
          bottom: 60,
          textStyle: {
            color: '#999999',
            fontSize: 12,
            align: 'left',
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: 'transparent',
            rich: {
              b: {
                width: 200
              }
            }
          }
        },
        series: [
          {
            name: '按年龄分布',
            type: 'pie',
            top: -125,
            radius: ['30%', '50%'],
            avoidLabelOverlap: false,
            label: {
              show: true,
              position: 'inside',
              formatter: function (arg) {
                return arg.value
              }
            },
            emphasis: {},
            labelLine: {},
            data: this.ageRange
          }
        ]
      })
    },
    initSmallChartBox3() {
      var BorderWidth = '6'
      var total = _.sum(
        _.map(this.genderRange, function (v) {
          return v.value
        })
      )
      var maleNum = _.filter(this.genderRange, function (v) {
        return v.name === '男'
      })[0].value
      var femaleNum = _.filter(this.genderRange, function (v) {
        return v.name === '女'
      })[0].value
      var unknownNum = _.filter(this.genderRange, function (v) {
        return v.name === '未知'
      })[0].value
      //反方向剩下部分的样式
      var placeHolderStyle = {
        normal: {
          label: {
            show: false,
          },
          labelLine: {
            show: false
          },
          color: 'transparent',
          borderColor: 'transparent',
          borderWidth: 6
        },
        emphasis: {
          color: 'transparent',
          borderColor: 'transparent',
          borderWidth: 0
        }
      }
      const option = {
        tooltip: {
          trigger: 'item',
          formatter: function (params) {
            var percent = ((params.value / total) * 100).toFixed(1)
            return `${params.name}${params.value} <br/> 占比${percent}%`
          }
        },
        color: ['#7B79FF', '#FFB0E2', '#59CFFF'],
        legend: [
          {
            icon: 'bar',
            data: ['男', '女'],
            itemGap: 60,
            itemWidth: 14,
            y: '240',
            x: '100'
          },
          {
            icon: 'bar',
            data: ['不详'],
            itemGap: 60,
            itemWidth: 14,
            y: '260',
            x: '100'
          }
        ],
        series: [
          {
            name: '男',
            type: 'pie',
            top: -125,
            clockWise: true, //顺时加载
            hoverAnimation: false, //鼠标移入变大
            radius: ['50%', '51%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: '#7B79FF',
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            },
            data: [
              {
                value: maleNum,
                name: '男'
              },
              {
                value: total - maleNum,
                name: '',
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: '女',
            top: -125,
            type: 'pie',
            clockWise: true,
            hoverAnimation: false,
            radius: ['40%', '41%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: '#FFB0E2',
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            },
            data: [
              {
                value: femaleNum,
                name: '女'
              },
              {
                value: total - femaleNum,
                name: '',
                itemStyle: placeHolderStyle
              }
            ]
          },
          {
            name: '不详',
            type: 'pie',
            top: -125,
            clockWise: true,
            hoverAnimation: false,
            radius: ['30%', '31%'],
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  position: "inside",
                  formatter: function (arg) {
                    return arg.value;
                  },
                },
                borderWidth: BorderWidth,
                shadowBlur: 40,
                borderColor: '#59CFFF',
                shadowColor: 'rgba(0, 0, 0, 0)'
              }
            },
            data: [
              {
                value: unknownNum,
                name: '不详'
              },
              {
                value: total - unknownNum,
                name: '',
                itemStyle: placeHolderStyle
              }
            ]
          }
        ]
      }
      const charts = echarts.init(document.getElementById('smallChartBox3'), 'macarons')
      charts.setOption(option)
    },
    initSmallChartBox4() {
      const charts = echarts.init(document.getElementById('smallChartBox4'), 'macarons')
      charts.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'horizontal',
          icon: 'circle',
          data: _.map(this.bmiRange, function (v) {
            return v.name
          }),
          bottom: 60,
          textStyle: {
            color: '#999999',
            fontSize: 12,
            align: 'left',
            // 文字块背景色，一定要加上，否则对齐不会生效
            backgroundColor: 'transparent',
            rich: {
              b: {
                width: 200
              }
            }
          }
        },
        series: [
          {
            name: '按BMI分布',
            type: 'pie',
            top: -125,
            radius: '50%',
            data: this.bmiRange,
            label: {
              show: true,
              position: 'inside',
              formatter: function (arg) {
                return arg.value
              }
            },
            labelLine: {
              show: false
            }
          }
        ]
      })
    }
  }
}
</script>
  
  <style lang="scss" scoped>
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
.chartBox {
  padding: 14px 15px;
  .dotBox {
    background: #fff;
    .dotTitle {
      display: flex;
      width: calc(100%-30px);
      height: 50px;
      box-sizing: border-box;
      padding: 13px 15px;
      border-bottom: 1px solid rgba(216, 220, 229, 1);
      .dotImg {
        width: 26.84px;
        height: 20px;
        position: relative;
        top: 2px;
      }
      .dotText {
        margin-left: 10px;
        height: 22px;
        font-size: 15px;
        font-weight: 700;
        color: rgba(25, 28, 47, 1);
      }
    }
    .fxTitle {
      width: 100%;
      height: 88px;
      background: linear-gradient(180deg, rgba(233, 241, 253, 1) 0%, rgba(255, 255, 255, 0) 100%);
      text-align: center;
      padding-top: 12px;
      box-sizing: border-box;
      .fxText {
        font-size: 16px;
        font-weight: 700;
        margin-bottom: 5px;
        color: rgba(25, 28, 47, 1);
        vertical-align: top;
      }
    }
    .mapBox {
      height: 373px;
      width: 100%;
      padding: 15px;
      box-sizing: border-box;
      .smallBox {
        width: 325px;
        height: 360px;
      }
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