<template>
    <div>
        <div class="flex1 title1" style="background:#2b92f9">
            <div style="width:50%">
                <van-tabs v-model="ruleForm.queryType" background="#2b92f9" color="#fff" title-inactive-color="#fff"
                    title-active-color="#fff">
                    <van-tab title="本年" name="1"></van-tab>
                    <van-tab title="本季度" name="2"></van-tab>
                    <van-tab title="本月" name="3"></van-tab>
                </van-tabs>
            </div>
            <div class="flex1 content1" @click="isShow=isShow?false:true">
                <span style="color:#fff">筛选</span>
                <span v-show="!isShow" style="margin-left:10px"><img
                        src="../../assets/images/saleImages/三角形 1@3x.png" /></span>
                <span v-show="isShow" style="margin-left:10px"><img
                        src="../../assets/images/saleImages/三角形 2@3x.png" /></span>
            </div>
        </div>
        <saleForm v-show="isShow" :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
        <div class="headBox">
            <panel-group :dotInfo="dotInfo" :salesNumInfo="salesNumInfo" :salesPriceInfo="salesPriceInfo"
            :salesInfo="salesInfo" @handleClick1="queryTop" />
        </div>
        <div class="chartBox">
            <div class="barChart">
                <div class="indexRow flex1" style="justify-content:space-between">
                    <div class="flex1">
                        <img class="indexMg" src="@/assets/images/xsImg.png" />
                        <div class="headTitle">销售统计</div>
                    </div>
                    <div>
                        <van-tabs type="card" color="#afafaf" background="#f0f1f5" v-model="tabIndex5"  @change="changeTab">
                            <van-tab title="数量" name="1"></van-tab>
                            <van-tab title="金额" name="2"></van-tab>
                        </van-tabs>
                    </div>
                </div>
                <div style="padding: 5px">
                    <bar-chart v-if="medicine1Data.length > 0||medicine3Data.length > 0" :medicine1Data="tabIndex5=='1'?medicine1Data:medicine3Data"
                        :medicine2Data="tabIndex5=='1'?medicine2Data:medicine4Data" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import saleForm from "../../components/saleForm/index.vue"
import PanelGroup from "./components/PanelGroup.vue"
import { submitTop } from "../../api/sales"
import barChart from "./components/BarChart.vue"
import {
    queryMonthSalesPrice,
} from '@/api/home'
export default {
    name: "",
    components: { saleForm, PanelGroup, barChart },
    data() {
        return {
            ruleForm: {
                queryType: '1',
                year: '',
                startMonth: '',
                endMonth: '',
                productId: 127,
                regionId: '',
                sectionId: '',
                provinceId: '',
                shopId: '',
            },
            isShow: false,
            dotInfo: {
            },
            salesPriceInfo: {
            },
            salesNumInfo: {
            },
            salesInfo: {
            },
            medicine1Data: [],
            medicine2Data: [],
            medicine3Data: [],
            medicine4Data: [],
            tabIndex5: '',
        }
    },
    methods: {
        changeTab(){
            this.queryMonthSalesPrice();
        },
        changeForm(form) {
            console.log(form);
        },
        async queryTop(id) {
            let res = await submitTop({ queryType: this.ruleForm.queryType * 1, medicineId: id });
            if (res.code == 0) {
                this.salesInfo = res.data.customerSalesPrice[0];
                this.salesNumInfo = res.data.salesNum[0];
                this.salesPriceInfo = res.data.salesPrice[0];
                this.dotInfo = res.data.oldCustomerSalesPrice[0];
            }
        },
        queryMonthSalesPrice() {
            queryMonthSalesPrice({
                queryType: this.ruleForm.queryType,
                type: this.tabIndex5
            }).then((res) => {
                if (res.code == 0) {
                    console.log(res);
                    let arr1 = [];
                    let arr2 = [];
                    if (res.data.monthSalesNum160) {
                        res.data.monthSalesNum160.forEach((item) => {
                            arr1.push(item.salesNum);
                        });
                        res.data.monthSalesNum357.forEach((item) => {
                            arr2.push(item.salesNum);
                        });
                        this.medicine1Data = arr1;
                        this.medicine2Data = arr2;
                    } else {
                        res.data.monthSalesPrice160.forEach((item) => {
                            arr1.push(item.salesPrice);
                        });
                        res.data.monthSalesPrice357.forEach((item) => {
                            arr2.push(item.salesPrice);
                        });
                        this.medicine3Data = arr1;
                        this.medicine4Data = arr2;
                    }
                }
            });
        },
    },
    mounted() {
        this.queryTop('');
        this.queryMonthSalesPrice();
    }
}
</script>

<style lang="scss" scoped>
.flex1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
}
.headBox {
  width: 100%;
  box-sizing: border-box;
  padding: 0 15px;
}
.title1 {
    height: 0.733rem;
    margin-bottom: 0.233rem;

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
}

.chartBox {
    width: 100%;
    box-sizing: border-box;
    margin-top: 10px;
    .barChart {
        margin: 0 15px;
        box-sizing: border-box;
        background: rgba(255, 255, 255, 1);
        height: 268px;
        width: calc(100%-30px);
        border-radius: 8px;
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
            top: 7px;
            left: 11px;
        }

        .headTitle {
            margin-left: 10px;
            color: #000;
        }

        .showAll {
            color: rgba(24, 144, 255, 1);
            margin-left: auto;
            margin-right: 20px;
        }
    }
}
</style>
<style lang="scss">
.title1 {
    .van-tabs--line {
        .van-tabs__wrap {
            height: 0.733rem !important;
        }
    }
}

.indexRow {
    .van-tabs__nav--card .van-tab.van-tab--active {
        color: #3aa0ff;
        background-color: #fff !important;
        border-color: #fff !important;
    }
    .van-tabs__nav--card {
        margin: 0.2rem 0.3rem 0 0;
        height: 0.6rem;
    }
}
</style>