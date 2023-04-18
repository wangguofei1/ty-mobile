<template>
  <div class="container">
    <!-- <div class="xstitle">门店列表</div> -->
    <van-tabs v-model="isComplete" sticky @click="onClick">
      <van-tab title="未完成"></van-tab>
      <van-tab title="已完成"></van-tab>
    </van-tabs>
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
          @click="goDetail(item.id, item.state)"
        >
            <van-cell :title="item.name" style="font-weight: bold;" />
            <van-cell :title="item.description" />
            <van-cell :title="item.startDate + ' ~ ' + item.endDate" />
            <van-cell :title="item.state | stateFilter" />
        </van-cell-group>
      </van-list>
    </van-pull-refresh>
    <van-icon name="add" class="add" @click="toAdd" />
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
      error: false,
      isComplete: 0
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
      this.active = 0
      this.page = 1
      this.getDataList()
      this.isLoading = false
    },
    onLoad() {
      this.getDataList()
    },
    async getDataList() {
      const { page, pageSize, id, dataList, isComplete } = this
      const parmas = { page, pageSize, id, isComplete }
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
    goDetail(id, state) {
      if(state === 0) {
        this.$router.push({
          name: 'ClockIn',
          query: { id }
        })
      } else {
        this.$router.push({
          name: 'VisitTask',
          query: { id: id }
        })
      }
    },
    onClick(index) {
      if(index !== this.active) {
        this.dataList = []
        this.page = 1
        this.getDataList()
      }
    },
    toAdd() {
      this.$router.push({
        name: 'AddTask'
      })
    }
  },
  filters: {
    stateFilter(state) {
      let re = ''
      switch(state){
        case 0:
          re = '待执行'
          break
        case 1:
          re = '已签到'
          break
        case 2:
          re = '已执行'
          break
        case 9:
          re = '已取消'
          break
      }
      return re
    }
  }
}
</script>
<style lang="scss" scoped>
.add {
  font-size: 30px;
  position: fixed;
  bottom: 20px;
  right: 2px;
  z-index: 999;
}

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
