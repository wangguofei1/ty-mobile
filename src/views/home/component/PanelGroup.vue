<template>
  <van-row :gutter="40" class="panel-group">
    <van-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/year1.png" />
          <div>
            <span>本年销售额 </span>
            <van-tooltip
              class="item"
              effect="dark"
              content="时间范围内的销售额"
              placement="top-start"
            >
              <i class="el-icon-warning" />
            </van-tooltip>
          </div>
          <div class="tabSta">
            <van-tabs v-model="activeName1" @tab-click="handleClick1">
              <van-tab-pane label="全部" name="" />
              <van-tab-pane label="规格一" name="160" />
              <van-tab-pane label="规格二" name="357" />
            </van-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="salesPriceInfo.currSalePrice"
            :duration="2600"
            class="card-panel-num"
            style="color: rgba(255, 141, 26, 1);"
          />
        </div>
        <div class="ratioRow">
          <div v-if="salesPriceInfo.yearGrowthRate">
            同比：<span class="yearOnYear">{{ salesPriceInfo.yearGrowthRate }}%</span>
            <i
              v-if=" salesPriceInfo.yearGrowthRate < 0 "
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if=" salesPriceInfo.yearGrowthRate > 0 "
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
          <div v-if="salesPriceInfo.monthGrowthRate">
            环比：<span class="ringRatio">{{ salesPriceInfo.monthGrowthRate }}%</span>
            <i
              v-if="salesPriceInfo.monthGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="salesPriceInfo.monthGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
        </div>
      </div>
    </van-col>
    <van-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/year2.png" />
          <div>
            <span>本年销量 </span>
            <van-tooltip
              class="item"
              effect="dark"
              content="时间范围内的销售数量"
              placement="top-start"
            >
              <i class="el-icon-warning" />
            </van-tooltip>
          </div>
          <div class="tabSta">
            <van-tabs v-model="activeName2" @tab-click="handleClick2">
              <van-tab-pane label="全部" name="" />
              <van-tab-pane label="规格一" name="160" />
              <van-tab-pane label="规格二" name="third357" />
            </van-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="salesNumInfo.ringSaleNum"
            :duration="2600"
            class="card-panel-num"
            style="color: rgba(42, 130, 228, 1);"
          />
        </div>
        <div class="ratioRow">
          <div v-if="salesNumInfo.yearGrowthRate">
            同比：<span class="yearOnYear">{{ salesNumInfo.yearGrowthRate }}</span>
            <i
              v-if="salesNumInfo.yearGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="salesNumInfo.yearGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
          <div v-if="salesNumInfo.monthGrowthRate">
            环比：<span class="ringRatio">{{ salesNumInfo.monthGrowthRate }}%</span>
            <i
              v-if="salesNumInfo.monthGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="salesNumInfo.monthGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
        </div>
      </div>
    </van-col>
    <van-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/year3.png" />
          <div>
            <span>年度DOT </span>
            <van-tooltip
              class="item"
              effect="dark"
              content="时间范围内的DOT"
              placement="top-start"
            >
              <i class="el-icon-warning" />
            </van-tooltip>
          </div>
          <div class="tabSta">
            <van-tabs v-model="activeName3" @tab-click="handleClick3">
              <van-tab-pane label="全部" name="" />
              <van-tab-pane label="规格一" name="160" />
              <van-tab-pane label="规格二" name="357" />
            </van-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="dotInfo.currDotRate"
            :duration="2600"
            class="card-panel-num"
            style="color: rgba(0, 186, 173, 1);"
          />
        </div>
        <div class="ratioRow">
          <div v-if="dotInfo.yearGrowthRate">
            同比：<span class="yearOnYear">{{ dotInfo.yearGrowthRate }}%</span>
            <i
              v-if=" dotInfo.yearGrowthRate < 0 "
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if=" dotInfo.yearGrowthRate > 0 "
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
          <div v-if="dotInfo.monthGrowthRate">
            环比：<span class="ringRatio">{{ dotInfo.monthGrowthRate }}%</span>
            <i
              v-if="dotInfo.monthGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="dotInfo.monthGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
        </div>
      </div>
    </van-col>
    <van-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
      <div class="card-panel">
        <div class="indexRow">
          <img class="indexMg" src="@/assets/images/year4.png" />
          <div>
            <span>本年患者数 </span>
            <van-tooltip
              class="item"
              effect="dark"
              content="时间范围内的患者数"
              placement="top-start"
            >
              <i class="el-icon-warning" />
            </van-tooltip>
          </div>
          <div class="tabSta">
            <van-tabs v-model="activeName4" @tab-click="handleClick4">
              <van-tab-pane label="全部" name="" />
              <van-tab-pane label="规格一" name="160" />
              <van-tab-pane label="规格二" name="357" />
            </van-tabs>
          </div>
        </div>
        <div class="card-panel-description">
          <count-to
            :start-val="0"
            :end-val="salesInfo.currCustomerNum"
            :duration="2600"
            class="card-panel-num"
            style="color: rgba(240, 96, 96, 1);"
          />
        </div>
        <div class="ratioRow">
          <div v-if="salesInfo.yearGrowthRate">
            同比：<span class="yearOnYear">{{ salesInfo.yearGrowthRate }}</span>
            <i
              v-if="salesInfo.yearGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="salesInfo.yearGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
          <div v-if="salesInfo.monthGrowthRate">
            环比：<span class="ringRatio">{{ salesInfo.monthGrowthRate }}</span>
            <i
              v-if="salesInfo.monthGrowthRate < 0"
              style="color: rgba(160, 250, 197, 1)"
              class="el-icon-caret-bottom"
            />
            <i
              v-if="salesInfo.monthGrowthRate > 0"
              style="color: red"
              class="el-icon-caret-top"
            />
          </div>
        </div>
      </div>
    </van-col>
  </van-row>
