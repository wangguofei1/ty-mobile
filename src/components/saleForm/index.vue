<template>
  <div class="formBox">
    <van-form>
      <div class="content3">
        <div @click="isYearShow = isYearShow ? false : true">
          <van-row type="flex" justify="center">
            <van-col :span="22">
              <div class="flex1 content2">
                <div>年份</div>
                <div>
                    <span v-if="!ruleForm.year" style="color:#ccc">请选择年</span>
                  <span v-if="ruleForm.year" style="color: #000">{{ ruleForm.year }}年</span>
                  <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                </div>
              </div>
              <!-- <van-field v-model="ruleForm.year" is-link readonly label="地区" placeholder="请选择所在地区"
                                @click="show = true" /> -->
                        </van-col>
                    </van-row>
                </div>
                <div @click="isMonthShow=isMonthShow?false:true">
                    <van-row type="flex" justify="center">
                        <van-col :span="22">
                            <div class="flex1 content2">
                                <div>时间区间</div>
                                <div>
                                    <span v-if="ruleForm.startMonth" style="color:#000">{{ruleForm.startMonth}}月~{{ruleForm.endMonth}}月</span>
                                    <span v-if="!ruleForm.startMonth"  style="color:#ccc">请选择时间区间</span>
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
                                    <span style="color:#ccc">请选择商品</span>
                                    <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <div @click="show=show?false:true">
                    <van-row type="flex" justify="center">
                        <van-col :span="22">
                            <div class="flex1 content2">
                                <div>区域</div>
                                <div>
                                    <span></span>
                                    <span v-if="regionName" style="color:#000">{{regionName}},{{sectionName}},{{provinceName}}</span>
                                    <span v-if="!regionName" style="color:#ccc">请选择大区、片区、省区</span>
                                    <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <div @click="isShopShow =isShopShow ?false:true">
                    <van-row type="flex" justify="center">
                        <van-col :span="22">
                            <div class="flex1 content2">
                                <div>门店</div>
                                <div>
                                    <span style="color:#000" v-if="shopName">{{shopName}}</span>
                                    <span style="color:#ccc" v-if="!shopName">请选择门店</span>
                                    <van-icon color="rgba(128, 128, 128, 1)" size="14px" name="arrow" />
                                </div>
                            </div>
                        </van-col>
                    </van-row>
                </div>
                <div>
                    <van-row type="flex" justify="space-around">
                        <van-col :span="8">
                            <van-button type="default"  @click="resetForm" block>重置</van-button>
                        </van-col>
                        <van-col :span="8">
                            <van-button type="info" @click="submitForm" block>确认</van-button>
                        </van-col>
                    </van-row>
                </div>
            </div>
        </van-form>
        <div class="content4">
            <div>
                <van-popup v-model="isYearShow" round position="bottom">
                    <van-datetime-picker v-model="year" type="year-month" title="选择年份" 
                        :formatter="formatter" @confirm="confirmTime"   @cancel="isYearShow=false"/>
                </van-popup>
            </div>
            <div>
                <van-popup v-model="isMonthShow" round position="bottom" >
                    <van-datetime-picker v-model="startMonth" type="month-day" title="开始月份"
                        :formatter="formatter" @confirm="confirmTime1"  @cancel="isMonthShow=false" />
                </van-popup>
            </div>
            <div>
                <van-popup v-model="isMonthShow2" round position="bottom">
                    <van-datetime-picker v-model="endMonth" type="month-day" title="截止月份" :filter="filter2" 
                        :formatter="formatter" @confirm="confirmTime2"  @cancel="isMonthShow2=false"/>
                </van-popup>
            </div>
            <div>
                <van-popup v-model="show" round position="bottom" >
                    <van-cascader v-model="cascaderValue" title="请选择所在地区" :options="options" :field-names="fieldNames"
                        @finish="finfishSelect"  @close="show=false"/>
                </van-popup>
            </div>
            <div>
                <van-popup v-model="isShopShow" round position="bottom">
                    <van-picker title="选择门店" show-toolbar :columns="columns" @confirm="confirmShop"  @cancel="isShopShow=false"/>
                </van-popup>
            </div>
        </div>
    </div>
