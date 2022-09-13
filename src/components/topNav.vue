<template>
    <div>
        <div class="flex1 title1" style="background:#2b92f9; padding: 7px 0">
            <div style="width:50%">
                <van-tabs v-model="ruleForm.queryType" background="#2b92f9" color="#fff" title-inactive-color="#fff"
                    title-active-color="#fff" @change="changeTab1">
                    <van-tab title="本年" name="1"></van-tab>
                    <van-tab title="本季度" name="2"></van-tab>
                    <van-tab title="本月" name="3"></van-tab>
                </van-tabs>
            </div>
            <div class="flex1 content1" @click="isShow=isShow?false:true">
                <span style="color:#fff">筛选</span>
                <span v-show="!isShow" style="margin-left:10px"><img
                        src="../assets/images/saleImages/三角形 1@3x.png" /></span>
                <span v-show="isShow" style="margin-left:10px"><img
                        src="../assets/images/saleImages/三角形 2@3x.png" /></span>
            </div>
        </div>
        <div class="popup1">
            <van-popup v-model="isShow" round position="top" :duration="0.5" transition="fade">
                <saleForm :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
            </van-popup>
        </div>
    </div>
</template>

<script>
    import saleForm from "./saleForm/index.vue"
    export default {
        name:"",
        components: { saleForm},
        data(){
            return{
                isShow:false,
            }
        },  
        methods:{
            changeForm(form){
                this.$emit("changeForm",form)
            },
            changeTab1(){
                this.$emit('changeTab')
            }
        },
        props:['ruleForm'],
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

.popup1 {
    .van-overlay {
        top: 37px;
        height: 100%;
    }

    .formBox[data-v-2184f27e] {
        margin-top: 37px;
    }
}

</style>