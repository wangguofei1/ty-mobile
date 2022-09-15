<template>
    <div ref="chartBox" :style="{width:width,height:height}"></div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    name: '',
    props: {
        width: {
            type: String,
            default: "100%",
        },
        height: {
            type: String,
            default: "270px",
        },
        chartData: {
            type: Array,
            default: () => []
        },

    },
    methods: {
        initChart() {
            const that = this;
            const chart = echarts.init(this.$refs['chartBox'], 'macarons')
            chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    textStyle: {
                        color: "white" //设置文字颜色
                    },
                },
                color: ['#2a82e4', '#00baad', '#a5d63f', '#3e84e6'],
                legend: {
                    top: 0,
                    right: 20
                },
                grid: {
                    right: '4%',
                },
                xAxis: [
                    {
                        type: 'category',
                        data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月'],
                        axisLine: {
                            show: false,
                        },
                        axisTick: {
                            show: false,
                        },
                    }
                ],
                yAxis: [
                    {
                        min: 0,
                        max: 800,
                        type: 'value',
                        splitLine: {
                            show: false,
                        }
                    }
                ],
                series: [
                    {
                        name: '总患者数',
                        type: 'bar',
                        barWidth: 10,
                        emphasis: {
                            focus: 'series'
                        },
                        data: that.chartData.map(ele => ele.totalnum)
                    },
                    {
                        name: '本月患者新增数',
                        type: 'bar',
                        stack: 'Ad',
                        barWidth: 10,
                        emphasis: {
                            focus: 'series'
                        },
                        data: that.chartData.map(ele => ele.newnum)
                    },
                    {
                        name: '脱落人数',
                        type: 'bar',
                        stack: 'Ad',
                        barWidth: 10,
                        emphasis: {
                            focus: 'series'
                        },
                        data: that.chartData.map(ele => ele.stopnum)
                    },
                    {
                        name: '脱落率',
                        type: 'line',
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
                        data: that.chartData.map(ele => ele.stoprate)
                    },
                ]
            })
        }
    },
    mounted() {
        const that = this;
        this.initChart();
    },
    watch: {
        chartData() {
            this.initChart();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>