<template>
  <div>
    <div class="flex1 title1" style="background: #2b92f9; padding: 7px 0">
      <div style="width: 50%">
        <van-tabs
          v-model="ruleForm.queryType"
          background="#2b92f9"
          color="#fff"
          title-inactive-color="#fff"
          title-active-color="#fff"
        >
          <van-tab title="本年" name="1"></van-tab>
          <van-tab title="本季度" name="2"></van-tab>
          <van-tab title="本月" name="3"></van-tab>
        </van-tabs>
      </div>
      <div class="flex1 content1" @click="isShow = isShow ? false : true">
        <span style="color: #fff">筛选</span>
        <span v-show="!isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 1@3x.png"
        /></span>
        <span v-show="isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 2@3x.png"
        /></span>
      </div>
    </div>
    <sale-form v-show="isShow" :ruleForm="ruleForm" @changeForm="changeForm"></sale-form>
    <div class="chartBox">
      <div class="dotBox">
        <div class="dotTitle">
          <img class="dotImg" src="@/assets/images/fenbuImg.png" />
          <div class="dotText">按DOT分布</div>
        </div>
        <div class="mapBox">
          <div id="chartBox1" ref="chartBox1" style="height: 288px; width: 100%" />
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { getPatientStructure } from '@/api/salesFlow'
import saleForm from '../../components/saleForm/index.vue'
import * as echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
export default {
  name: 'PatientStructure',
  components: { saleForm },
  data() {
    return {
      ruleForm: {
        queryType: '1',
        year: '',
        startMonth: '',
        endMonth: '',
        productId: 127,
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
      },
      isShow: false,
      dotRange: [],
      locationRange: [],
      ageRange: [],
      diseaseRange: [],
      genderRange: [],
      bmiRange: []
    }
  },
  created() {
    this.getPatientStructure(this.ruleForm)
  },
  mounted () {
    this.initCharts1()
  },
  methods: {
    changeForm(form) {
      this.getPatientStructure(form)
    },
    // 医院流向数据
    getPatientStructure(form) {
      var that = this
      this.ruleForm = form
      getPatientStructure(this.ruleForm).then(res => {
        if (res.code == 0) {
          this.dotRange = res.data.dotRange
          this.locationRange = res.data.locationRange
          this.ageRange = res.data.ageRange
          this.diseaseRange = res.data.diseaseRange
          this.genderRange = res.data.genderRange
          this.bmiRange = res.data.bmiRange
        }
      })
    },
    initCharts1() {
      let a = document.getElementById('chartBox1')
      console.log(document.getElementById('chartBox1'))
      const charts1 = echarts.init(a, 'macarons')
        charts1.setOption({
          tooltip: {
            trigger: 'item'
          },
          legend: {
            type: 'scroll',
            orient: 'vertical',
            left: 20,
            top: 20,
            bottom: 20
          },
          series: [
            {
              label: {
                show: false,
                position: 'center'
              },
              emphasis: {
                label: {
                  show: true
                }
              },
              name: '按DOT分布',
              type: 'pie',
              radius: [80, 140],
              center: ['50%', '50%'],
              roseType: 'area',
              itemStyle: {
                borderRadius: 12
              },
              data: this.dotRange
            }
          ]
        })
    }
  }
}
</script>
  
  <style lang="scss" scoped>
.flex1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

.title1 {
  height: 0.733rem;

  .content1 {
    box-sizing: border-box;
    width: 50%;
    justify-content: flex-end;
    align-items: center;

    img {
      width: 50%;
      height: 50%;
    }
  }
}
.chartBox {
  padding: 14px 15px;
  .dotBox {
    background: #fff;
    .dotTitle {
      display: flex;
      width: calc(100%-30px);
      height: 50px;
      box-sizing: border-box;
      padding: 13px 15px;
      border-bottom: 1px solid rgba(216, 220, 229, 1);
      .dotImg {
        width: 26.84px;
        height: 20px;
        position: relative;
        top: 2px;
      }
      .dotText {
        margin-left: 10px;
        height: 22px;
        font-size: 15px;
        font-weight: 700;
        color: rgba(25, 28, 47, 1);
      }
    }
    .mapBox {
    }
  }
}
</style>
  <style lang="scss">
.title1 {
  .van-tabs--line {
    .van-tabs__wrap {
      height: 0.733rem !important;
    }
  }
}
.title1 .van-tabs__line {
  width: 15px;
}
</style>