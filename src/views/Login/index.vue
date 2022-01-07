
<template>
  <div class="login">
    <div class="wrap">
      <div class="containner">
        <h2>手机号登录</h2>
        <van-form @submit="onSubmit">
          <van-field
            v-model="username"
            name="phone"
            label="手机号"
            placeholder="手机号"
            :rules="[{ required: true, message: '请输入手机号' }]"
          />
          <van-field
            v-model="password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
          />
          <div style="margin: 16px">
            <van-button round block type="info" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </div>
    </div>
  </div>
</template>

<script>
// 引入Vant
import Vue from 'vue'
import { Form, Field, Toast } from 'vant'

// 引入js-cookies
// import Cookies from 'js-cookie'

// 引入接口
import { login } from '@/api/login'

Vue.use(Toast)
Vue.use(Form)
Vue.use(Field)
// 登录组件
export default {
  name: "Login",
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      const { data: { code, msg } } = await login(values)
      console.log(code)
      if (code === 200) {
        Toast("登录成功")
        sessionStorage.setItem("isLogin", true)
        this.$router.push("/")
      } else {
        sessionStorage.setItem("isLogin", false)
        Toast(msg)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  margin-top: -60px;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url('https://cdn.jsdelivr.net/gh/crazybox521/blogImg/login.jpg');
  .wrap {
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;
    width: 330px;
    height: 330px;
    margin: 40% auto;
    .containner {
      width: 274px;
      height: 281px;
      margin: 50px auto;
      h2 {
        text-align: center;
      }
    }
  }
}
</style>