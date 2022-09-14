<template>
    <div>
        <topNav :ruleForm="ruleForm" @changeForm="changeForm" @changeTab="changeTab1"></topNav>
        <div class="headBox">
            <div class="inBox">
                <div class="topBox flex1">
                    <div>
                        <span>
                            <img src="../../assets/images/saleImages/person.png" />
                        </span>
                        <span style="padding-left:5px;vertical-align:baseline" class="text">
                            新患者
                        </span>
                    </div>
                    <div>
                        新发现购买行为的患者
                    </div>
                </div>
                <div class="bigBox">
                    <div class="dataBox1 flex1">
                        <div>
                            <span>患者人数</span>
                            <div>{{newInfo.num}}人</div>
                        </div>
                        <div style="padding:20px 10px 0 0">
                            <pieCharts id1="1" :chartData="chartData" :color="['#c89479','#f0f2f5']"></pieCharts>
                        </div>
                    </div>
                    <div class="dataBox1 flex1">
                        <div>
                            <span>销售额</span>
                            <div style="font-size:14px">{{newInfo.sales}}</div>
                        </div>
                        <div style="padding:20px 10px 0 0">
                            <pieCharts id1="2" :chartData="chartData2" :color="['#c89479','#f0f2f5']"></pieCharts>
                        </div>
                    </div>
                    <div class="dataBox">
                        <span>DOT</span>
                        <div class="text1">{{newInfo.dot}}月</div>
                    </div>
                    <div class="dataBox">
                        <span>平均购买次数</span>
                        <div>{{newInfo.buyTimesAvg}}次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="headBox">
            <div class="inBox inBox2">
                <div class="topBox flex1">
                    <div>
                        <span>
                            <img src="../../assets/images/saleImages/person.png" />
                        </span>
                        <span style="padding-left:5px;vertical-align:baseline" class="text">
                            老患者
                        </span>
                    </div>
                    <div>
                        发生复购行为的患者
                    </div>
                </div>
                <div class="bigBox">
                    <div class="dataBox1 flex1">
                        <div>
                            <span>患者人数</span>
                            <div>{{oldInfo.num}}人</div>
                        </div>
                        <div style="padding:20px 10px 0 0">
                            <pieCharts id1="3" :chartData="chartData3" :color="['#4a95e8','#f0f2f5']"></pieCharts>
                        </div>
                    </div>
                    <div class="dataBox1 flex1">
                        <div>
                            <span>销售额</span>
                            <div style="font-size:14px">{{oldInfo.sales}}</div>
                        </div>
                        <div style="padding:20px 10px 0 0">
                            <pieCharts id1="4" :chartData="chartData4" :color="['#4a95e8','#f0f2f5']"></pieCharts>
                        </div>
                    </div>
                    <div class="dataBox">
                        <span>DOT</span>
                        <div class="text1">{{oldInfo.dot}}月</div>
                    </div>
                    <div class="dataBox">
                        <span>平均购买次数</span>
                        <div>{{oldInfo.buyTimesAvg}}次</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="chartBox">
            <div class="barChart">
                <div class="indexRow flex1" style="justify-content:space-between">
                    <div class="flex1">
                        <img class="indexMg" src="@/assets/images/xsImg.png" />
                        <div class="headTitle">患者数据统计</div>
                    </div>
                </div>
                <div style="padding: 5px">
                    <barChart :chartData="dataList"></barChart>
                </div>
            </div>
        </div>
        <div class="chartBox">
            <div class="barChart">
                <div class="indexRow flex1" style="justify-content:space-between">
                    <div class="flex1">
                        <img class="indexMg" src="@/assets/images/xsImg.png" />
                        <div class="headTitle">脱落原因统计</div>
                    </div>
                </div>
                <div style="padding: 5px">
                    <pieChart2 :chartData="chartData6"></pieChart2>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import topNav from "../../components/topNav.vue"
