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
      let halfIndex = parseInt(this.chartData.length / 2) + 1
      let arr1 = this.chartData.slice(0, halfIndex)
      let arr2 = this.chartData.slice(halfIndex, this.chartData.length)
      charts1.setOption({
        tooltip: {
          trigger: 'item'
        },
        legend: [
          {
            orient: 'vertical',
            bottom: 20,
            left: 60,
            data: arr1
          },
          {
            orient: 'vertical',
            bottom: 42,
            right: 60,
            data: arr2
          }
        ],
        series: [
          {
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
            type: 'pie',
            radius: [60, 100],
            center: ['50%', '30%'],
            roseType: 'area',
            data: this.chartData
          }
        ]
      })
    }
  }
}
</script>
  