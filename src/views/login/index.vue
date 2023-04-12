<!-- home -->
<template>
  <div class="loginBox">
    <div class="topBox">
      <img style="margin: 80px 0 0 30px; width: 150px" src="@/assets/images/logo2.png" />
      <div style="font-size: 18px; color: #354c57; margin: 30px 0 0 30px">欢迎登陆零售监管分析系统</div>
    </div>
    <div>
      <van-form @submit="onSubmit" class="submitBox">
        <van-field
          v-model="username"
          name="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请填写用户名' }]"
          style="background: #f5f7fb"
        />
        <van-field
          v-model="password"
          type="password"
          name="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请填写密码' }]"
          style="background: #f5f7fb; margin-top: 20px"
        />
        <div style="margin-top: 42px">
          <van-button round block type="info" native-type="submit">登录</van-button>
        </div>
      </van-form>
    </div>
    <div class="footBox"></div>
  </div>
</template>
  
  <script>
import { login } from '@/api/home'
export default {
  name: 'Login',
  components: {},
  data() {
    return {
      username: '',
      password: ''
    }
  },
  created() {},
  computed: {},

  mounted() {},

  methods: {
    onSubmit(values) {
      login({
        username: this.username,
        password: this.password
      }).then(res => {
        if (res.code == 0) {
          localStorage.setItem('id', res.data.id)
          this.$router.push({
            path: 'home'
          })
        }
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.loginBox {
  width: 100%;
  min-height: 100vh;
  background-color: #fff;
  .topBox,
  .footBox {
    width: 100%;
    height: 244.5px;
    background: url('~@/assets/images/loginBg.png') no-repeat;
    background-size: cover;
  }
  .footBox {
    position: fixed;
    height: 157.5px;
    bottom: 0;
    background-image: url('~@/assets/images/loginImg.png');
    background-size: cover;
  }
  .submitBox {
    padding: 0 30px;
  }
}
</style>