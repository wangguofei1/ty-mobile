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
            default: "220px",
        },
        chartData: {
            type: Array,
            default: () => [
                { name: "原因一", value: "37" },
                { name: "原因二", value: "13" },
                { name: "原因三", value: "49" },
                { name: "原因四", value: "7" },
            ]
        },

    },
    methods: {
        initChart() {
            const that = this;
            const chart = echarts.init(this.$refs['chartBox'], 'macarons')
            chart.setOption({
                tooltip: {
                    trigger: 'item',
                    formatter: function (params) {
                        let str = '';
                        str +=
                            params.marker + '原因' + '：' + params.name + "<br />" + params.marker + '占比' + '：' + params.percent + "%";
                        return str;
                    },
                    textStyle: {
                        color: "white" //设置文字颜色
                    },
                },
                legend: [{
                    bottom: "0%"
                },
                ],
                series: [
                    {
                        name: 'Access From',
                        type: 'pie',
                        radius: ['75%', '35%'],
                        center: ['50%', '40%'],
                        // hoverAnimation:true, //鼠标悬浮是否有区域弹出动画，false:无  true:有
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'inside',
                            fontSize: 12,
                            fontWeight: 400,
                            formatter: '{d}%'
                        },
                        labelLine: {
                            show: true,
                        },
                        minAngle: 5,
                        minShowLabelAngle: 10,
                        data: this.chartData,
                        itemStyle: {
                            emphasis: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            },
                        }
                    }
                ]

            })
        }
    },
    mounted() {
        this.initChart();
    },
    watch: {
        chartData(value) {
            this.initChart();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>