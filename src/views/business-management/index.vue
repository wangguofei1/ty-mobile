<template>
  <div class="container">
    <!-- <div class="xstitle">门店列表</div> -->
    <van-pull-refresh
      v-model="isLoading"
      :success-duration="1500"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        :error.sync="error"
        error-text="请求失败,重新加载"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-cell-group
          class="cell-group-top"
          inset
          v-for="(item, index) in dataList"
          :key="index"
          style="margin-top: 20px;"
          @click="goDetail(item.id)"
        >
            <van-cell :title="item.name"></van-cell>
            <van-cell :title="'开始日期：'+item.startDate"> </van-cell>
            <van-cell :title="'截至日期：'+item.endDate"> </van-cell>
            <van-cell :title="item.state"></van-cell>
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { queryTaskList } from '@/api/task'
export default {
  name: 'BusinessManagement',
  components: {},
  data() {
    return {
      page: 1,
      pageSize: 5,
      dataList: [],
      isLoading: false,
      refreshSuccessText: '',
      loading: false,
      finished: false,
      id: localStorage.getItem('id'),
      error: false
    }
  },
  created() {
    // this.getDataList()
  },
  computed: {},
  mounted() {},
  methods: {
    onRefresh() {
      this.dataList = []
      this.page = 1
      this.getDataList()
      this.isLoading = false
    },
    onLoad() {
      console.log(this.page)
      this.getDataList()
    },
    async getDataList() {
      const { page, pageSize, id, dataList } = this
      const parmas = { page, pageSize, id }
      this.loading = true
      const res = await queryTaskList(parmas)
      if (res.data.data.length > 0) {
        this.loading = false
        this.page++
        this.dataList = dataList.concat(res.data.data)
      } else {
        this.finished = true
      }
    },
    goDetail(id) {
      console.log(id)
      this.$router.push({
        name: 'ClockIn',
        query: { shopName: '南京德众堂大药房', id }
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
