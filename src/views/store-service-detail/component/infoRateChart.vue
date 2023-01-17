<template>
  <div id="chartBox1" ref="chartBox1" style="height: 360px; width: 360px" />
</template>
  
<script>
import * as echarts from 'echarts'
require('echarts/theme/macarons') // ecahrts theme

export default {
  props: {
    chartData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    chartData: function () {
      this.initChart()
    }
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      const charts1 = echarts.init(document.getElementById('chartBox1'), 'macarons')
      charts1.clear()
      const that = this
      const option = {
        grid: {
          left: "0",
          right: "0",
          bottom: "0",
          top: "0",
        },
        xAxis: {
          type: "value",
          show: false,
        },
        yAxis: {
          show: false,
          type: "category",
          data: that.chartData.map((item) => {
            return item.name
          }),
          inverse: true,
          splitLine: {
            show: false,
          },
          axisTick: {
            show: false,
          },
          axisLine: {
            show: false,
          },
          axisLabel: {
            show: true,
            inside: true,
            splitNumber: 50,
            boundaryGap: [20, 20],
            textStyle: {
              color: "#fff",
              verticalAlign: "bottom",
              align: "left",
              padding: [200, 0, 10, 0],
            },
          },
        },
        series: [
          {
            type: "bar",
            data: that.chartData.map((item) => {
              return item.value
            }),
            label: {
              show: true,
              position: "insideLeft",
              formatter: function (params) {
                return (
                  that.chartData[params.dataIndex].name +
                  "：" +
                  that.chartData[params.dataIndex].value +
                  "%"
                );
              },
              rich: {
                name: {},
              },
              color: '#fff'
            },
            itemStyle: {
              color: function (p) {
                let colorList = [
                  "#FF458C",
                  "#5C7BD9",
                  "#00b894",
                  "#e17055",
                  "#FF7070",
                  "#CB7BF4",
                  "#4B7CF3",
                  "#F24354",
                  "#32D5B9",
                  "#F19E34",
                  "#9565F4",
                  "#0255FD",
                  "#7ED3F4",
                  "#002E5A",
                  "#07D2F9",
                ];
                return colorList[p.dataIndex]
              },
            },
          },
        ],
      }
      charts1.setOption(option)
    }
  }
}
</script>
  