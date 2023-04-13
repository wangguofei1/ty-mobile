<template>
  <div class="inventoryCheckBg">
    <div class="jxBox1">
      <van-row type="flex" justify="center">
        <van-col :span="24">
          <div class="flex1 content1 item-bt">
            <div>盘查药房</div>
            <div>
              <span style="color: #000">{{ shopName }}</span>
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
    <div class="jxBox2">
      <van-form @submit="onSubmit">
        <div v-for="(item, index) in taskList" :key="index">
          <van-row type="flex" justify="center" v-if="item.type == 'radio'">
            <van-col :span="24">
              <div class="flex1 content2 item-bt">
                <!-- <van-field name="pinzhong1" v-model="item.value" placeholder="请输入" input-align="right" type="digit">
                  <template #label>
                    <div class="left">{{ item.title }}</div>
                  </template>
                  <template slot="button">盒</template>
                </van-field> -->
                <van-field name="radio" :label="item.title" :label-width=260 style="display: block;">
                  <template #input>
                    <van-radio-group v-model="item.value" direction="horizontal">
                      <van-radio v-for="(item1, index1) in JSON.parse(item.options)" :name="item1.value">{{ item1.label
                      }}</van-radio>
                      <!-- <van-radio name="2">单选框 2</van-radio> -->
                    </van-radio-group>
                  </template>
                </van-field>
              </div>
            </van-col>
          </van-row>
          <van-row v-if="item.type == 'select'" type="flex" justify="center">
            <van-col :span="24">
              <van-field readonly clickable name="pinzhong" :value="item.value | change11(index, taskList)"
                placeholder="请选择" @click="changeTask(index)" input-align="right" :label-width=120>
                <template #label>
                  <div class="left">{{ item.title }}</div>
                </template>
              </van-field>
              <van-popup v-model="isCheckList[index]" round position="bottom">
                <van-picker show-toolbar :columns="JSON.parse(item.options)" value-key="label"
                  @confirm="(item) => { confirmMedicine(item, index) }" @cancel="cancelTask(index)" />
              </van-popup>
            </van-col>
          </van-row>
          <van-row type="flex" justify="center" v-if="item.type == 'input'">
            <van-col :span="24">
              <div class="flex1 content2 item-bt">
                <van-field name="pinzhong1" v-model="item.value" placeholder="请输入" input-align="right" type="digit">
                  <template #label>
                    <div class="left">{{ item.title }}</div>
                  </template>
                  <template slot="button">盒</template>
                </van-field>
              </div>
            </van-col>
          </van-row>
        </div>
        <van-button type="primary" size="large" color="#4873EE" style="border-radius: 6px; margin-top: 60px"
          @click="goDetail()" native-type="submit">确定</van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Dialog, RadioGroup, Radio,Toast } from 'vant'
import { queryTaskDeatil, submitTaskDeatil } from "@/api/task.js"
let that11;
export default {
  name: 'InventoryCheck',
  data() {
    return {
      value: '',
      isMedicineShow: false,
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
      ],
      taskList: [],
      index: null,
      isCheckList: [],
      shopName: this.$route.query.shopName
    }
  },
  components: {
    RadioGroup, Radio
  },
  filters: {
    change11(item, index, taskList) {
      if (item) {
        for (let index1 in JSON.parse(taskList[index].options)) {
          if (JSON.parse(taskList[index].options)[index1].value == item ? item : null) {
            console.log(JSON.parse(taskList[index].options)[index1].label);
            return JSON.parse(taskList[index].options)[index1].label;
          }
        }
      }
      return null
    }
  },
  created() {
    this.queryTaskDeatil1();
    that11 = this;
  },
  computed: {
  },
  mounted() { },
  methods: {
    cancelTask(index) {
      this.$set(this.isCheckList, index, false);
    },
    changeTask(index) {
      this.$set(this.isCheckList, index, true);
    },
    changeMedicine(index) {
      this.index = index;
    },
    onSubmit(data) {
      console.log(data);
    },
    confirmMedicine(item, index) {
      this.taskList[index].value = item.value;
      console.log(item);
      this.$set(this.isCheckList, index, false)
    },
    unit(value) {
      this.value = this.value + '盒'
    },
    goDetail(url) {
      const that = this;
      Dialog.confirm({
        message: '请确认是否完成？'
      })
        .then(() => {
          submitTaskDeatil({ details: that.taskList, taskCheckId: that.$route.query.id }).then((res) => {
            if (res.code == 0) {
              Toast({
                message: '提交成功', onClose: () => {
                  this.$router.push({
                    name: 'VisitTask',
                    query: { inventoryCheck: true }
                  })
                }
              });
            }
          })
        })
        .catch(() => {
          // on cancel
        })
    },
    async queryTaskDeatil1() {
      const that = this;
      let res = await queryTaskDeatil(this.$route.query.id);
      if (res.code == 0) {
        this.taskList = res.data;
        this.taskList.forEach((item, index) => {
          that.$set(this.isCheckList, index, false)
        })
      }
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

    >div:nth-child(1) {
      font-size: 14px;
      font-weight: 500;
      color: #939393;
    }

    >div:nth-child(2) {
      >span:nth-child(1) {
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
