<template>
  <div class="coldChainInspectionBg">
    <div class="llBox1">
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content1 item-bt">
            <div>盘查药房</div>
            <div>
              <span style="color: #000">{{ checkShopName }}</span>
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content1">
            <div>盘查时间</div>
            <div>
              <span style="color: #000">{{ checkDate | formatDateHM }}</span>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="llBox2">
      <div class="title1 item-bt">
        <img src="@/assets/images/coldChain-icon.png" />
        <div>请检查以下冷链相关是否符合规范</div>
      </div>
      <div class="item-bt">
        <van-cell>
          <template #title>
            <div class="inspectionContent">
              <span>[<span style="padding: 0 1px; font-size: 12px">1</span>]</span>
              是否具备与经营规模和品种相适应的冷库和冷链设备?
            </div>
          </template>
          <template #right-icon>
            <van-checkbox v-model="checkbox1" />
          </template>
        </van-cell>
      </div>
      <div class="item-bt">
        <van-cell style="line-height: 48px">
          <template #title>
            <div class="inspectionContent">
              <span>[<span style="padding: 0 1px; font-size: 12px">2</span>]</span>
              冷链监控设备是否正常?
            </div>
          </template>
          <template #right-icon>
            <van-checkbox v-model="checkbox2" />
          </template>
        </van-cell>
      </div>
      <div class="item-bt">
        <van-cell style="line-height: 48px">
          <template #title>
            <div class="inspectionContent">
              <span>[<span style="padding: 0 1px; font-size: 12px">3</span>]</span>
              冷链环境、温度是否正常?
            </div>
          </template>
          <template #right-icon>
            <van-checkbox v-model="checkbox3" />
          </template>
        </van-cell>
      </div>
      <div>
        <van-cell>
          <template #title>
            <div class="inspectionContent">
              <span>[<span style="padding: 0 1px; font-size: 12px">4</span>]</span>
              计量器具、温湿度监测设备是否校验准确?
            </div>
          </template>
          <template #right-icon>
            <van-checkbox v-model="checkbox4" />
          </template>
        </van-cell>
      </div>
      <div style="padding: 0 10px">
        <van-button
          type="primary"
          size="large"
          color="#4873EE"
          style="border-radius: 6px; margin-top: 30px"
          @click="goDetail()"
          >确定</van-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'ColdChainInspection',
  components: {},
  data() {
    return {
      checkShopName: '南京德众堂大药房',
      checkDate: '2022-07-09 12:00',
      checkbox1: false,
      checkbox2: false,
      checkbox3: false,
      checkbox4: false
    }
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    goDetail(url) {
      Dialog.confirm({
        message: '请确认冷链飞检是否完成？'
      })
        .then(() => {
          this.$router.push({
            name: 'VisitTask',
            query: { coldChainInspection: true }
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.coldChainInspectionBg {
  padding: 72px 10px 0px 10px;
  background: url('../../assets/images/checkTaskBg.png') no-repeat;
  background-size: 100% 5rem;
  .flex1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
  }
  .content1 {
    line-height: 45px;
    > div:nth-child(1) {
      font-size: 14px;
      font-weight: 500;
      color: #939393;
    }

    > div:nth-child(2) {
      > span:nth-child(1) {
        font-size: 13px;
        font-weight: 500;
        margin-right: 10px;
      }
    }
  }
  .item-bt {
    border-bottom: 1px solid #f4f4f4;
  }
}
.llBox1 {
  background-color: #fff;
  padding: 30px 10px 0px 10px;
  border-radius: 8px;
}
.llBox2 {
  background-color: #fff;
  margin-top: 20px;
  padding: 10px 0px 30px 0px;
  border-radius: 8px;
  .title1 {
    padding: 0px 10px 15px 10px;
    display: flex;
    img {
      align-self: center;
      width: 33px;
    }
    div {
      margin-left: 10px;
      align-self: center;
      font-size: 14px;
      font-weight: 600;
      color: #a0a0a0;
    }
  }
  .inspectionContent {
    width: 235px;
    span {
      color: #708fe0;
    }
  }
}
::v-deep .van-checkbox__icon--checked .van-icon {
  color: #1989fa;
  background-color: #fff;
  border-color: #c8c9cc;
}
::v-deep .van-checkbox__icon .van-icon {
  border-radius: 3px;
}
::v-deep .van-cell {
  padding: 0.13333rem 0.42667rem;
}
</style>
