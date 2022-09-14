<template>
  <div>
    <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="getQueryType"></topNav>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <div class="xsBox">
          <div class="xsItem" v-for="(item, index) in saleList" :key="index">
            <div class="xsTitle">
              <img class="xsImg" :src="hosImg" />
              <div class="xsText">{{ item.hosptailName }}</div>
              <div @click="xsGoDetail(item)" class="xsGoDetail">
                数据流向<van-icon style="margin-left: 5px" name="arrow" />
              </div>
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
                <span>同比： </span><span class="blkFont">{{ item.yearGrowthRate }}</span>
              </div>
              <div class="xsFootBox1">
                <span>环比： </span><span class="blkFont">{{ item.monthGrowthRate }}</span>
              </div>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import topNav from '../../components/topNav.vue'
import { queryHospitalSales } from '@/api/salesFlow'
import saleForm from '../../components/saleForm/index.vue'
import hosImg from '@/assets/images/hospitalImg.png'
import { truncate } from 'fs'
export default {
  name: 'SalesFlow',
  components: { saleForm, topNav },
  data() {
    return {
      queryType: '1',
      ruleForm: {
        year: '',
        startMonth: '',
        endMonth: '',
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: '',
        page: 1,
        pageNum: 10
      },
      isShow: false,
      loading: false,
      saleList: [],
      finished: false,
      hosImg: hosImg,
      isLoad: false,
      refreshing: false
    }
  },
  created() {
    // this.queryHospitalSales({
    //   queryType: this.queryType,
    //   page: 1,
    //   pageNum: 10
    // })
  },
  methods: {
    // 医院流向数据
    queryHospitalSales(form) {
      var that = this
      this.loading = true
      queryHospitalSales(form).then(res => {
        if (res.data.data.length > 0) {
          that.ruleForm.page++
          that.saleList = that.saleList.concat(res.data.data)
        } else {
          this.finished = true
        }
        this.loading = false
      })
    },
    // 跳到详情页
    xsGoDetail(item) {
      item.queryType = this.queryType
      this.$router.push({
        name: 'HospitalDataFlow',
        query: { hospital: JSON.stringify(item) }
      })
    },
    getQueryType(form) {
      this.queryType = form
      this.saleList = []
      this.ruleForm.page = 1
      this.ruleForm.pageNum = 10
      this.queryHospitalSales({ queryType: this.queryType, page: this.ruleForm.page, pageNum: this.ruleForm.pageNum })
    },
    changeForm(form) {
      this.saleList = []
      console.log(form)
      for (let keys in this.ruleForm) {
        if (form[keys]) {
          this.ruleForm[keys] = form[keys]
        }
      }
      this.ruleForm.page = 1
      this.ruleForm.pageNum = 10
      this.queryHospitalSales(this.ruleForm)
    },
    onRefresh() {
      this.saleList = []
      this.ruleForm.page = 1
      this.refreshing = false
      this.onLoad()
    },
    onLoad() {
      if (this.isLoad) {
        this.queryHospitalSales(this.ruleForm)
      } else {
        this.queryHospitalSales({
          queryType: this.queryType,
          page: 1,
          pageNum: 10
        })
        this.isLoad = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.xsBox {
  padding: 15px;
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