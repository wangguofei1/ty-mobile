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
            const option = {
                tooltip: {
                    trigger: "item",
                    textStyle: {
                    color: "white" //设置文字颜色
                },
                },
                xAxis: {
                    type: "category",
                    data: this.chartData.map(v => v.name),
                    axisLabel: {
                        interval: 0,
                        rotate: 30
                    }
                },
                yAxis: {
                    type: "value"
                },
                grid: {
                x: 55,
                },
                series: [{
                    data: this.chartData.map(v => v.value),
                    type: "bar"
                }],
               
            }
            charts4.setOption(option)
        }
    },
};
</script>
  