<template>
  <div>
    <div class="flex1 title1" style="background: #2b92f9; padding: 7px 0">
      <div style="width: 50%">
        <van-tabs
          v-model="ruleForm.queryType"
          background="#2b92f9"
          color="#fff"
          title-inactive-color="#fff"
          title-active-color="#fff"
        >
          <van-tab title="本年" name="1"></van-tab>
          <van-tab title="本季度" name="2"></van-tab>
          <van-tab title="本月" name="3"></van-tab>
        </van-tabs>
      </div>
      <div class="flex1 content1" @click="isShow = isShow ? false : true">
        <span style="color: #fff">筛选</span>
        <span v-show="!isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 1@3x.png"
        /></span>
        <span v-show="isShow" style="margin-left: 10px"
          ><img src="../../assets/images/saleImages/三角形 2@3x.png"
        /></span>
      </div>
    </div>
    <saleForm v-show="isShow" :ruleForm="ruleForm" @changeForm="changeForm"></saleForm>
    <div class="xsBox">
      <div class="xsItem">
        <div class="xsTitle">
          <img class="xsImg" src="@/assets/images/hospitalImg.png" />
          <div class="xsText">江苏省人民医院</div>
          <div class="xsGoDetail">数据流向<van-icon style="margin-left:5px;" name="arrow" /></div>
        </div>
        <div class="xsContent">
            <div>
                <div>销售数量（盒）</div>
                <div>128</div>
            </div>
            <div></div>
        </div>
      </div>
      <div class="xsItem">
        <div class="xsTitle">
          <img class="xsImg" src="@/assets/images/hospitalImg.png" />
          <div class="xsText">江苏省人民医院</div>
          <div class="xsGoDetail">数据流向<van-icon style="margin-left:5px;" name="arrow" /></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import saleForm from '../../components/saleForm/index.vue'
export default {
  name: '',
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
        shopId: ''
      },
      isShow: false
    }
  },
  methods: {
    changeForm(form) {
      console.log(form)
    }
  }
}
</script>

<style lang="scss" scoped>
.xsBox {
  padding: 15px;
  box-sizing: border-box;
  .xsItem {
    width: 100%;
    height: 155px;
    background-color: #fff;
    padding: 10px 15px;
    box-sizing: border-box;
    .xsTitle {
      display: flex;
      .xsImg {
        width: 36px;
        height: 36px;
      }
      .xsText {
        line-height: 30px;
        font-size: 15px;
        font-weight: 700;
        color: rgba(25, 28, 47, 1);
        margin-left: 10px;
      }
      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        color: rgba(58, 160, 255, 1);
        font-size: 14px;
      }
    }
    .xsContent {
        display: flex;
        div {
            width: calc(50% - 3px)

        };
        >div:first-child {
            border-right: 1px solid #000;
        }
    }
  }
}
.flex1 {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
</style>
<style lang="scss">
.title1 {
  .van-tabs--line {
    .van-tabs__wrap {
      height: 0.733rem !important;
    }
  }
}
.title1 .van-tabs__line {
  width: 15px;
}
</style>