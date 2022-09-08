<template>
  <div class="swipeBox">
    <van-swipe class="my-swipe" style="height: 155px;" :autoplay="300000" indicator-color="#000">
      <van-swipe-item>
        <div class="swipeItem">
          <div class="card-panel">
            <div class="indexRow">
              <img class="indexMg" src="@/assets/images/year1.png" />
              <div class="headTitle">
                <span>销售额 </span>
              </div>
              <div class="tabSta">
                <div @click="handleClick1(0)" :class="activeName1 == 0 ? 'active' : ''">全部</div>
                <div @click="handleClick1(160)" :class="activeName1 == 160 ? 'active' : ''">规格一</div>
                <div @click="handleClick1(357)" :class="activeName1 == 357 ? 'active' : ''">规格二</div>
              </div>
            </div>
            <div class="salesBox">
              {{ salesPriceInfo.currSalePrice }}
            </div>
            <div class="ratioRow">
              <div v-if="salesPriceInfo.yearGrowthRate">
                同比：<span class="yearOnYear">{{ salesPriceInfo.yearGrowthRate }}%</span>
                <i
                  v-if="salesPriceInfo.yearGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesPriceInfo.yearGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
              <div v-if="salesPriceInfo.monthGrowthRate">
                环比：<span class="ringRatio">{{ salesPriceInfo.monthGrowthRate }}%</span>
                <i
                  v-if="salesPriceInfo.monthGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesPriceInfo.monthGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
            </div>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item>
        <div class="swipeItem">
          <div class="card-panel">
            <div class="indexRow">
              <img class="indexMg" src="@/assets/images/year2.png" />
              <div class="headTitle">
                <span>销量 </span>
              </div>
              <div class="tabSta">
                <div @click="handleClick2(0)" :class="activeName2 == 0 ? 'active' : ''">全部</div>
                <div @click="handleClick2(160)" :class="activeName2 == 160 ? 'active' : ''">规格一</div>
                <div @click="handleClick2(357)" :class="activeName2 == 357 ? 'active' : ''">规格二</div>
              </div>
            </div>
            <div class="salesBox" style="color: rgba(42, 130, 228, 1);">
              {{ salesNumInfo.ringSaleNum }}
            </div>
            <div class="ratioRow">
              <div v-if="salesNumInfo.yearGrowthRate">
                同比：<span class="yearOnYear">{{ salesNumInfo.yearGrowthRate }}%</span>
                <i
                  v-if="salesNumInfo.yearGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesNumInfo.yearGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
              <div v-if="salesNumInfo.monthGrowthRate">
                环比：<span class="ringRatio">{{ salesNumInfo.monthGrowthRate }}%</span>
                <i
                  v-if="salesNumInfo.monthGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesNumInfo.monthGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
            </div>
          </div></div
      ></van-swipe-item>
      <van-swipe-item>
        <div class="swipeItem">
          <div class="card-panel">
            <div class="indexRow">
              <img class="indexMg" src="@/assets/images/year3.png" />
              <div class="headTitle">
                <span>老患者销量</span>
              </div>
              <div class="tabSta">
                <div @click="handleClick3(0)" :class="activeName3 == 0 ? 'active' : ''">全部</div>
                <div @click="handleClick3(160)" :class="activeName3 == 160 ? 'active' : ''">规格一</div>
                <div @click="handleClick3(357)" :class="activeName3 == 357 ? 'active' : ''">规格二</div>
              </div>
            </div>
            <div class="salesBox" style="color: rgba(0, 186, 173, 1);">
              {{ dotInfo.currSalePrice }}
            </div>
            <div class="ratioRow">
              <div v-if="dotInfo.yearGrowthRate">
                同比：<span class="yearOnYear">{{ dotInfo.yearGrowthRate }}%</span>
                <i
                  v-if="dotInfo.yearGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="dotInfo.yearGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
              <div v-if="dotInfo.monthGrowthRate">
                环比：<span class="ringRatio">{{ dotInfo.monthGrowthRate }}%</span>
                <i
                  v-if="dotInfo.monthGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="dotInfo.monthGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
            </div>
          </div></div
      ></van-swipe-item>
      <van-swipe-item>
        <div class="swipeItem">
          <div class="card-panel">
            <div class="indexRow">
              <img class="indexMg" src="@/assets/images/year4.png" />
              <div class="headTitle">
                <span>新患者销量</span>
              </div>
              <div class="tabSta">
                <div @click="handleClick4(0)" :class="activeName4 == 0 ? 'active' : ''">全部</div>
                <div @click="handleClick4(160)" :class="activeName4 == 160 ? 'active' : ''">规格一</div>
                <div @click="handleClick4(357)" :class="activeName4 == 357 ? 'active' : ''">规格二</div>
              </div>
            </div>
            <div class="salesBox" style="color: rgba(240, 96, 96, 1);">
              {{ salesInfo.currSalePrice }}
            </div>
            <div class="ratioRow">
              <div v-if="salesInfo.yearGrowthRate">
                同比：<span class="yearOnYear">{{ salesInfo.yearGrowthRate }}%</span>
                <i
                  v-if="salesInfo.yearGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesInfo.yearGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
              <div v-if="salesInfo.monthGrowthRate">
                环比：<span class="ringRatio">{{ salesInfo.monthGrowthRate }}%</span>
                <i
                  v-if="salesInfo.monthGrowthRate < 0"
                  style="color: rgba(160, 250, 197, 1)"
                  class="el-icon-caret-bottom"
                />
                <i v-if="salesInfo.monthGrowthRate > 0" style="color: red" class="el-icon-caret-top" />
              </div>
            </div>
          </div></div
      ></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { Swipe, SwipeItem } from 'vant'