</template>

<script>
import { queryTree, queryShop } from "../../api/sales"
export default {
    name: "saleForm",
    data() {
        return {
            year:'',
            startMonth:'',
            endMonth:'',
            show: false,
            isYearShow: false,
            isMonthShow: false,
            isMonthShow2: false,
            isShopShow: false,
            cascaderValue: '',
            options: [],
            fieldNames: {
                text: 'name',
                value: 'id',
            },
            columns: [],
            shopList: [],
            regionName:"",
            sectionName:"",
            provinceName:"",
            shopName:"",
        };
    },
    props: {
        ruleForm: {
            type: Object
        },
        utilsShow: {
            default: ''
        }
    },
    methods: {
        resetForm(){
            this.cascaderValue='';
            this.regionName="";
            this.sectionName="";
            this.provinceName="";
            this.shopName="";
            this.ruleForm.year='';
            this.ruleForm.startMonth='';
            this.ruleForm.endMonth='';
        },
        submitForm() {
            let form = JSON.parse(JSON.stringify(this.ruleForm));
            this.$emit("changeForm", form)
        },
        confirmShop(item, index) {
            this.ruleForm.shopId = this.shopList[index].id;
            this.shopName=item;
            this.isShopShow=false;
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
            this.ruleForm.regionId = selectedOptions[0].id;
            this.ruleForm.sectionId = selectedOptions[1].id;
            this.ruleForm.provinceId = selectedOptions[2].id;
            this.regionName=selectedOptions[0].name;
            this.sectionName=selectedOptions[1].name;
            this.provinceName=selectedOptions[2].name;
            queryShop({ regionId: this.ruleForm.regionId, page: 1, pageSize: 100, sectionId: this.ruleForm.sectionId, provinceId: this.ruleForm.provinceId}).then((res) => {
                if (res.code == 0) {
                    this.shopList = res.data.data;
                    this.columns = res.data.data.map(item => item.name);
                    this.show=false;
                }
            })

        },
        confirmTime2(value) {
            let date = new Date(value);
            this.ruleForm.endMonth = date.getMonth() + 1;
            this.isMonthShow2 = false;
        },
        confirmTime1(value) {
            let date = new Date(value);
            this.ruleForm.startMonth = date.getMonth() + 1;
            this.isMonthShow = false;
            this.isMonthShow2 = true;
        },
        confirmTime(value) {
            let date = new Date(value);
            this.ruleForm.year = date.getFullYear();
            this.isYearShow = false;
        },
        filter2(type, options) {
            if (type === 'month') {
                return options.filter((option) => option > this.ruleForm.startMonth);
            }
            if (type === 'day') {
                return options;
            }
        },
        formatter(type, val) {
            if (type === 'year') {
                return val + '年';
            }
            if (type === 'month') {
                return val + '月';
            }
            if (type === 'day') {
                return val + '日';
            }
            return val;
        },
    },
    mounted() {
        queryTree().then((res) => {
            this.deletechildren(res.data[0].children);
            this.options = res.data[0].children;
        });
    }
}
</script>

<style lang="scss" scoped>
    .formBox {
        overflow: hidden;
        padding-top: 10px;
        position: fixed;
        width: 100%;
        z-index: 999999;
        background-color: #fff;
    }
.flex1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.content3 {
    >div {
        margin-bottom: 0.333rem;
        line-height: 0.933rem;

        .content2 {
            background-color: #f2f3f5;
            padding-left: 0.223rem;

            >div:nth-child(1) {
                font-size: 14px;
                font-weight: 500;
                color: rgba(128, 128, 128, 1);
            }

            >div:nth-child(2) {
                >span:nth-child(1) {
                    font-size: 13px;
                    font-weight: 700;
                    color: rgba(25, 28, 47, 1);
                }

                >span:nth-child(2) {
                    font-size: 14px;
                    font-weight: 500;
                    color: rgba(128, 128, 128, 1);

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