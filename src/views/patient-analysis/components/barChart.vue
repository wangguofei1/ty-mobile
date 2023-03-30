<template>
    <div ref="chartBox" :style="{ width: width, height: height }"></div>
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
                color: ["#359eff"],
                xAxis: {
                    type: 'category',
                    data: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
                    show: false,
                },
                yAxis: {
                    type: 'value',
                    show: false,
                },
                series: [
                    {
                        data: [120, 200, 150, 80, 70, 110, 130, 120, 200, 150, 80, 70],
                        barWidth: 25,
                        barGap: "50%",
                        type: 'bar'
                    }
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