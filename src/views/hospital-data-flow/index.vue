<template>
  <div>
    <div class="xsBox1">
      <div class="xsItem1">
        <div class="xsTitle1">
          <img class="xsImg1" src="@/assets/images/hospitalImg.png" />
          <div class="xsText1">江苏省人民医院</div>
        </div>
        <div class="xsContent1">
          <div class="xsNumBox1">
            <div>销售数量（盒）</div>
            <div class="yeFont1">128</div>
          </div>
          <div class="xsNumBox11">
            <div>销售金额（元）</div>
            <div class="yeFont1">128</div>
          </div>
        </div>
        <div class="xsFoot1">
          <div class="xsFootBox1"><span>同比： </span><span>67.66%</span></div>
          <div class="xsFootBox11"><span>环比： </span><span>15.89%</span></div>
        </div>
      </div>
    </div>
    <div class="bgff">
      <div class="lxTitle">流向数据</div>
      <div class="xsBox">
        <div class="xsItem">
          <div class="xsTitle">
            <img class="xsImg" src="@/assets/images/hospitalImg.png" />
            <div class="xsText">江苏省人民医院</div>
          </div>
          <div class="xsContent">
            <div class="xsNumBox">
              <div>销售数量（盒）</div>
              <div class="yeFont">128</div>
            </div>
            <div class="xsNumBox1">
              <div>销售金额（元）</div>
              <div class="yeFont">128</div>
            </div>
          </div>
          <div class="xsFoot">
            <div class="xsFootBox"><span>同比： </span><span class="blkFont">67.66%</span></div>
            <div class="xsFootBox1"><span>环比： </span><span class="blkFont">15.89%</span></div>
          </div>
        </div>
      </div>
      <div class="xsBox">
        <div class="xsItem">
          <div class="xsTitle">
            <img class="xsImg" src="@/assets/images/hospitalImg.png" />
            <div class="xsText">江苏省人民医院</div>
          </div>
          <div class="xsContent">
            <div class="xsNumBox">
              <div>销售数量（盒）</div>
              <div class="yeFont">128</div>
            </div>
            <div class="xsNumBox1">
              <div>销售金额（元）</div>
              <div class="yeFont">128</div>
            </div>
          </div>
          <div class="xsFoot">
            <div class="xsFootBox"><span>同比： </span><span class="blkFont">67.66%</span></div>
            <div class="xsFootBox1"><span>环比： </span><span class="blkFont">15.89%</span></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
import { queryHospitalOfficeSales } from '@/api/salesFlow'
import saleForm from '../../components/saleForm/index.vue'
export default {
  name: '',
  components: { saleForm },
  data() {
    return {}
  },
  created() {
    this.queryHospitalOfficeSales({ hospitalId: 1 })
  },
  methods: {
    // 医院流向数据
    queryHospitalOfficeSales(form) {
      queryHospitalOfficeSales(form).then(res => {
        if (res.code == 0) {
          this.hospitalSales = res.data.hospitalSales
        }
      })
    }
  }
}
</script>
  
  <style lang="scss" scoped>
.xsBox1 {
  padding: 15px;
  box-sizing: border-box;
  .xsItem1 {
    width: 100%;
    height: 155px;
    background: #389afc;
    color: #fff;
    padding-top: 10px;
    box-sizing: border-box;
    border-radius: 6px;
    overflow: hidden;
    .xsTitle1 {
      display: flex;
      width: calc(100%-30px);
      margin: 0 15px;
      .xsImg1 {
        width: 45px;
        height: 45px;
      }
      .xsText1 {
        line-height: 44px;
        font-size: 20px;
        font-weight: 700;
        margin-left: 10px;
      }
      .xsGoDetail {
        margin-left: auto;
        line-height: 30px;
        font-size: 14px;
      }
    }
    .xsContent1 {
      width: calc(100%-30px);
      margin: 10px 15px 5px 15px;
      display: flex;
      .xsNumBox1,
      .xsNumBox11 {
        padding-left: 5px;
        width: calc(50% - 3px);
        font-size: 14px;
        .yeFont1 {
          margin-top: 6px;
        }
      }
      .xsNumBox11 {
        padding-left: 28px;
      }
    }
    .xsFoot1 {
      width: 100%;
      height: 37px;
      padding: 0 15px;
      line-height: 37px;
      display: flex;
      .xsFootBox1,
      .xsFootBox11 {
        padding-left: 5px;
        width: calc(50% - 2px);
        font-size: 14px;
      }
    }
  }
}
.bgff {
  background: #fff;
  .lxTitle {
    line-height: 53px;
    font-size: 16px;
    font-weight: 700;
    color: rgba(56, 154, 252, 1);
    padding-left: 20px;
    border-bottom: 1px solid rgba(216, 220, 229, 1);
  }
  .xsBox {
    padding: 0 15px;
    box-sizing: border-box;
    .xsItem {
      width: 100%;
      height: 155px;
      background-color: #fff;
      padding-top: 10px;
      box-sizing: border-box;
      border-radius: 6px;
      overflow: hidden;
      .xsTitle {
        display: flex;
        width: calc(100%-30px);
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
        width: calc(100%-30px);
        margin: 10px 0 23px 0;
        display: flex;
        .xsNumBox,
        .xsNumBox1 {
          padding-left: 5px;
          width: calc(50% - 3px);
          color: rgba(166, 166, 166, 1);
          font-size: 14px;
          .yeFont {
            margin-top: 6px;
            color: rgba(255, 141, 26, 1);
          }
        }
        .xsNumBox1 {
          padding-left: 28px;
        }
        > .xsNumBox:first-child {
          border-right: 1px solid rgba(245, 245, 245, 1);
        }
      }
      .xsFoot {
        width: 100%;
        height: 37px;
        background: rgba(250, 250, 250, 1);
        padding: 0 6px;
        line-height: 37px;
        display: flex;
        .xsFootBox,
        .xsFootBox1 {
          padding-left: 5px;
          width: calc(50% - 2px);
          color: rgba(166, 166, 166, 1);
          font-size: 14px;
          .blkFont {
            color: #000;
          }
        }
      }
    }
  }
}
</style>