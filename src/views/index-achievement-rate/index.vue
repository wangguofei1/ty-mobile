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
            <saleForm  :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
        </van-popup>
        </div>
        <div class="headBox">
            <div class="inBox">

            </div>
        </div>
    </div>
</template>

<script>
import saleForm from "../../components/saleForm/index.vue"
export default {
    name: "",
    components: { saleForm },
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
            chartsType: '1',
            chartsData1: [],
            chartsData2: [],
            chartsData3: [],
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
        width: 343px;
        height: 283px;
        // background:;
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
.popup1{
    .van-overlay{
        top:30px;
        height: 90%;
    }
    .formBox[data-v-2184f27e]{
        margin-top: 30px;
    }
}
</style>