<template>
  <div class="sjfxBox">
    <div class="title">销售统计</div>
    <div class="xsBox">
      <div class="xsItem" v-for="item in xsItemList1" @click="goDetail(item.url)" :key="item.xsText">
        <img class="xsImg" :src="item.xsImg" />
        <div class="xsText">{{ item.xsText }}</div>
      </div>
    </div>
    <div class="title">患者统计</div>
    <div class="xsBox">
      <div class="xsItem" v-for="item in xsItemList2" @click="goDetail(item.url)" :key="item.xsText">
        <img class="xsImg" :src="item.xsImg" />
        <div class="xsText">{{ item.xsText }}</div>
      </div>
    </div>
    <div class="title">商务管理</div>
    <div class="xsBox">
      <div class="xsItem" v-for="item in xsItemList3" @click="goDetail(item.url)" :key="item.xsText">
        <img class="xsImg" :src="item.xsImg" />
        <div class="xsText">{{ item.xsText }}</div>
      </div>
    </div>
    <foot-bar @goUrl="toUrl" :active="tabActive"></foot-bar>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'DataAnalysis',
  components: {
    footBar: () => import('@/components/footBar')
  },
  data() {
    return {
      tabActive: 1,
      xsItemList1: [
        {
          xsImg: require('@/assets/images/xsImg1.png'),
          xsText: '销售汇总',
          url: 'salesYearly'
        },
        {
          xsImg: require('@/assets/images/xsImg2.png'),
          xsText: '销售流向',
          url: 'SalesFlow'
        },
        // {
        //   xsImg: require('@/assets/images/xsImg3.png'),
        //   xsText: '指标达成率',
        //   url: 'IndexAchievementRate'
        // },
        // {
        //   xsImg: require('@/assets/images/xsImg4.png'),
        //   xsText: '业务员销售',
        //   url: 'SalesmanSales'
        // },
        {
          xsImg: require('@/assets/images/xsImg5.png'),
          xsText: '门店销售情况',
          url: 'StoreSales'
        }
      ],
      xsItemList2: [
        {
          xsImg: require('@/assets/images/xsImg6.png'),
          xsText: '患者信息',
          url: 'PatientInfo'
        },
        {
          xsImg: require('@/assets/images/xsImg7.png'),
          xsText: '新老患者分析',
          url: 'PatientAnalysis'
        },
        {
          xsImg: require('@/assets/images/xsImg8.png'),
          xsText: '患者结构分析',
          url: 'PatientStructure'
        },
        {
          xsImg: require('@/assets/images/xsImg9.png'),
          xsText: '门店服务情况',
          url: 'StoreServiceDetail'
        }
      ],
      xsItemList3: [
        {
          xsImg: require('@/assets/images/xsImg6.png'),
          xsText: '拜访任务',
          url: 'BusinessManagement'
        }
      ],
    }
  },
  created() {},
  computed: {},

  mounted() {},

  methods: {
    goDetail(url) {
      this.$router.push({
        name: url
      })
    },
    toUrl(e) {
      if (e == 0) {
        this.$router.push({
          name: 'Home'
        })
      } else if (e == 2) {
        this.$router.push({
          name: 'PersonalCenter'
        })
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sjfxBox {
  padding: 16px;
  margin-bottom: 22px;
  width: 100%;
  box-sizing: border-box;
  font-size: 16px;
  color: rgba(25, 28, 47, 1);
  .title {
    font-weight: 700;
    position: relative;
    padding-left: 15px;
    margin-bottom: 10px;
  }
  .title::after {
    content: '';
    width: 4px;
    height: 16px;
    border-radius: 1px;
    background: rgba(56, 154, 252, 1);
    position: absolute;
    left: 0px;
    top: 4px;
  }
  .xsBox {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-bottom: 20px;
    .xsItem {
      width: 164px;
      height: 123px;
      margin-bottom: 15px;
      border-radius: 4px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 2px 2px 6px 2px rgba(237, 242, 250, 1);
      text-align: center;
      .xsImg {
        width: 56px;
        height: 56px;
        margin-top: 20px;
      }
      .xsText {
        margin-top: 5px;
        line-height: 23px;
        font-size: 16px;
        color: rgba(56, 56, 56, 1);
        vertical-align: top;
      }
    }
  }
}
</style>