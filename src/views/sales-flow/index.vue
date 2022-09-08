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
    <saleForm v-show="isShow" :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <div class="xsBox">
        <div class="xsItem" v-for="item in saleList" :key="item.hospitalId">
          <div class="xsTitle">
            <img class="xsImg" :src="hosImg" />
            <div class="xsText">{{ item.hosptailName }}</div>
            <div @click="xsGoDetail(item)" class="xsGoDetail">数据流向<van-icon style="margin-left: 5px" name="arrow" /></div>
          </div>
          <div class="xsContent">
            <div class="xsNumBox">
              <div>销售数量（盒）</div>
              <div class="yeFont">{{ item.currSaleNum }}</div>
            </div>
            <div class="xsNumBox1">
              <div>销售金额（元）</div>
              <div class="yeFont">{{ item.currSalePrice }}</div>
            </div>
          </div>
          <div class="xsFoot">
            <div class="xsFootBox">
              <span>同比： </span><span class="blkFont">{{ item.yearGrowthRate }} %</span>
            </div>
            <div class="xsFootBox1">
              <span>环比： </span><span class="blkFont">{{ item.monthGrowthRate }} %</span>
            </div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
import { queryHospitalSales } from '@/api/salesFlow'
import saleForm from '../../components/saleForm/index.vue'
import hosImg from '@/assets/images/hospitalImg.png'
export default {
  name: 'SalesFlow',
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
      page: 1,
      pageNum: 10,
      loading: false,
      saleList: [],
      finished: false,
      count: 0,
      hosImg: hosImg
    }
  },
  created() {
    this.queryHospitalSales({ queryType: this.ruleForm.queryType, page: this.page, pageNum: this.pageNum })
  },
  methods: {
    // 医院流向数据
    queryHospitalSales(form) {
      var that = this
      queryHospitalSales(form).then(res => {
        if (res.code == 0) {
          that.count = res.data.count
          that.saleList = that.saleList.concat(res.data.data)
        }
      })
    },
    // 跳到详情页
    xsGoDetail(item) {
      this.$router.push({
        name: 'HospitalDataFlow',
        query: { hospital: JSON.stringify(item) }
      })
    },
    changeForm(form) {
      this.saleList = []
      console.log(form)
      form.queryType = this.ruleForm.queryType
      form.page = this.page
      form.pageNum = this.pageNum
      this.queryHospitalSales(form)
    },
    onLoad() {
      setTimeout(() => {
        this.page++
        this.queryHospitalSales({ queryType: this.ruleForm.queryType, page: this.page, pageNum: this.pageNum })
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.saleList.length >= this.count) {
          this.finished = true;
        }
      }, 1000);
    },
  }
}
</script>

<style lang="scss" scoped>
.xsBox {
  padding: 15px;
  box-sizing: border-box;
  .xsItem {
    width: 100%;
    background-color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;
    .xsTitle {
      display: flex;
      width: calc(100%-30px);
      margin: 0 15px;
      .xsImg {
        width: 36px;
        height: 36px;
      }
      .xsText {
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
        color: rgba(25, 28, 47, 1);
        margin-left: 10px;
        max-width: 190px;
      }
      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        width: 78px;
        color: rgba(58, 160, 255, 1);
        font-size: 14px;
      }
    }
    .xsContent {
      width: calc(100%-30px);
      margin: 10px 15px 23px 15px;
      display: flex;
      .xsNumBox,
      .xsNumBox1 {
        padding-left: 5px;
        width: calc(50% - 3px);
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
        .yeFont {
          margin-top: 6px;
          color: rgba(255, 141, 26, 1);
        }
      }
      .xsNumBox1 {
        padding-left: 28px;
      }
      > .xsNumBox:first-child {
        border-right: 1px solid rgba(245, 245, 245, 1);
      }
    }
    .xsFoot {
      width: 100%;
      height: 37px;
      background: rgba(250, 250, 250, 1);
      padding: 0 15px;
      line-height: 37px;
      display: flex;
      .xsFootBox,
      .xsFootBox1 {
        padding-left: 5px;
        width: calc(50% - 2px);
        color: rgba(166, 166, 166, 1);
        font-size: 14px;
        .blkFont {
          color: #000;
        }
      }
    }
  }
}
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