<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from 'echarts'
require("echarts/theme/macarons"); // echarts theme

export default {
  props: {
    className: {
      type: String,
      default: "chart",
    },
    width: {
      type: String,
      default: "100%",
    },
    height: {
      type: String,
      default: "240px",
    },
    medicine1Data: {
      type: Array,
      default: [],
    },
    medicine2Data: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  mounted() {
    this.initChart();
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
      this.chart = echarts.init(this.$el, "macarons");
            this.chart.setOption({
                color: ['#3c83e7', '#a1cf67'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    },
                    formatter: function (params) {
                        let str = '';
                        params.forEach((item, index) => {
                            str +=
                                '<span style="display:inline-block;margin-right:5px;border-radius:50%;width:10px;height:10px;left:5px;background-color:' + item.color + '"></span>' + new Date().getFullYear() + '年' + item.name + " : " + item.data * 100 + '万' + "<br />";
                        });
                        return str;
                    },
                },
                legend: {
                    data: ['选定年', '前一年'],
                    right: 40,
                    top: 30,
                },

                // grid: {
                //     left: '3%',
                //     right: '4%',
                //     bottom: '3%',
                //     containLabel: true
                // },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                type: "dashed",
                                color: 'rgba(0, 0, 0,0.2)',
                                dashOffset: 100,
                            }
                        },
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        min: 0,
                        max: 10,
                        name: '销售额（百万元）',
                        axisLine: {
                            show: true
                        },
                        splitLine: {
                            show: false,

                        },
                    }
                ],
                series: [
                    {
                        name: '选定年',
                        type: 'line',
                        smooth: true,
                        emphasis: {
                            focus: 'series'
                        },
                        itemStyle: {
                            opacity: 0,
                        },
                        select: {
                            scale: 10,
                            label: {
                                show: true,
                            }
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {
                                    offset: 0,
                                    color: 'rgba(80,141,255,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(56,155,255,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(185, 219, 140,0.00)'
                                }
                            ])
                        },
                        data: this.medicine1Data
                    },
                    {
                        name: '前一年',
                        type: 'line',
                        stack: 'Total',
                        smooth: true,
                        itemStyle: {

                            opacity: 0,
                        },
                        areaStyle: {
                            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                {

                                    offset: 0,
                                    color: 'rgba(185, 219, 140,0.39)'
                                }, {
                                    offset: .34,
                                    color: 'rgba(159, 224, 128,0.25)'
                                }, {
                                    offset: 1,
                                    color: 'rgba(185, 219, 140,0.00)'
                                }
                            ])
                        },
                        emphasis: {
                            focus: 'series'
                        },
                        data: this.medicine2Data
                    },
                ]
            })
        },
    // initChart() {
    //   this.chart = echarts.init(this.$el, "macarons");
    //   this.chart.setOption({
    //     title: {
    //       top: 10,
    //       text: "销售额（百万元）",
    //       textStyle: {
    //         fontSize: 13,
    //         color: "rgba(166, 166, 166, 1)",
    //       },
    //     },
    //     tooltip: {
    //       trigger: "axis",
    //     },legend: {
    //       top: 10,
    //       icon: 'rect',
    //       itemWidth: 14,
    //       itemHeight: 5,
    //       itemGap: 13,
    //       data: ["规格1", "规格2"],
    //       right: '4%',
    //       textStyle: {
    //         fontSize: 12,
    //         color: 'rgba(96, 98, 102, 1)'
    //       }
    //     },
    //     calculable: true,
    //     xAxis: [
    //       {
    //         type: "category",
    //         data: [
    //           "1月",
    //           "2月",
    //           "3月",
    //           "4月",
    //           "5月",
    //           "6月",
    //           "7月",
    //           "8月",
    //           "9月",
    //           "10月",
    //           "11月",
    //           "12月",
    //         ],
    //       },
    //     ],
    //     yAxis: [
    //       {
    //         type: "value",
    //       },
    //     ],
    //     series: [
    //       {
    //         name: "规格1",
    //         type: "bar",
    //         data: this.medicine1Data,
    //         itemStyle: {
    //           color: "rgba(58, 160, 255, 1)",
    //         },
    //       },
    //       {
    //         name: "规格2",
    //         type: "bar",
    //         data: this.medicine2Data,
    //         itemStyle: {
    //           color: "rgba(0, 186, 173, 1)",
    //         },
    //       },
    //     ],
    //   });
    // },
  },
};
</script>
