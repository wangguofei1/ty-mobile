<template>
    <div>
        <topNav :ruleForm="ruleForm"  @changeForm="changeForm" @changeTab="changeTab1"></topNav>
        <div class="headBox">
            <panel-group :dotInfo="dotInfo" :salesNumInfo="salesNumInfo" :salesPriceInfo="salesPriceInfo"
                :salesInfo="salesInfo" @handleClick1="queryTop1" />
        </div>
        <div class="chartBox">
            <div class="barChart">
                <div class="indexRow flex1" style="justify-content:space-between">
                    <div class="flex1">
                        <img class="indexMg" src="@/assets/images/xsImg.png" />
                        <div class="headTitle">销售统计</div>
                    </div>
                    <div>
                        <!-- <van-tabs type="card" color="#afafaf" background="#f0f1f5" v-model="tabIndex5"
                            @change="changeTab">
                            <van-tab title="数量" name="1"></van-tab>
                            <van-tab title="金额" name="2"></van-tab>
                        </van-tabs> -->
                        <div class="tab1">
                            <div  :class="tabIndex5==2?'active':''" @click="changeTab(2)">数量</div>
                            <div :class="tabIndex5==1?'active':''" @click="changeTab(1)">金额</div>
                        </div>
                    </div>
                </div>
                <div style="padding: 5px">
                    <bar-chart :tabIndex="tabIndex5" v-if="medicine1Data.length > 0||medicine3Data.length > 0"
                        :medicine1Data="tabIndex5=='2'?medicine1Data:medicine3Data"
                        :medicine2Data="tabIndex5=='2'?medicine2Data:medicine4Data" />
                </div>
            </div>
        </div>
        <div class="headBox" style="margin-top:10px">
            <div style="background-color:#fff;border-radius: 8px;">
                <div style="padding-top:10px">
                    <h2 style="text-align:center">各区域销售占比</h2>
                </div>
                <div>
                    <van-tabs v-model="chartsType" color="#389afc" title-inactive-color="#000"
                        title-active-color="#389afc">
                        <van-tab title="大区" name="2"></van-tab>
                        <van-tab title="片区" name="3"></van-tab>
                        <van-tab title="省区" name="1"></van-tab>
                    </van-tabs>
                </div>
                <div>
                    <par-charts :chartsType="chartsType" :chartsData1="chartsData1" :chartsData2="chartsData2"
                        :chartsData3="chartsData3"></par-charts>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import saleForm from "../../components/saleForm/index.vue"
import topNav from "../../components/topNav.vue"
import PanelGroup from "./components/PanelGroup.vue"
import { submitTop, queryProvinceSalePriceRate, queryRegionSale, querySectionSale } from "../../api/sales"
import barChart from "./components/BarChart.vue"
import parCharts from "./components/parCharts.vue"
import {
    queryMonthSalesPrice,
} from '@/api/home'
export default {
    name: "",
    components: { saleForm, PanelGroup, barChart, parCharts,topNav },
    data() {
        return {
            queryType: '1',
            ruleForm: {
                year: '',
                startMonth: '',
                endMonth: '',
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
            tabIndex5: '1',
            chartsType: '2',
            chartsData1: [],
            chartsData2: [],
            chartsData3: [],
            index1: "",
        }
    },
    methods: {
        changeTab1(type) {
            this.queryType=type;
            this.queryProvinceSalePrice({queryType:this.queryType});
            this.query1({queryType:this.queryType});
            this.query2({queryType:this.queryType});
            this.queryTop(this.index1);
            this.queryMonthSalesPrice({
                queryType:this.queryType,
                type: this.tabIndex5
            });
        },
        changeTab(lab) {
            this.tabIndex5=lab;
            this.queryMonthSalesPrice({
                queryType:this.queryType,
                type: this.tabIndex5
            });
        },
        changeForm(form) {
            this.queryProvinceSalePrice(form);
            this.query1(form);
            this.query2(form);
            this.queryTop(form);
            this.queryMonthSalesPrice({
                ...form,
                type: this.tabIndex5
            });
        },
        queryTop1(id) {
            this.queryTop(id);
        },
        async queryTop(id) {
            let data=null;
            if(id instanceof Object==true){
                data={ ...id, medicineId: this.index1 };
            }else{
                data={ queryType:this.queryType, medicineId: id }
                this.index1 = id;
            }
            let res = await submitTop(data);
            if (res.code == 0) {
                this.salesInfo = res.data.customerSalesNum[0];
                this.salesNumInfo = res.data.salesNum[0];
                this.salesPriceInfo = res.data.salesPrice[0];
                this.dotInfo = res.data.oldCustomerSalesNum[0];
            }
        },
        queryMonthSalesPrice(data) {
            queryMonthSalesPrice(data).then((res) => {
                if (res.code == 0) {
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
        async queryProvinceSalePrice(query) {
            let res = await queryProvinceSalePriceRate(query);
            if (res.code == 0) {
                this.chartsData1 = res.data.provinceSalePriceRate.map((item, index) => {
                    return { name: item.provinceName, value: item.salesPrice, rate: item.salePriceRate }
                });
            }
        },
        async query1(data) {
            let res = await queryRegionSale(data);
            this.chartsData2 = res.data.provinceSalePriceRate.map((item, index) => {
                return { name: item.regionMame, value: item.salesPrice, rate: item.salePriceRate }
            });
        },
        async query2(data) {
            let res = await querySectionSale(data);

            this.chartsData3 = res.data.provinceSalePriceRate.map((item, index) => {
                return { name: item.sectionName, value: item.salesPrice, rate: item.salePriceRate }
            });
        },
    },
    mounted() {
        this.queryTop('');
        this.queryMonthSalesPrice({queryType:this.queryType,type:this.tabIndex5});
        this.queryProvinceSalePrice({
            queryType: this.queryType ,
        });
        this.query1({
            queryType: this.queryType,
        });
        this.query2({
            queryType: this.queryType,
        })
    },
    watch: {
        'ruleForm.queryType': function (value) {
            this.queryProvinceSalePrice({
                queryType: value * 1,
            });
            this.query1({
                queryType: value * 1,
            });
            this.query2({
                queryType: value * 1,
            })
        }
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
.tab1{
    margin:7px 10px  0 0;
    background-color: #f0f1f5;
    color: #a6a6a6;
    width: 78px;
    height: 26px;
    // font-size: 12px;
    border-radius: 4px;
    display: flex;
    >div{
        margin-left:3px ;
        margin-top: 3px;
        font-size:12px;
        line-height: 20px;
        text-align: center;
        width: 36px;
        height: 20px;
        // padding:-2px  0  0px 5px;
    }
    .active{
        background-color: #fff;
        border-radius: 3px;
        color: #2a82e4;
    }
}
</style>
<style lang="scss">
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