<template>
    <div>
        <div ref='chartBox' v-if="id1==1" :style="{width:width,height:height}"></div>
        <div ref='chartBox2' v-if="id1==2" :style="{width:width,height:height}"></div>
        <div ref='chartBox3' v-if="id1==3" :style="{width:width,height:height}"></div>
        <div ref='chartBox4' v-if="id1==4" :style="{width:width,height:height}"></div>
    </div>
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
        color: {
            type: Array,
            default: () => []
        },
        id1: {
            type: String,
            default: "",
        }
    },
    methods: {
        initChart() {
            const that = this;
            const option = {
                color: that.color,
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
                            formatter: function (params) {
                                console.log(params);
                                if (params.dataIndex == 0) {
                                    return `${params.percent}%`
                                }else{
                                    return `${100-params.percent}%`
                                }
                            },
                            color: this.color[0]
                        },
                        labelLine: {
                            show: false
                        },
                        data: this.chartData
                    }
                ]
            }
            if (this.id1 == 1) {
                const chart = echarts.init(this.$refs[`chartBox`], 'macarons')
                chart.setOption(option)
            } else if(this.id1 == 2) {
                const chart = echarts.init(this.$refs[`chartBox${this.id1}`], 'macarons')
                chart.setOption(option)
            }else if(this.id1 == 3) {
                const chart = echarts.init(this.$refs[`chartBox${this.id1}`], 'macarons')
                chart.setOption(option)
            }
                else if(this.id1 == 4) {
                const chart = echarts.init(this.$refs[`chartBox${this.id1}`], 'macarons')
                chart.setOption(option)
            }

        }
    },
    mounted() {
        // window.setTimeout(()=>{
        //     this.initChart();
        // },0.5)

    },
    watch: {
        chartData(value) {
            if(value.length>0){
                this.initChart();
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

</style>