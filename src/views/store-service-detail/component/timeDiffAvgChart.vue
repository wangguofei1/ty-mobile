<template>
    <div id="chartBox3" ref="chartBox3" style="height: 360px; width: 100%" />
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
        this.initCharts();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        initCharts() {
            const charts3 = echarts.init(document.getElementById("chartBox3"), "macarons")
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
                    type: "line"
                }]
            }
            charts3.setOption(option)
        },
    },
};
</script>
  