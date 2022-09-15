<template>
    <div>
        <div style="height: 240px; width: 360px ">
            <div ref="charts1" style="width:100%;height:100%" />
        </div>
    </div>
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
        chartsData1: {
            type: Array,
            default: () => {
                return [];
            },
        },
        chartsData2: {
            type: Array,
            default: () => {
                return [];
            },
        },
        chartsData3: {
            type: Array,
            default: () => {
                return [];
            },
        },
        chartsType: {
            type: String,
            default: '3'
        }
    },
    data() {
        return {
            chart: null,
            chart2: null,
            chart3: null,
        };
    },
    mounted() {
            this.initChart2();
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
            let arr1 = this.chartsData1.map((item, index) => {

            })
            let that = this;
            this.chart = echarts.init(this.$refs['charts1'], "macarons");
            this.chart.clear();
            this.chart.setOption(
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: '销售金额：{c}万<br />销售占比：{d}%',
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                    },
                    color: ['#2A58C7', '#3AA0FF', '#FF8D1A', '#D43030', '#00BAAD', '#FFC300', '#A5D63FFF', '#AC33C1FF'],
                    legend: [{
                        bottom: '0px',
                        left: '20%',
                        formatter: function (name) {
                            for (let index in that.chartsData1) {
                                if (name == that.chartsData1[index].name) {
                                    return `${name}   ${that.chartsData1[index].rate ? that.chartsData1[index].rate : "0%"}`
                                }
                            }
                        },
                        orient: 'vertical',
                        padding: [20, 30],
                        textStyle: {
                            fontSize: '16px'
                        },
                        x: 'left',
                        itemHeight: 12,
                        itemWidth: 12,
                    },
                    ],
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['55%', '25%'],
                            center: ['50%', '30%'],
                            // hoverAnimation:true, //鼠标悬浮是否有区域弹出动画，false:无  true:有
                            avoidLabelOverlap: false,
                            label: {
                                show: true,
                                position: 'inside',
                                // color: '#fff',
                                fontSize: 14,
                                formatter: '{b}\n{d}%'
                            },
                            labelLine: {
                                show: true,
                            },
                            minAngle: 5,
                            minShowLabelAngle: 10,
                            data: this.chartsData1,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                            }
                        }
                    ]
                }
            );
        },
        initChart2() {
            let that = this;
            this.chart = echarts.init(this.$refs['charts1'], "macarons");
            this.chart.clear();
            this.chart.setOption(
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: '销售金额：{c}万<br />销售占比：{d}%',
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                    },
                    color: ['#2A58C7', '#FF8D1A', '#00BAAD', '#A5D63F', '#EE6666'],
                    legend: {
                        formatter: function (name) {
                            for (let index in that.chartsData2) {
                                if (name == that.chartsData2[index].name) {
                                    return `${name}   ${that.chartsData2[index].rate ? that.chartsData2[index].rate : "0%"}`
                                }
                            }
                        },
                        bottom: '0px',
                        left: '20%',
                        orient: 'vertical',
                        padding: [20, 30],
                        textStyle: {
                            fontSize: '16px'
                        },
                        x: 'left',
                        itemHeight: 12,
                        itemWidth: 12,
                    },
                    series: [
                        {
                            // name: 'Access From',
                            type: 'pie',
                            radius: ['55%', '25%'],
                            center: ['50%', '30%'],
                            avoidLabelOverlap: false,
                            emphasis: {
                                scale: true,
                                scaleSize: 20
                            },
                            labelLine: {
                                show: false
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                // color: '#fff',
                                fontSize: 14,
                                formatter: '{b}\n{d}%'
                            },
                            itemStyle: {
                                normal: {
                                    label: {
                                        show: true,
                                        position: 'inside',
                                        // color: '#fff',
                                        fontSize: 12,
                                        formatter: '{b}\n{d}%'
                                    },
                                    labelLine: {
                                        show: false,
                                        length: 100,
                                        smooth: 0.5,
                                    },
                                    // borderWidth: BorderWidth,
                                    shadowBlur: 40,
                                    borderColor: "#59CFFF",
                                    shadowColor: "rgba(0, 0, 0, 0)", //边框阴影
                                },
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                            },
                            minAngle: 5,
                            minShowLabelAngle: 10,
                            data: this.chartsData2
                        }
                    ]
                }
            );
        },
        initChart3() {
            let that = this;
            this.chart = echarts.init(this.$refs['charts1'], "macarons");
            this.chart.clear();
            this.chart.setOption(
                {
                    tooltip: {
                        trigger: 'item',
                        formatter: '销售金额：{c}万<br />销售占比：{d}%',
                        textStyle: {
                            color: "white" //设置文字颜色
                        },
                    },
                    color: ['#2A58C7', '#FF8D1A', '#00BAAD', '#A5D63F', '#EE6666'],
                    legend: {
                        formatter: function (name) {
                            for (let index in that.chartsData3) {
                                if (name == that.chartsData3[index].name) {
                                    return `${name}   ${that.chartsData3[index].rate ? that.chartsData3[index].rate : "0%"}`
                                }
                            }
                        },
                        bottom: '0px',
                        left: '20%',
                        orient: 'vertical',
                        padding: [20, 30],
                        textStyle: {
                            fontSize: '16px'
                        },
                        x: 'left',
                        itemHeight: 12,
                        itemWidth: 12,
                    },
                    series: [
                        {
                            name: 'Access From',
                            type: 'pie',
                            radius: ['55%', '25%'],
                            center: ['50%', '30%'],
                            avoidLabelOverlap: false,
                            emphasis: {
                                scale: true,
                                scaleSize: 20
                            },
                            labelLine: {
                                show: false
                            },
                            label: {
                                show: true,
                                position: 'inside',
                                // color: '#fff',
                                fontSize: 12,
                                formatter: '{b}\n{d}%'
                            },
                            minAngle: 5,
                            minShowLabelAngle: 10,
                            data: this.chartsData3,
                            itemStyle: {
                                emphasis: {
                                    shadowBlur: 10,
                                    shadowOffsetX: 0,
                                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                                },
                            }
                        }
                    ]

                }
            );
        },
    },
    watch: {
        chartsData1() {
            this.initChart2();
        },
        chartsType: {
            handler: function (value) {
                if (value == '1') {
                    this.initChart();
                } else if (value == '2') {
                    this.initChart2();
                } else {
                    this.initChart3();
                }
            },
            // immediate:true,
        }
    }
};
</script>
  