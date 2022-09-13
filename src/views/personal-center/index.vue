<template>
  <div>
    <div class="bg">
      <div class="user_top">
        <VanImage width="80px" height="80px" round :src="ava" />
        <div class="user_name">会飞的鱼</div>
        <div class="user_phone">15866669999</div>
      </div>
      <div class="text_bg">
        <div class="text_bg_bottom">
          <van-cell title-class="text_left" value-class="text_right" title="用户名" value="李达云" />
          <van-cell title-class="text_left" value-class="text_right" title="微信昵称" value="会飞的鱼" />
          <van-cell title-class="text_left" value-class="text_right" title="联系电话" value="15866669999" />
          <van-cell title-class="text_left" value-class="text_right" title="所属门店" value="南京德众堂大药房" />
          <div class="border_bot"></div>
        </div>
      </div>
    </div>
    <foot-bar @goUrl="toUrl" :active="tabActive"></foot-bar>
  </div>
</template>
<script>
import { Dialog } from 'vant'
import ava from '@/assets/images/headImage.png'
export default {
  name: 'PersonalCenter',
  components: {
    footBar: () => import('@/components/footBar')
  },
  data() {
    return {
      tabActive: 2,
      ava: ava
    }
  },
  methods: {
    toUrl(e) {
      if (e == 1) {
        this.$router.push({
          name: 'DataAnalysis'
        })
      } else if (e == 0) {
        this.$router.push({
          name: 'Home'
        })
      }
    }
  }
}

</script>
<style lang="scss" scoped>
.bg {
  background: url('~@/assets/images//background.png');
  background-color: #f2f7f8;
  background-size: 100% 300px;
  background-repeat: no-repeat;
  height: 100vh;

  .user_top {
    text-align: center;
    padding-top: 50px;
    margin-bottom: 50px;
  }

  .user_name {
    margin-top: 10px;
    margin-bottom: 5px;
    font-size: 20px;
    color: rgba(255, 255, 255, 1);

  }

  .user_phone {
    font-size: 16px;
    color: #9CCDFE;
  }
}

.text_bg {
  background-color: white;
  padding-top: 25px;
  border-radius: 16px;
  height: 65vh;

  .text_left {
    color: #787878;
  }

  .text_right {
    color: #1e1e1e;
  }
}

.text_bg_bottom {
  background-color: white;
  padding-bottom: 25px;
}

.border_bot {
  position: absolute;
  box-sizing: border-box;
  content: ' ';
  pointer-events: none;
  right: 0.42667rem;
  bottom: 0;
  left: 0.42667rem;
  border-bottom: 0.02667rem solid #ebedf0;
  -webkit-transform: scaleY(0.5);
  -ms-transform: scaleY(0.5);
  transform: scaleY(0.5);
}

</style>
