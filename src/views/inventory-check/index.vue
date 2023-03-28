<template>
  <div class="inventoryCheckBg">
    <div class="jxBox1">
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
              <span style="color: #000">{{ checkDate | for++-matDateHM }}</span>
            </div>
          </div>
        </van-col>
      </van-row>
    </div>
    <div class="jxBox2">
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content1 item-bt">
            <div class="left">盘查品种</div>
            <div class="right" @click="isMedicineShow = isMedicineShow ? false : true">
              <span style="color: #323233" v-if="medicineName">{{ medicineName }}</span>
              <span style="color: #c8c9cc" v-if="!medicineName">请选择药品</span>
              <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
            </div>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content2 item-bt">
            <van-field v-model="purchaseThisMonth" placeholder="请输入本月进货/" input-align="right" type="digit">
              <template #label>
                <div class="left">本月进货</div>
              </template>
              <template slot="button">盒</template>
            </van-field>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content2 item-bt">
            <van-field v-model="salesVolumeThisMonth" placeholder="请输入本月销量/" input-align="right" type="digit">
              <template #label>
                <div class="left">本月销量</div>
              </template>
              <template slot="button">盒</template>
            </van-field>
          </div>
        </van-col>
      </van-row>
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content2 item-bt">
            <van-field v-model="currentInventory" placeholder="请输入当前库存/" input-align="right" type="digit">
              <template #label>
                <div class="left">当前库存</div>
              </template>
              <template slot="button">盒</template>
            </van-field>
          </div>
        </van-col>
      </van-row>
      <van-button
        type="primary"
        size="large"
        color="#4873EE"
        style="border-radius: 6px; margin-top: 60px"
        @click="goDetail()"
        >确定</van-button
      >
    </div>
    <div>
      <van-popup v-model="isMedicineShow" round position="bottom">
        <van-picker
          show-toolbar
          :columns="medicineList"
          value-key="name"
          @confirm="confirmMedicine"
          @cancel="isMedicineShow = false"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
export default {
  name: 'InventoryCheck',
  components: {},
  data() {
    return {
      value: '',
      isMedicineShow: false,
      checkShopName: '南京德众堂大药房',
      checkDate: '2022-07-09 12:00',
      medicineName: '恩莱瑞',
      purchaseThisMonth: 1,
      salesVolumeThisMonth: 78,
      currentInventory: 108,
      medicineList: [
        { name: '恩莱瑞', id: 12 },
        { name: '拓益', id: 13 },
        { name: '泰瑞达', id: 125 },
        { name: '类克', id: 122 },
        { name: '唯择', id: 1332 }
      ]
    }
  },
  created() {},
  computed: {},
  mounted() {},
  methods: {
    confirmMedicine(item) {
      this.medicineName = item.name
      this.isMedicineShow = false
    },
    unit(value) {
      this.value = this.value + '盒'
    },
    goDetail(url) {
      Dialog.confirm({
        message: '请确认进销存盘查是否完成？'
      })
        .then(() => {
          this.$router.push({
            name: 'VisitTask',
            query: { inventoryCheck: true }
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
.inventoryCheckBg {
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
.jxBox1 {
  background-color: #fff;
  padding: 30px 10px 0px 10px;
  border-radius: 8px;
}
.jxBox2 {
  background-color: #fff;
  margin-top: 20px;
  padding: 10px 10px 30px 10px;
  border-radius: 8px;
  .content2 {
    line-height: 43px;
    .left {
      font-size: 14px;
      color: #939393;
    }

    .right {
      font-size: 14px;
      margin-right: 10px;
    }
  }
}
.van-cell {
  padding: 0.26667rem 0;
}
.van-cell::after {
  border-bottom: 0px;
}

::v-deep .van-field__button {
  padding-left: 0px;
  padding-right: 0.21333rem;
  color: #323233;
}
</style>
