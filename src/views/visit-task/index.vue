<template>
  <div class="visitTaskBg">
    <img style="width: 100%" src="@/assets/images/visitTask-bg.png" />
    <div class="visitTask-bottom">
      <div class="vt-body">
        <div style="text-align: center">
          <img class="vtImg1" src="@/assets/images/visitTask-title.png" />
        </div>
        <div class="item1">本次拜访药房需完成如下任务：</div>
        <div v-for="(item, index) in taskList" :key="item.id">
          <div class="vtTitle">
            <img class="vtImg2" src="@/assets/images/visitTask-item1.png" />
            <div class="vtText">
              <div class="top">{{ item.checkName }}</div>
              <div class="bottom">全方位精准盘查药房药品</div>
            </div>
            <div class="vtGoDetail">
              <van-button round size="mini" color="#4E87F6" style="padding: 0px 8px" @click="goDetail(item.id)"
                v-if="item.isCompleted === 0">去完成</van-button>
              <van-button round size="mini" color="#ccc" style="padding: 0px 8px" disabled
                v-else>已完成</van-button>
            </div>
          </div>
          <van-divider :dashed="true" :hairline="false" style="margin: 5px 0px" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { queryTaskDetail, uploadFile, save } from '@/api/task'
export default {
  name: 'VisitTask',
  components: {},
  data() {
    return {
      taskList: [],
      shopName: ''
    }
  },
  created() {
    this.getDetail(this.$route.query.id)
  },
  computed: {},
  mounted() { },
  methods: {
    async getDetail(id) {
      const res = await queryTaskDetail({ id })
      if (res.code == 0) {
        this.shopName = res.data.shopName
        this.taskList = res.data.checkList
      }
    },
    goDetail(id) {
      // if (type == 1) {
      //   this.$router.push({
      //     name: 'InventoryCheck',
      //     query: { shopName: '南京德众堂大药房',id:this.$route.query.id }
      //   })
      // } else if (type == 2) {
      //   this.$router.push({
      //     name: 'ColdChainInspection',
      //     query: { shopName: '南京德众堂大药房',id:this.$route.query.id }
      //   })
      // }
      this.$router.push({
        name: 'InventoryCheck',
        query: { shopName: this.shopName, id: id, rid: this.$route.query.id }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.visitTaskBg {
  height: 100vh;
  background: linear-gradient(#79b3ff, #6392ee);
}

.visitTask-bottom {
  padding: 0px 10px;

  .vt-body {
    background-color: white;
    height: 320px;
    padding: 0px 15px;
    border-radius: 0 0 3px 3px;

    .vtImg1 {
      height: 30px;
      margin-top: -1px;
    }

    .item1 {
      color: #5676d4;
      font-size: 14px;
      font-weight: 600;
      line-height: 50px;
      margin-bottom: 10px;
    }

    .vtTitle {
      display: flex;

      .vtImg2 {
        width: 65px;
        height: 65px;
      }

      .vtText {
        margin-left: 20px;

        .top {
          line-height: 40px;
          font-size: 15px;
          font-weight: 700;
          color: rgba(25, 28, 47, 1);
        }

        .bottom {
          line-height: 15px;
          font-size: 10px;
          font-weight: 500;
          color: #bababb;
        }
      }

      .vtGoDetail {
        line-height: 65px;
        margin-left: auto;
        width: 60px;
      }
    }
  }
}
</style>
