<template>
  <div>
    <div class="xsBg"></div>
    <div class="xsBox1">
      <div class="xsBoxSty"></div>
      <div class="xsItem1">
        <div class="xsTitle1">
          <div>
            <div class="xsText1">{{ hospitalOfficeSales.name }}</div>
            <div class="tagBox">
              <div class="tag1">特药定点</div>
              <div class="tag2">医保定点</div>
            </div>
            <div class="sqMedicine">授权药品：拓益</div>
            <div class="sqMedicine">开办时间：{{ hospitalOfficeSales.createTime }}</div>
            <div class="sqMedicine">电话：{{ hospitalOfficeSales.phone }}</div>
            <div class="sqMedicine">所属：{{ hospitalOfficeSales.address }}</div>
          </div>
          <img class="xsImg1" src="@/assets/images/unpj.png" />
        </div>
      </div>
      <div class="yyBox">
        <div class="title">运营信息</div>
        <div class="mdBox">
          <div class="yyLevel" v-for="(item, index) in yyList" :key="index">
            <img class="yyImg" :src="item.yyImg" />
            <div class="yyInfo">
              <div class="yybfb" :class="'yybfb' + (index + 1)">{{ item.yybfb }}</div>
              <div class="yyText">{{ item.yyText }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="chartBox">
        <div class="dotBox">
          <div class="dotTitle">
            <img class="dotImg" :src="require('@/assets/images/fenbuImg.png')" />
            <div class="dotText">月度销售统计</div>
          </div>
          <div class="mapBox">
            <div id="chartBox" ref="chartBox" style="height: 366px; width: 100%" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
    
<script>
import { queryShopInfo } from '@/api/salesFlow'
import * as echarts from 'echarts'
import _ from 'lodash'
export default {
  name: 'StoreDetails',
  data() {
    return {
      hospitalOfficeSales: [],
      hospitalInfo: '',
      yyList: [
        {
          yyImg: require('@/assets/images/yyImg1.png'),
          yybfb: '',
          yyText: '信息完善度'
        },
        {
          yyImg: require('@/assets/images/yyImg2.png'),
          yybfb: '',
          yyText: '回访及时率'
        },
        {
          yyImg: require('@/assets/images/yyImg3.png'),
          yybfb: '',
          yyText: '平均配送时效'
        },
        {
          yyImg: require('@/assets/images/yyImg4.png'),
          yybfb: '',
          yyText: '服务满意度'
        },
        {
          yyImg: require('@/assets/images/yyImg5.png'),
          yybfb: '',
          yyText: '患者平均用药'
        },
        {
          yyImg: require('@/assets/images/yyImg6.png'),
          yybfb: '',
          yyText: '平均患教次数'
        }
      ],
      monthSales: []
    }
  },
  created() {
    this.queryShopInfo()
  },
  methods: {
    queryShopInfo() {
      let params = JSON.parse(this.$route.query.hospital)
      queryShopInfo({ shopId: params.id, queryType: 1 }).then(res => {
        if (res.code == 0) {
          this.hospitalOfficeSales = res.data
          this.yyList[0].yybfb = res.data.infoRate
          this.yyList[1].yybfb = res.data.returnRatio
          this.yyList[2].yybfb = res.data.timeDiffAvg
          this.yyList[3].yybfb = res.data.satisfaction
          this.yyList[4].yybfb = res.data.usageNumAvg
          this.yyList[5].yybfb = res.data.eduTimesAvg
          this.monthSales = res.data.monthSales
        }
      })
    },
    initCharts() {
      console.log(this.monthSales)
      const charts1 = echarts.init(this.$refs['chartBox'])
      charts1.setOption({
        color: ['#6382e7'],
        grid: {
          left: 80
        },
        xAxis: {
          type: 'category',
          data: _.map(this.monthSales, function (v) {
            return v.name
          }),
          axisTick: {
            show: false
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f2f2f2'
            }
          },
          axisLabel: {
            show: true,
            color: '#000'
          }
        },
        tooltip: {
          trigger: 'axis',
          formatter: function (params) {
            let str = ''
            params.forEach((item, index) => {
              str +=
                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' +
                item.color +
                '"></span>' +
                item.name +
                '销售额' +
                ' : ' +
                item.data +
                '万元' +
                '<br />'
            })
            return str
          },
          textStyle: {
            color: "white" //设置文字颜色
          },
        },
        yAxis: {
          type: 'value',
          value: '万元',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#f2f2f2'
            }
          },
          axisLabel: {
            show: true,
            color: '#000'
          },
          splitLine: {
            lineStyle: {
              type: 'dashed'
            }
          }
        },
        series: [
          {
            data: _.map(this.monthSales, function (v) {
              return v.value
            }),
            type: 'line',
            smooth: true,
            itemStyle: {
              opacity: 0
            }
          }
        ]
      })
    }
  },
  watch: {
    monthSales() {
      this.initCharts()
    }
  }
}
</script>
    
