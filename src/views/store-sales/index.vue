<template>
  <div>
    <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="getQueryType"></topNav>
    <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
    <div class="xsBox">
      <div class="xsItem" v-for="(item, index) in saleList" :key="index" @click="goDetail(item)">
        <div class="xsTitle">
          <div>
            <div class="xsText">{{ item.name }}</div>
            <div class="areaBox">{{ item.regionName }}/{{ item.sectionName }}/{{ item.provinceName }}</div>
          </div>
          <div class="xsGoDetail">
            <img
              class="phImg"
              v-if="index < 3"
              :src="
                index == 0
                  ? require('@/assets/images/guanjun.png')
                  : index == 1
                  ? require('@/assets/images/yajun.png')
                  : index == 2
                  ? require('@/assets/images/jijun.png')
                  : ''
              "
            />
          </div>
        </div>
        <div class="xsContent">
          <div class="xsNumBox">
            <div>销售数量（盒）</div>
            <div class="yeFont">{{ item.num }}</div>
          </div>
          <div class="xsNumBox1">
            <div>销售金额（万元）</div>
            <div class="yeFont">{{ item.total }}</div>
          </div>
        </div>
        <div class="xsFoot">
          <div class="xsFootBox">
            <span>同比： </span><span class="blkFont">{{ item.yoy }}</span>
          </div>
          <div class="xsFootBox1">
            <span>环比： </span><span class="blkFont">{{ item.mom }}</span>
          </div>
        </div>
      </div>
    </div>
    <!-- </van-list> -->
  </div>
</template>
      
<script>
import topNav from '../../components/topNav.vue'
import { queryShopSaleAnalysis } from '@/api/salesFlow'
import hosImg from '@/assets/images/hospitalImg.png'
export default {
  name: 'StoreSales',
  components: { topNav },
  data() {
    return {
      queryType: '1',
      ruleForm: {
        year: '2022',
        startMonth: '',
        endMonth: '',
        regionId: '',
        sectionId: '',
        provinceId: '',
        shopId: ''
        // page: 1,
        // pageNum: 10,
      },
      isShow: false,
      loading: false,
      saleList: [],
      finished: false,
      count: 0,
      hosImg: hosImg
    }
  },
  created() {
    this.queryShopSaleAnalysis({ queryType: this.queryType })
  },
  methods: {
    // 年度季度筛选
    getQueryType(form) {
      this.queryType = form
      this.saleList = []
      //   this.ruleForm.page = 1
      //   this.ruleForm.pageNum = 10
      this.queryShopSaleAnalysis({ queryType: this.queryType })
    },
    // 医院流向数据
    queryShopSaleAnalysis(form) {
      var that = this
      queryShopSaleAnalysis(form).then(res => {
        if (res.code == 0) {
          that.saleList = that.saleList.concat(res.data)
        }
      })
    },
    goDetail(item) {
      this.$router.push({
        name: 'StoreDetails',
        query: { hospital: JSON.stringify(item) }
      })
    },
    changeForm(form) {
      this.saleList = []
      //   this.ruleForm.page = 1
      //   this.ruleForm.pageNum = 10
      for (let keys in this.ruleForm) {
        if (form[keys]) {
          this.ruleForm[keys] = form[keys]
        }
      }
      this.queryShopSaleAnalysis(this.ruleForm)
    }
    // onLoad() {
    //   setTimeout(() => {
    //     this.page++
    //     this.queryShopSaleAnalysis(this.ruleForm)
    //     this.loading = false

    //     if (this.saleList.length >= this.count) {
    //       this.finished = true
    //     }
    //   }, 1000)
    // }
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
      margin: 0 10px;
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
      .areaBox {
        display: inline-block;
        margin: 3px 0 0 10px;
        opacity: 0.7;
        font-size: 12px;
        color: rgba(56, 154, 252, 1);
        border: 1px solid rgba(198, 226, 255, 1);
        padding: 1px 8px;
      }
      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        width: 28px;
        color: rgba(58, 160, 255, 1);
        font-size: 14px;
        .phImg {
          width: 30px;
          height: 35px;
        }
      }
    }
    .xsContent {
      width: calc(100%-30px);
      margin: 10px 15px 13px 15px;
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