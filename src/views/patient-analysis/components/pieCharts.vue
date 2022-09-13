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
            default: "43px",
        },
        height: {
            type: String,
            default: "43px",
        },
        chartData: {
            type: Array,
            default: () => []
        },
        color:{
            type: Array,
            default: () => []
        }
    },
    methods: {
        initChart() {
            const that=this;
            const chart = echarts.init(this.$refs['chartBox'], 'macarons')
            chart.setOption({
                color:that.color,
                tooltip: {
                    trigger: 'item'
                },
                series: [
                    {
                        type: 'pie',
                        radius: ['100%', '90%'],
                        avoidLabelOverlap: false,
                        label: {
                            show: true,
                            position: 'center',
                            formatter:'{c}%',
                            color:this.color[0]
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.chartData
                    }
                ]
            })
        }
    },
    mounted(){
        this.initChart();
    },
    watch:{
        chartData(value){
            this.initChart();
        }
    }
}
</script>

<style lang="scss" scoped>

</style>