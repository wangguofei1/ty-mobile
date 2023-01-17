<template>
    <div id="chartBox4" ref="chartBox4" style="height: 360px; width: 360px" />
</template>
  
<script>
import * as echarts from 'echarts'
require("echarts/theme/macarons"); // ecahrts theme

export default {
    props: {
        chartData: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {
            chart: null,
        };
    },
    mounted() {
        this.initChart();
    },
    watch: {
        chartData: function () {
            this.initChart()
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initChart() {
            const charts4 = echarts.init(document.getElementById("chartBox4"), "macarons")
            charts4.clear();
            const that = this
            const option = {
                tooltip: {
                  trigger: "item"
                },
                grid: {
                  left: "40px",
                  right: "0",
                  bottom: "60px",
                  top: "10px"
                },
                xAxis: {
                  type: "category",
                  data: that.chartData.map(v => v.name),
                  axisLabel: {
                    interval: 0,
                    rotate: 30,
                  }
                },
                markPoint: {
                  data: [
                    { type: "max", name: "Max" },
                    { type: "min", name: "Min" }
                  ]
                },
                markLine: {
                  data: [{ type: "average", name: "Avg" }]
                },
                yAxis: {
                  type: "value",
                  show: false,
                  axisTick: {
                    show: false
                  },
                  axisLine: {
                    lineStyle: {
                      color: "#609aeb"
                    }
                  },
                  axisLabel: {
                    show: false
                  },
                  splitLine: {
                    show: true,
                    lineStyle: {
                      type: "dotted",
                      color: "rgba(121,158,232,0.3)"
                    }
                  }
                },
                series: [
                  {
                    data: that.chartData.map(v => v.value),
                    type: "bar",
                    barWidth: 30,
                    label: {
                      show: true,
                      position: "top"
                    },
                    itemStyle: {
                      normal: {
                        barBorderRadius: 4,
                        color: {
                          type: "linear",
                          x: 0,
                          y: 0,
                          x2: 0,
                          y2: 1,
                          colorStops: [
                            {
                              offset: 0,
                              color: "#00987A", // 0% 处的颜色
                            },
                            {
                              offset: 0.6,
                              color: "#0BBE9B", // 0% 处的颜色
                            },
                            {
                              offset: 1,
                              color: "#ffffff", // 100% 处的颜色
                            },
                          ],
                          globalCoord: true, // 缺省为 false
                        }
                      }
                    }
                  }
                ]
              }
            charts4.setOption(option)
        }
    }
}
</script>
  