import pieCharts from "./components/pieCharts.vue"
import barChart from "./components/barChart.vue"
import pieChart2 from "./components/pieChart2.vue"
import { queryPatientComparison, queryPatientCountByMonth, queryPatientStopReasonRange } from '@/api/system'
export default {
    name: "",
    components: { topNav, pieCharts, barChart, pieChart2 },
    data() {
        return {
            queryType: '1',
            ruleForm: {
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
            chartData: [
            ],
            chartData2: [
            ],
            chartData3: [
            ],
            chartData4: [
            ],
            chartData6: [
            ],
            dataList: [],
            newInfo: [],
            oldInfo: [],
        }
    },
    methods: {
        changeTab1(type){
            this.queryType=type;
            this.getPatientList({queryType:this.queryType});
            this.queryPatientComparison({queryType:this.queryType});
            this.queryPatientStopReasonRange({queryType:this.queryType});
        },  
        changeForm(form) {
            this.getPatientList(form);
            this.queryPatientComparison(form);
            this.queryPatientStopReasonRange(form);
        },
        async getPatientList(data) {
            const res = await queryPatientCountByMonth(data)
            this.dataList = res.data
        },
        async queryPatientComparison(data) {
            const res = await queryPatientComparison(data)
            // console.log(100-(res.data.new.salesRate.substr(0,res.data.new.salesRate.length - 1)*1))
            this.newInfo = res.data.new
            this.oldInfo = res.data.old
            this.chartData=[{name:'',value:res.data.new.numRate.substr(0,res.data.new.numRate.length - 1)*1},{name:'',value:100-(res.data.new.numRate.substr(0,res.data.new.numRate.length - 1)*1)}]
            this.chartData2=[
            {name:'',value:res.data.new.salesRate.substr(0,res.data.new.salesRate.length - 1)*1}, {name:'',value:100-(res.data.new.salesRate.substr(0,res.data.new.salesRate.length - 1)*1)},
               ]
            this.chartData3=[{name:'',value:res.data.old.numRate.substr(0,res.data.old.numRate.length - 1)*1},{name:'',value:100-(res.data.old.numRate.substr(0,res.data.old.numRate.length - 1)*1)}]
            this.chartData4=[{name:'',value:res.data.old.salesRate.substr(0,res.data.old.salesRate.length - 1)*1},{name:'',value:100-(res.data.old.salesRate.substr(0,res.data.old.salesRate.length - 1)*1)}]

        },
        async queryPatientStopReasonRange(data) {
            const res = await queryPatientStopReasonRange(data)
            this.chartData6 = res.data.map(ele => { return { name: ele.name, value: ele.value } })
        },
    },
    mounted() {
        this.getPatientList({queryType:this.queryType});
        this.queryPatientComparison({queryType:this.queryType});
        this.queryPatientStopReasonRange({queryType:this.queryType});
    }
}
</script>

<style lang="scss" scoped>
.flex1 {
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
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
</style>
<style lang="scss">
.title1 {
    .van-tabs--line {
        .van-tabs__wrap {
            height: 0.733rem !important;
        }
    }
}

.headBox {
    width: 100%;
    box-sizing: border-box;
    padding: 0 15px;

    .inBox {
        box-sizing: border-box;
        margin-top: 10px;
        width: 343px;
        height: 238px;
        background: url("../../assets/images/saleImages/back1.png") no-repeat;
        background-size: cover;
        padding: 0 15px;

        .topBox {
            line-height: 53px;
            overflow: hidden;
            align-content: center;

            .text {
                font-size: 18px;
                font-weight: 700;
                color: rgba(95, 61, 36, 1);
                vertical-align: top;
            }

            >div:nth-child(2) {
                font-size: 12px;
                font-weight: 400;
                color: rgba(95, 61, 36, 1);
            }

            >div {
                >span:nth-child(1) {
                    position: relative;
                    top: 5px;
                }
            }
        }

        .bigBox {
            margin: 0px 15px 0 0px;
            width: 314px;
            height: 166px;
            opacity: 1;
            border-radius: 4px;
            background: rgba(255, 255, 255, 1);
            display: flex;
            flex-flow: row wrap;

            .dataBox {
                box-sizing: border-box;
                width: 50%;
                height: 83px;
                border: 0.5px solid #E9E9E9FF;
                padding: 21px 0 0 16px;

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
                    color: rgba(0, 0, 0, 1);
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

            .dataBox1 {
                box-sizing: border-box;
                width: 50%;
                height: 83px;
                border: 0.5px solid #E9E9E9FF;

                span {
                    font-size: 16px;
                    font-weight: 400;
                    letter-spacing: 0px;
                    line-height: 14px;
                    color: rgba(144, 147, 153, 1);
                    text-align: left;
                    vertical-align: top;
                }

                >div:nth-child(1) {
                    padding: 21px 10px 10px 16px;

                    >div {
                        margin-top: 20px;
                        font-size: 18px;
                        font-weight: 500;
                        letter-spacing: 0px;
                        line-height: 0px;
                        color: rgba(0, 0, 0, 1);
                        text-align: left;
                        vertical-align: top;
                    }

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

    .inBox2 {
        background: url("../../assets/images/saleImages/back2.png") no-repeat !important;
        background-size: cover !important;
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