export default {
  name: 'PanelGroup',
  props: {
    dotInfo: {
      type: Object
    },
    salesPriceInfo: {
      type: Object
    },
    salesNumInfo: {
      type: Object
    },
    salesInfo: {
      type: Object
    }
  },
  data() {
    return {
      activeName1: '',
      activeName2: '',
      activeName3: '',
      activeName4: ''
    }
  },
  methods: {
    handleClick1(event) {
      this.activeName1 = event
      if (event == 0) {
        this.$emit('handleClick1', '')
      } else {
        this.$emit('handleClick1', event)
      }
    },
    handleClick2(event) {
      this.activeName2 = event
      if (event == 0) {
        this.$emit('handleClick1', '')
      } else {
        this.$emit('handleClick1', event)
      }
    },
    handleClick3(event) {
      this.activeName3 = event
      if (event == 0) {
        this.$emit('handleClick1', '')
      } else {
        this.$emit('handleClick1', event)
      }
    },
    handleClick4(event) {
      this.activeName4 = event
      if (event == 0) {
        this.$emit('handleClick1', '')
      } else {
        this.$emit('handleClick1', event)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.swipeBox {
  margin-top: 12px;
  height: 155px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  .swipeItem {
    width: 100%;
    height: 100%;
  }
}
.indexRow {
  position: relative;
  display: flex;
  width: 347px;
  line-height: 42px;
  font-size: 15px;
  border-bottom: 1px solid rgba(216, 220, 229, 1);
  border-bottom: 1px solid rgba(216, 220, 229, 1);

  .indexMg {
    height: 25px;
    margin-right: 10px;
    position: relative;
    top: 11px;
    left: 11px;
  }
  .headTitle {
    margin-left: 10px;
    color: #000;
  }
  .tabSta {
    width: 180px;
    margin-top: 15px;
    display: flex;
    position: absolute;
    top: -3px;
    right: 11px;
    div {
      border-radius: 30px;
      padding: 0 10px;
      background: #f0f1f5;
      height: 21px;
      line-height: 20px;
      left: 235px;
      font-size: 12px;
      margin-right: 8px;
      color: rgba(53, 64, 82, 1);
      text-align: center;
    }
    .active {
      background: #389afc;
      color: rgba(255, 255, 255, 1);
      text-align: center;
      vertical-align: top;
    }
  }
}
.salesBox {
  font-size: 24px;
  font-weight: 700;
  color: rgba(255, 141, 26, 1);
  padding: 15px 16px;
}
.ratioRow {
  display: flex;
  justify-content: space-between;
  padding: 0 13px;
  color: rgba(166, 166, 166, 1);
  font-size: 14px;
  .yearOnYear,
  .ringRatio {
    font-style: 16px;
    margin: 0 8px;
    color: rgba(89, 89, 89, 1);
  }
}

.card-panel {
  cursor: pointer;
  font-size: 12px;
  height: 100%;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);

  &:hover {
    .card-panel-icon-wrapper {
      color: #fff;
    }

    .icon-people {
      background: #40c9c6;
    }

    .icon-message {
      background: #36a3f7;
    }

    .icon-money {
      background: #f4516c;
    }

    .icon-shopping {
      background: #34bfa3;
    }
  }

  .icon-people {
    color: #40c9c6;
  }

  .icon-message {
    color: #36a3f7;
  }

  .icon-money {
    color: #f4516c;
  }

  .icon-shopping {
    color: #34bfa3;
  }

  .card-panel-icon-wrapper {
    float: left;
    margin: 14px 0 0 14px;
    padding: 16px;
    transition: all 0.38s ease-out;
    border-radius: 6px;
  }

  .card-panel-icon {
    float: left;
    font-size: 48px;
  }

  .card-panel-description {
    font-weight: bold;
    margin: 10px 13px;
    color: rgba(255, 141, 26, 1);

    .card-panel-text {
      line-height: 18px;
      color: rgba(0, 0, 0, 0.45);
      font-size: 17px;
      margin-bottom: 12px;
    }

    .card-panel-num {
      font-size: 20px;
    }
  }
}
@media (max-width: 550px) {
  .card-panel-description {
    display: none;
  }

  .card-panel-icon-wrapper {
    float: none !important;
    width: 100%;
    height: 100%;
    margin: 0 !important;

    .svg-icon {
      display: block;
      margin: 14px auto !important;
      float: none !important;
    }
  }
}
</style>
<style lang="scss">
.box {
  width: 400px;

  .top {
    text-align: center;
  }

  .left {
    float: left;
    width: 60px;
  }

  .right {
    float: right;
    width: 60px;
  }

  .bottom {
    clear: both;
    text-align: center;
  }

  .item {
    margin: 4px;
  }
}
</style>

