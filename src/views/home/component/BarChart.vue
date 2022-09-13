<template>
  <div :class="className" :style="{ height: height, width: width }" />
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
    medicine1Data: {
      type: Array,
      default: [],
    },
    medicine2Data: {
      type: Array,
      default: [],
    },
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
      this.chart = echarts.init(this.$el, "macarons");
      this.chart.setOption({
        title: {
          top: 10,
          text: "销售额（百万元）",
          textStyle: {
            fontSize: 13,
            color: "rgba(166, 166, 166, 1)",
          },
        },
        tooltip: {
          trigger: "axis",
        },legend: {
          top: 10,
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: ["20mg", "80mg"],
          right: '4%',
          textStyle: {
            fontSize: 12,
            color: 'rgba(96, 98, 102, 1)'
          }
        },
        calculable: true,
        xAxis: [
          {
            type: "category",
            data: [
              "1月",
              "2月",
              "3月",
              "4月",
              "5月",
              "6月",
              "7月",
              "8月",
              "9月",
              "10月",
              "11月",
              "12月",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "20mg",
            type: "bar",
            data: this.medicine1Data,
            itemStyle: {
              color: "rgba(58, 160, 255, 1)",
            },
          },
          {
            name: "80mg",
            type: "bar",
            data: this.medicine2Data,
            itemStyle: {
              color: "rgba(0, 186, 173, 1)",
            },
          },
        ],
      });
    },
  },
};
</script>
