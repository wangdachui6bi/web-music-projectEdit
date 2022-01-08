
<template>
  <div class="login">
    <div class="wrap">
      <div class="containner">
        <h2>{{ loginType[showindex] }}登录</h2>
        <div class="type-btn-wrap">
          <button
            @click="showindex = 0"
            :class="showindex === 0 ? 'active' : ''"
          >
            手机号
          </button>
          <button
            @click="
              createcode();
              showindex = 1;
            "
            :class="showindex === 1 ? 'active' : ''"
          >
            二维码
          </button>
          <button
            @click="showindex = 2"
            :class="showindex === 2 ? 'active' : ''"
          >
            验证码
          </button>
        </div>
        <div class="phoneLogin" v-if="showindex === 0">
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
        <div class="codeLogin" v-if="showindex === 1">
          <p>
            打开
            <a href="https://music.163.com/#/download">网易云音乐手机端</a>
            扫码登录
          </p>
          <div class="codeImg">
            <img :src="codeImg" alt="" />
          </div>
          <p class="status">状态:{{ codeStatus }}</p>
        </div>
        <div class="indentifyLogin" v-if="showindex === 2"></div>
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
import { login, getcodekey, createcodemsg, checkcode } from '@/api/login'

Vue.use(Toast)
Vue.use(Form)
Vue.use(Field)
// 登录组件
export default {
  name: "Login",
  data() {
    return {
      isLoading: false,
      username: '',
      password: '',
      showindex: 0,
      loginType: ['手机号', '二维码', '验证码'],
      codeImg: '',
      codeStatus: '',
      timer: 0
    }
  },
  methods: {
    async onSubmit(values) {
      const { data: { code, msg } } = await login(values)
      if (code === 200) {
        Toast("登录成功")
        sessionStorage.setItem("isLogin", true)
        this.$router.push("/")
      } else {
        sessionStorage.setItem("isLogin", false)
        Toast(msg)
      }
    },
    async createcode() {
      if (this.showindex === 1) return
      const timeNow = Date.now()
      const res = await getcodekey(timeNow)
      if (res.data.code !== 200) return
      const key = res.data.data.unikey
      createcodemsg(key, timeNow).then((resImg) => {
        this.codeImg = resImg.data.data.qrimg
        checkcode(key, timeNow).then((res) => {
          this.codeStatus = res.data.message
        })
      })
      this.timer = setInterval((key, timeNow) => {
        checkcode(key, timeNow).then((res) => {
          this.codeStatus = res.data.message
        })
      }, 2000, key, timeNow)
    }
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background: url("https://cdn.jsdelivr.net/gh/crazybox521/blogImg/login.jpg");
  .wrap {
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;
    width: 330px;
    height: 350px;
    margin: 40% auto;
    .containner {
      width: 274px;
      height: 281px;
      margin: 50px auto;
      h2 {
        text-align: center;
      }
      .type-btn-wrap {
        display: flex;
        justify-content: center;
        font-size: 16px;
        button {
          outline: 0;
          border: 0;
          color: #676767;
          cursor: pointer;
          background-color: #fff;
        }
        button.active {
          font-weight: 700;
        }
        button.active::after {
          content: "";
          display: block;
          width: 100%;
          height: 2px;
          background-color: rgb(0, 0, 0);
        }
      }
      // 验证码登录
      .codeLogin {
        p {
          text-align: center;
          margin: 0;
          padding: 0;
        }
        .codeImg {
          margin-left: 60px;
          img {
            width: 160px;
            height: 160px;
          }
        }
      }
    }
  }
}
</style>