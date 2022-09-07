<template>
  <div>
    <!-- <div class="flex1 title1" style="background:#2b92f9">
            <div style="width:50%">
                <van-tabs v-model="ruleForm.queryType" background="#2b92f9" color="#fff" title-inactive-color="#fff"
                    title-active-color="#fff">
                    <van-tab title="本年" name="1"></van-tab>
                    <van-tab title="本季度" name="2"></van-tab>
                    <van-tab title="本月" name="3"></van-tab>
                </van-tabs>
            </div>
            <div class="flex1 content1">
                <span style="color:#fff">筛选</span>
                <span style="margin-left:10px"><img src="../../assets/images/saleImages/三角形 1@3x.png" /></span>
            </div>
        </div> -->
    <van-form>
      <div class="content3">
        <div @click="isYearShow = isYearShow ? false : true">
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>年份</div>
                <div>
                  <span :style="ruleForm.year ? 'color: #000;' : ''">{{ ruleForm.year }}年</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
              <!-- <van-field v-model="ruleForm.year" is-link readonly label="地区" placeholder="请选择所在地区"
                                @click="show = true" /> -->
            </van-col>
          </van-row>
        </div>
        <div @click="isMonthShow = isMonthShow ? false : true">
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>时间区间</div>
                <div>
                  <span :style="ruleForm.startMonth ? 'color: #000;' : ''">{{ ruleForm.startMonth }}月~{{ ruleForm.endMonth }}月</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div>
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>商品</div>
                <div>
                  <span>请选择商品</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div @click="show = show ? false : true">
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>区域</div>
                <div>
                  <span>请选择大区、片区、省区</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div @click="isShopShow = isShopShow ? false : true">
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>门店</div>
                <div>
                  <span>请选择门店</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
            </van-col>
          </van-row>
        </div>
        <div style="margin-top: 20px">
          <van-row type="flex" justify="space-around">
            <van-col :span="10">
              <van-button type="default" block>重置</van-button>
            </van-col>
            <van-col :span="10">
              <van-button type="info" @click="submitForm" color="#399DFA" block>确认</van-button>
            </van-col>
          </van-row>
        </div>
      </div>
    </van-form>
    <div class="content4">
      <div>
        <van-popup v-model="isYearShow" round position="bottom">
          <van-datetime-picker
            v-model="ruleForm.year"
            type="year-month"
            title="选择年份"
            :filter="filter"
            :formatter="formatter"
            @confirm="confirmTime"
          />
        </van-popup>
      </div>
      <div>
        <van-popup v-model="isMonthShow" round position="bottom">
          <van-datetime-picker
            v-model="ruleForm.startMonth"
            type="month-day"
            title="开始月份"
            :filter="filter1"
            :formatter="formatter"
            @confirm="confirmTime1"
          />
        </van-popup>
      </div>
      <div>
        <van-popup v-model="isMonthShow2" round position="bottom">
          <van-datetime-picker
            v-model="ruleForm.endMonth"
            type="month-day"
            title="截止月份"
            :filter="filter2"
            :formatter="formatter"
            @confirm="confirmTime2"
          />
        </van-popup>
      </div>
      <div>
        <van-popup v-model="show" round position="bottom">
          <van-cascader
            v-model="cascaderValue"
            title="请选择所在地区"
            :options="options"
            :field-names="fieldNames"
            @finish="finfishSelect"
          />
        </van-popup>
      </div>
      <div>
        <van-popup v-model="isShopShow" round position="bottom">
          <van-picker title="选择门店" show-toolbar :columns="columns" @confirm="confirmShop" />
        </van-popup>
      </div>
    </div>
  </div>
</template>

<script>
import { queryTree, queryShop } from '../../api/sales'
export default {
  name: 'saleForm',
  data() {
    return {
      show: false,
      isYearShow: false,
      isMonthShow: false,
      isMonthShow2: false,
      isShopShow: false,
      cascaderValue: '',
      options: [],
      fieldNames: {
        text: 'name',
        value: 'id'
      },
      columns: [],
      shopList: []
    }
  },
  props: {
    ruleForm: {
      type: Object,
      default: {
        queryType: 1
      }
    },
    utilsShow: {
      default: ''
    }
  },
  methods: {
    submitForm() {
      let form = JSON.parse(JSON.stringify(this.ruleForm))
      this.$emit('changeForm', form)
    },
    confirmShop(item, index) {
      this.ruleForm.shopId = this.shopList[index].id
    },
    deletechildren(data) {
      for (let item of data) {
        if (item.children.length == 0) {
          delete item.children
        } else if (item.children) {
          this.deletechildren(item.children)
        }
      }
    },
    finfishSelect({ value, selectedOptions, tabIndex }) {
      this.ruleForm.regionId = selectedOptions[0].id
      this.ruleForm.sectionId = selectedOptions[1].id
      this.ruleForm.provinceId = selectedOptions[2].id
      queryShop({
        regionId: this.ruleForm.regionId * 1,
        page: 1,
        pageSize: 100,
        sectionId: this.ruleForm.sectionId * 1,
        provinceId: this.ruleForm.provinceId
      }).then(res => {
        if (res.code == 0) {
          this.shopList = res.data.data
          this.columns = res.data.data.map(item => item.name)
        }
      })
    },
    confirmTime2(value) {
      let date = new Date(value)
      this.ruleForm.endMonth = date.getMonth() + 1
      this.isMonthShow2 = false
    },
    confirmTime1(value) {
      let date = new Date(value)
      this.ruleForm.startMonth = date.getMonth() + 1
      this.isMonthShow = false
      this.isMonthShow2 = true
    },
    confirmTime(value) {
      let date = new Date(value)
      this.ruleForm.year = date.getFullYear()
      this.isYearShow = false
    },
    filter(type, options) {
      if (type === 'month') {
        return options.filter(option => option == '')
      }
      if (type === 'year') {
        return options.filter(option => option)
      }
    },
    filter1(type, options) {
      if (type === 'month') {
        return options.filter(option => option)
      }
      if (type === 'day') {
        return options.filter(option => option === '')
      }
    },
    filter2(type, options) {
      if (type === 'month') {
        return options.filter(option => option > this.ruleForm.startMonth)
      }
      if (type === 'day') {
        return options.filter(option => option === '')
      }
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年'
      }
      if (type === 'month') {
        return val + '月'
      }
      if (type === 'day') {
        return val + '日'
      }
      return val
    }
  },
  mounted() {
    queryTree().then(res => {
      this.deletechildren(res.data[0].children)
      this.options = res.data[0].children
    })
  }
}
</script>

<style lang="scss" scoped>
.flex1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
}

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

.content3 {
  background-color: #fff;
  padding: 15px 0;
  > div {
    margin-bottom: 0.233rem;
    line-height: 38px;

    .content2 {
    border-radius: 4px;
      background-color: #f2f3f5;
      padding: 0 12px 0 14px;
      > div:nth-child(1) {
        font-size: 14px;
        font-weight: 500;
        color: rgba(128, 128, 128, 1);
      }
      > div:nth-child(2) {
        > span:nth-child(1) {
          font-size: 13px;
          font-weight: 700;
          color: #999;;
        }
        > span:nth-child(2) {
          font-size: 14px;
          font-weight: 500;
          color: rgba(128, 128, 128, 1);
        }
        > span {
          display: inline-block;
          padding-right: 10px;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.content4 {
  .van-picker-column:nth-child(2) {
    display: none;
  }
}
</style>