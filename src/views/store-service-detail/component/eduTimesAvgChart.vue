<template>
    <div id="chartBox4" ref="chartBox4" style="height: 360px; width: 100%" />
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
            const option = {
                tooltip: {
                    trigger: "item"
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
                series: [{
                    data: this.chartData.map(v => v.value),
                    type: "bar"
                }]
            }
            charts4.setOption(option)
        }
    },
};
</script>
  