<style lang="scss" scoped>
.xsBg {
  width: 375px;
  height: 171px;
  background: linear-gradient(180deg, rgba(56, 154, 252, 1) 22.92%, rgba(243, 246, 253, 1) 100%);
}

.xsBox1 {
  position: relative;
  top: -161px;
  padding: 15px;
  box-sizing: border-box;

  .xsItem1 {
    width: 100%;
    background: #fff;
    color: rgba(25, 28, 47, 1);
    padding: 10px 0;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;

    .xsTitle1 {
      display: flex;
      width: calc(100%-30px);
      margin: 0 15px;

      .xsImg1 {
        width: 82px;
        height: 106px;
        margin-left: auto;
      }

      .xsText1 {
        line-height: 44px;
        font-size: 15px;
        font-weight: 700;
      }

      .tagBox {
        display: flex;
        margin-bottom: 6px;

        .tag1,
        .tag2 {
          height: 17px;
          line-height: 18px;
          font-size: 12px;
          color: rgba(0, 186, 173, 1);
          padding: 2px 8px;
          border: 1px solid rgba(0, 186, 173, 1);
          border-radius: 10px;
        }

        .tag2 {
          margin-left: 10px;
          color: rgba(56, 154, 252, 1);
          border: 1px solid rgba(56, 154, 252, 1);
        }
      }

      .sqMedicine {
        font-size: 12px;
        line-height: 20px;
        color: rgba(128, 128, 128, 1);
        margin-top: 3px;
      }

      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        font-size: 14px;
      }
    }

    .xsContent1 {
      width: calc(100%-30px);
      margin: 10px 15px 5px 15px;
      display: flex;

      .xsNumBox1,
      .xsNumBox11 {
        padding-left: 5px;
        width: calc(50% - 3px);
        font-size: 14px;

        .yeFont1 {
          margin-top: 6px;
        }
      }

      .xsNumBox11 {
        padding-left: 28px;
      }
    }

    .xsFoot1 {
      width: 100%;
      height: 37px;
      padding: 0 15px;
      line-height: 37px;
      display: flex;

      .xsFootBox1,
      .xsFootBox11 {
        padding-left: 5px;
        width: calc(50% - 2px);
        font-size: 14px;
      }
    }
  }

  .yyBox {
    margin: 12px 0 12px 0;
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    color: rgba(25, 28, 47, 1);

    .title {
      font-weight: 700;
      position: relative;
      padding-left: 15px;
      margin-bottom: 10px;
    }

    .title::after {
      content: '';
      width: 4px;
      height: 16px;
      border-radius: 1px;
      background: rgba(56, 154, 252, 1);
      position: absolute;
      left: 0px;
      top: 4px;
    }

    .mdBox {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .yyLevel {
        display: flex;
        width: 165px;
        height: 70px;
        border-radius: 4px;
        margin-bottom: 8px;
        background: rgba(255, 255, 255, 1);
        padding: 0 15px;
        box-sizing: border-box;
        box-shadow: 2px 2px 6px 2px rgba(237, 242, 250, 1);

        .yyImg {
          width: 40px;
          height: 40px;
          position: relative;
          top: calc(50% - 20px);
        }

        .yyInfo {
          text-align: right;
          margin-left: auto;

          .yybfb {
            margin-top: 14px;
            font-size: 18px;
            font-weight: 700;
            color: rgba(58, 160, 255, 1);
          }

          .yybfb1 {
            color: rgba(58, 160, 255, 1);
          }

          .yybfb2 {
            color: #ff8d1a;
          }

          .yybfb3 {
            color: #00baad;
          }

          .yybfb4 {
            color: #ff5733;
          }

          .yybfb5 {
            color: rgba(126, 46, 240, 1);
          }

          .yybfb6 {
            color: #43cf7c;
          }

          .yyText {
            line-height: 20px;
            font-size: 13px;
            color: rgba(128, 128, 128, 1);
          }
        }
      }
    }
  }

  .chartBox {
    .dotBox {
      background: #fff;
      border-radius: 6px;

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
        box-sizing: border-box;

        .smallBox {
          width: 325px;
          height: 360px;
        }
      }
    }
  }
}
</style>