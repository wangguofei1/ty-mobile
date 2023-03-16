<template>
  <div>
    <div class="businessManagementTitleTitle">商务管理</div>
    <!-- <div class="xstitle">门店列表</div> -->
    <div class="xsBox">
      <div class="xsItem">
        <div class="xsTitle" @click="goDetail()">
          <div class="shopName"><span class="sectionName">拜访药房：</span>南京德众堂大药房</div>
          <div class="shopName"><span class="sectionName">拜访时间：</span>2022.07.09 12:00</div>
          <div class="shopName"><span class="sectionName">拜访内容：</span>我怎么知道</div>
        </div>
      </div>
      <div class="xsItem">
        <div class="xsTitle" @click="goDetail()">
          <div class="shopName"><span class="sectionName">拜访药房：</span>南京德众堂大药房</div>
          <div class="shopName"><span class="sectionName">拜访时间：</span>2022.07.09 12:00</div>
          <div class="shopName"><span class="sectionName">拜访内容：</span>我怎么知道</div>
        </div>
      </div>
      <div class="xsItem">
        <div class="xsTitle" @click="goDetail()">
          <div class="shopName"><span class="sectionName">拜访药房：</span>南京德众堂大药房</div>
          <div class="shopName"><span class="sectionName">拜访时间：</span>2022.07.09 12:00</div>
          <div class="shopName"><span class="sectionName">拜访内容：</span>我怎么知道</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BusinessManagement',
  components: {},
  data() {
    return {}
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    goDetail(url) {
      this.$router.push({
        name: 'ClockIn',
        query: { shopName: '南京德众堂大药房' }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.businessManagementTitleTitle {
  text-align: center;
  font-size: 16px;
  padding-top: 20px;
}
.xstitle {
  font-weight: 700;
  position: relative;
  padding-left: 30px;
  margin-bottom: 10px;
}

.xstitle::after {
  content: '';
  width: 4px;
  height: 16px;
  border-radius: 1px;
  background: rgba(56, 154, 252, 1);
  position: absolute;
  font-size: 15px;
  left: 15px;
  top: 1px;
}
.xsBox {
  padding: 15px;
  box-sizing: border-box;

  .xsItem {
    width: 100%;
    background-color: #fff;
    padding: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    margin-bottom: 15px;

    .shopName {
      font-size: 14px;

      .sectionName {
        color: gray;
      }
    }
  }
}
</style>
