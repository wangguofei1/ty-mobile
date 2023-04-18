<template>
  <div class="main">
    <div class="form">
      <van-form @submit="onSubmit" ref="form">
        <van-cell-group>
          <van-field
            v-model="name"
            required
            clearable
            label="任务名称"
            placeholder="请输入任务名称"
            :rules="[{ required: true, message: '请填写任务名称'}]"
          />
          <van-field
            v-model="description"
            clearable
            label="任务描述"
            placeholder="请输入任务描述"
            type="textarea"
            rows="2"
            autosize
          />
          <van-field
            v-model="shopName"
            required
            label="药房"
            placeholder="请选择"
            @click="showShop = true"
            readonly
            :rules="[{ required: true, message: '请选择药房'}]"
          />
          <van-popup v-model="showShop" round position="bottom">
            <van-picker show-toolbar :columns="shopList" value-key="name" @confirm="selectShop" @cancel="cancelShop" />
          </van-popup>
          <van-field
            required
            label="合规检查"
            :rules="[{ required: true, message: '请选择合规检查'}]"
          >
            <template #input>
              <van-checkbox-group v-model="checkIds" direction="horizontal">
                <van-checkbox v-for="item in checkList" :name="item.id">{{ item.name
                }}</van-checkbox>
              </van-checkbox-group>
            </template>
          </van-field>
          <van-field
            v-model="startDate"
            required
            label="任务开始时间"
            placeholder="请选择"
            @click="startShow = true"
            readonly
            :rules="[{ required: true, message: '请选择任务开始时间'}]"
          />
          <van-popup v-model="startShow" round position="bottom">
            <van-datetime-picker
              v-model="stD"
              type="date"
              @confirm="changeStart"
              @cancel="cancalStart"
            />
          </van-popup>
          <van-field
            v-model="endDate"
            required
            label="任务结束时间"
            placeholder="请选择"
            @click="endShow = true"
            readonly
            :rules="[{ required: true, message: '请选择任务结束时间'}]"
          />
          <van-popup v-model="endShow" round position="bottom">
            <van-datetime-picker
              v-model="enD"
              type="date"
              :min-date="stD"
              @confirm="changeEnd"
              @cancel="cancalEnd"
            />
          </van-popup>
          <van-button type="primary" size="large" color="#4873EE" style="border-radius: 6px; margin-top: 60px" native-type="submit">提交</van-button>
        </van-cell-group>
      </van-form>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { queryCheckList, queryShopList, save } from '@/api/task'
export default {
  name: 'AddTask',
  components: {},
  data() {
    return {
      checkList: [],
      shopList: [],
      checks: [],
      startDate: '',
      stD: new Date(),
      endDate: '',
      enD: new Date(),
      shopAxis: '',
      shopId: '',
      shopName: '',
      name: '',
      salesmanId: '171994671617146880',
      description: '',
      showShop: false,
      checkIds: [],
      startShow: false,
      endShow: false,
    }
  },
  created() {
    this.getDetail()
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      const that = this
      this.$refs.form.validate().then(() => {
        that.checks = that.checkList.filter(v => { return that.checkIds.includes(v.value) }).map(v => {
          return {
            'checkId': v.value,
            'checkName': v.label
          }
        })
        save({
          name: that.name,
          checks: that.checks,
          startDate: that.startDate,
          endDate: that.endDate,
          description: that.description,
          salesmanId: that.salesmanId,
          shopId: that.shopId,
          shopAxis: that.shopAxis
        }).then((res) => {
          if (res.code == 0) {
            Toast({
              message: '提交成功', onClose: () => {
                this.$router.push({
                  name: 'BusinessManagement'
                })
              }
            })
          }
        })
      })
    },
    async getDetail() {
      const a = await queryCheckList()
      this.checkList = a.data.data
      const b = await queryShopList("171994671617146880")
      this.shopList = b.data
    },
    selectShop(shop) {
      this.shopAxis = shop.axis
      this.shopId = shop.id
      this.shopName = shop.name
      this.showShop = false
    },
    cancelShop() {
      this.showShop = false
    },
    changeStart(i) {
      this.startDate = this.timeFormat(i)
      this.startShow = false
    },
    cancalStart() {
      this.startShow = false
    },
    changeEnd(i) {
      this.endDate = this.timeFormat(i)
      this.endShow = false
    },
    cancalEnd() {
      this.endShow = false
    },
    timeFormat(time) {
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let day = time.getDate()
      return year + '-' + this.formatNum(month) + '-' + this.formatNum(day)
    },
    formatNum(a) {
      if(a >= 10) return a
      return '0' + a
    },
    submit() {

    }
  }
}
</script>
<style lang="scss" scoped>
.main {
  .form {
    background-color: #fff;
    padding: 10px;
  }
}
</style>
