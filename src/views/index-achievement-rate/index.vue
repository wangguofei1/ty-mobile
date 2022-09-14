<template>
    <div>
        <div class="flex1 title1" style="background:#2b92f9;z-index:2005;">
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
        <div class="popup1">
            <van-popup v-model="isShow" round position="top" :duration="0.5" transition="fade">
                <saleForm :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
            </van-popup>
        </div>
        <div class="headBox">
            <div class="inBox">
                <div style="width:50%;margin:0 0 0 20px;">
                    <van-tabs v-model="ruleForm.queryType" background="#3597f8" color="#fff"
                        title-inactive-color="#c4e1fd" title-active-color="#fff">
                        <van-tab title="MDT" name="1"></van-tab>
                        <van-tab title="QDT" name="2"></van-tab>
                        <van-tab title="YDT" name="3"></van-tab>
                    </van-tabs>
                </div>
                <div class="input2 flex1" style="margin:5px 15px 0 15px">
                    <div>时间:3月</div>
                    <div><img src="../../assets/images/saleImages/分组 1.png" /></div>
                </div>
                <div class="bigBox">
                    <div>
                        <span>目标(万元)</span>
                        <div>12,454,45</div>
                    </div>
                    <div>
                        <span> 实际(万元)</span>
                        <div>32,894,88</div>
                    </div>
                    <div >
                        <span>达成率 A/T</span>
                        <div class="text1">82%</div>
                    </div>
                    <div >
                        <span>同比 GR</span>
                        <div class="text1">100%</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chartBox">
            <div class="barChart">
                <div class="indexRow flex1" style="justify-content:space-between">
                    <div class="flex1">
                        <img class="indexMg" src="@/assets/images/xsImg.png" />
                        <div class="headTitle">销售统计</div>
                    </div>
                </div>
                <div style="padding: 5px">
                    <bar-chart v-if="medicine1Data.length > 0" :medicine1Data="medicine1Data" :medicine2Data="medicine2Data" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import saleForm from "../../components/saleForm/index.vue"
import barChart from "./components/BarChart.vue"
export default {
    name: "",
    components: { saleForm,barChart },
    data() {
        return {
            ruleForm: {
                queryType: '1',
                year: '',
                startMonth: '',
                endMonth: '',
                regionId: '',
                sectionId: '',
                provinceId: '',
                shopId: '',
            },
            isShow: false,
            medicine1Data: [6, 5, 8, 6, 7, 9, 8, 5, 4, 3, 2, 1],
            medicine2Data: [10, 9, 8, 7, 5, 4, 3, 4, 5, 5, 6, 7],
            tabIndex5: '',
            chartsType: '1',
        }
    },
    methods: {
        changeTab() {
            this.queryMonthSalesPrice();
        },
        changeForm(form) {
            this.queryProvinceSalePrice(form);
            this.query1(form);
            this.query2(form);
        },
    },
    mounted() {
    },
    watch: {
        'ruleForm.queryType': function (value) {
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

    .inBox {
        margin-top: 10px;
        width: 343px;
        height: 283px;
        background: url("../../assets/images/saleImages/蒙版分组.png") no-repeat;
        background-size: cover;
    }
}

.title1 {
    height: 0.733rem;

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

.inBox {
    .van-tabs__line {
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 9px 9px 9px 9px;
        border-color: #2b92f9 #2b92f9 #fff #2b92f9;
    }

    .input2 {
        box-sizing: border-box;
        background-color: #fff;
        width: 314px;
        height: 33px;
        border-radius: 4px;
        justify-content: space-between;
        padding: 8px 10px 0px 10px;

        >div:nth-child(1) {
            font-weight: 500;
            color: rgba(166, 166, 166, 1);
        }

    }

    .bigBox {
        margin: 10px 15px 0 15px;
        width: 314px;
        height: 166px;
        opacity: 1;
        border-radius: 4px;
        background: rgba(255, 255, 255, 1);
        display: flex;
        flex-flow: row wrap;

        >div {
            box-sizing: border-box;
            width: 50%;
            height: 83px;
            border: 0.5px solid #E9E9E9FF;
            padding: 21px 0 0 27px;

            span {
                font-size: 16px;
                font-weight: 400;
                letter-spacing: 0px;
                line-height: 14px;
                color: rgba(144, 147, 153, 1);
                text-align: left;
                vertical-align: top;
            }

            >div {
                margin-top: 20px;
                font-size: 18px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 0px;
                color: rgba(56, 154, 252, 1);
                text-align: left;
                vertical-align: top;
            }

            .text1 {
                font-size: 18px;
                font-weight: 500;
                letter-spacing: 0px;
                line-height: 0px;
                color: rgba(255, 87, 51, 1);
                text-align: left;
                vertical-align: top;
            }
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

// .fade-enter, .fade-leave-to{
//   opacity: 0;
// }
// //中间过渡效果
// .fade-enter-active,.fade-leave-active{
//   transition: opacity .5s linear;
// }
// .fade-enter-to, .fade-leave{
//   opacity: 1;
// }
</style>
<style lang="scss">
.title1 {
    .van-tabs--line {
        .van-tabs__wrap {
            height: 0.733rem !important;
        }
    }
}

.popup1 {
    .van-overlay {
        top: 30px;
        height: 90%;
    }

    .formBox[data-v-2184f27e] {
        margin-top: 30px;
    }
}


</style>