</template>

<script>

export default {
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
      activeName1: "",
      activeName2: "",
      activeName3: "",
      activeName4: "",
    };
  },
  methods: {
    handleClick1(tab, event) {
      if (this.activeName1 == 0) {
        this.$emit('handleClick1', "")
      } else {
        this.$emit('handleClick1', this.activeName1)
      }
    },
    handleClick2(tab, event) {
      if (this.activeName2 == 0) {
        this.$emit('handleClick2', "")
      } else {
        this.$emit('handleClick2', this.activeName2)
      }
    },
    handleClick3(tab, event) {
      if (this.activeName3 == 0) {
        this.$emit('handleClick3', "")
      } else {
        this.$emit('handleClick3', this.activeName3)
      }
    },
    handleClick4(tab, event) {
      if (this.activeName4 == 0) {
        this.$emit('handleClick4', "")
      } else {
        this.$emit('handleClick4', this.activeName4)
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.panel-group {
  margin-top: 18px;
  .indexMg {
    height: 25px;
    margin-right: 10px;
    position: relative;
    top: -1px;
  }
  .indexRow {
    display: flex;
    padding: 10px 10px 0px 10px;
    line-height: 20px;
    font-size: 15px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
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
  .el-icon-warning {
    font-size: 14px;
    margin-left: 5px;
  }
  .el-icon-warning:hover {
    color: #36a3f7;
  }

  .card-panel {
    height: 108px;
    cursor: pointer;
    font-size: 12px;
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
.tabSta {
  position: absolute;
  right: 5px;
  top: -4px;
  .el-tabs__item {
    padding: 0 10px;
    font-size: 12px;
  }
  .el-tabs__nav-wrap.is-scrollable {
    padding: 0 2px;
  }
}
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

  .left .el-tooltip__popper,
  .right .el-tooltip__popper {
    padding: 8px 10px;
  }
}
</style>

