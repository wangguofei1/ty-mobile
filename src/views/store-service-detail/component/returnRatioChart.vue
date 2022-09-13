<template>
    <div id="chartBox2" ref="chartBox2" style="height: 360px; width: 360px" />
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
    watch: {
        chartData: function () {
            this.initCharts2()
        }
    },
    mounted() {
        this.initCharts2();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initCharts2() {
            var BorderWidth = "6"
            //反方向剩下部分的样式
            var placeHolderStyle = {
                normal: {
                    label: {
                        show: false,
                        position: "center",
                    },
                    labelLine: {
                        show: false,
                    },
                    color: "transparent",
                    borderColor: "transparent",
                    borderWidth: 0
                },
                emphasis: {
                    color: "transparent",
                    borderColor: "transparent",
                    borderWidth: 0
                }
            }
            var commonAttrs = {
                type: "pie",
                clockWise: true, //顺时加载
                hoverAnimation: false, //鼠标移入变大
                center: ["30%", "50%"],
                label: {
                    show: false,
                    position: "center"
                }
            }
            var series = this.chartData.map((v, i) => {
                return {
                    ...commonAttrs,
                    name: v.name,
                    radius: [(1 + i * 9) + '%', (1 + i * 9 + 5) + '%'],
                    data: [{
                        value: v.value,
                        name: v.name
                    },
                    {
                        value: 100 - v.value,
                        name: "",
                        itemStyle: placeHolderStyle
                    }
                    ]
                }
            })
            const option = {
                tooltip: {
                    trigger: "item",
                    formatter: function (params) {
                        return `${params.name}：${params.value} %`
                    }
                },
                itemStyle: {
                    normal: {
                        label: {
                            show: false,
                            position: "outside"
                        },
                        labelLine: {
                            show: false,
                            length: 100,
                            smooth: 0.5
                        },
                        borderWidth: BorderWidth,
                        shadowBlur: 40,
                        borderColor: "#3AA0FF",
                        backgroundColor: "#fff",
                        shadowColor: "rgba(0, 0, 0, 0)" //边框阴影
                    }
                },
                legend: [{
                    icon: "bar",
                    formatter: function (name) {
                        for (let i = 0, l = option.series.length; i < l; i++) {
                            if (name == option.series[i].data[0].name) {
                                return name + "：" + option.series[i].data[0].value + "%"
                            }
                        }
                    },
                    data: this.chartData.map(v => v.name),
                    type: "scroll",
                    orient: "vertical",
                    right: 0,
                    top: 'middle'
                }],
                series: series
            }
            const charts2 = echarts.init(document.getElementById("chartBox2"), "macarons")
            charts2.clear();
            charts2.setOption(option)
        },
    },
};
</script>
  