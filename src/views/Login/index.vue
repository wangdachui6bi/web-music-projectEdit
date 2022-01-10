
<template>
  <div class="login">
    <div class="wrap">
      <div class="containner">
        <h1>{{ loginType[showindex] }}登录</h1>
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
              :rules="[
                { required: true, pattern, message: '请输入正确的手机号' },
              ]"
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
                登录
              </van-button>
            </div>
          </van-form>
        </div>
        <div class="codeLogin" v-if="showindex === 1">
          <div class="codeqr">
            <p>
              打开
              <a href="https://music.163.com/#/download">网易云音乐手机端</a>
              扫码登录
            </p>
            <div
              class="btn-fresh"
              v-if="isEffect === false"
              @click="refreshQrcode"
            >
              <i class="el-icon-refresh-left iconfresh"></i>
            </div>
          </div>
          <div class="codeImg">
            <img :src="codeImg" alt="" />
          </div>
          <p class="status">状态:{{ codeStatus }}</p>
        </div>
        <div class="indentifyLogin" v-if="showindex === 2">
          <van-form @submit="onSubmit">
            <van-field
              v-model="username"
              name="phone"
              label="手机号"
              placeholder="手机号"
              :rules="[
                { required: true, pattern, message: '请输入正确的手机号' },
              ]"
            />
            <van-field
              v-model="identify"
              type="text"
              name="identify"
              label="验证码"
              placeholder="请输入验证码"
              :rules="[{ required: true }]"
            />
            <div class="getidentify">
              <el-button
                type="primary"
                plain
                @click="sendIdent"
                :disabled="iscountdown"
                >{{ msg }}</el-button
              >
            </div>
            <div style="margin: 16px">
              <!-- 绑定验证验证码方法 -->
              <van-button
                round
                block
                type="info"
                native-type="button"
                @click="checkIdent"
              >
                登录
              </van-button>
            </div>
          </van-form>
        </div>
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
import { login, getcodekey, createcodemsg, checkcode, sendIdentify, checkIdentify } from '@/api/login'
Vue.use(Toast)
Vue.use(Form)
Vue.use(Field)
// 登录组件
export default {
  name: "Login",
  data() {
    return {
      username: '',
      password: '',
      showindex: 0,
      loginType: ['手机号', '二维码', '验证码'],
      codeImg: '',
      codeStatus: '请稍等一会儿',
      timer: 0,
      status: 0,
      isEffect: false,
      identify: '',
      pattern: /^1(3|4|5|6|7|8|9)\d{9}$/,
      iscountdown: false,
      isSend: false,
      msg: '获取验证码',
      timerIdenify: 0,
      ismsgRight: false
    }
  },
  methods: {
    // 验证码匹配
    async checkIdent() {
      if (this.identify === '' && !this.pattern.test(this.username)) return
      const res = await checkIdentify(this.username, this.identify)
      this.ismsgRight = res.data.data
    },
    async sendIdent() {
      // 如果手机号不正确则不能发送验证码
      if (this.pattern.test(this.username)) {
        this.msg = 60
        // 点击一下变为计数状态 disabled属性生效
        this.iscountdown = true
        // 发送验证码开启倒计时
        this.timerIdenify = setInterval(() => {
          this.msg--
          // 变到0 关闭计时器 变为可用
          if (this.msg === 0) {
            clearInterval(this.timerIdenify)
            this.msg = '获取验证码'
            this.iscountdown = false
          }
        }, 1000)
        const res = await sendIdentify(this.username)
        this.isSend = res.data.data
        if (this.isSend) {
          Toast('验证码发送成功')
        } else {
          Toast('发送失败,请检查手机号或者等下更换登录方式')
        }
      } else {
        Toast('请输入正确的手机号')
      }
      return false
    },
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
      // 如果二维码有效点了就没用
      if (this.isEffect) return
      this.isEffect = true
      const timeNow = Date.now()
      const res = await getcodekey(timeNow)
      if (res.data.code !== 200) return
      const key = res.data.data.unikey
      createcodemsg(key, timeNow).then((resImg) => {
        // 创建二维码的同时 进行查询二维码的状态
        checkcode(key, timeNow).then((res) => {
          this.codeImg = resImg.data.data.qrimg
          this.codeStatus = res.data.message
        })
      })
      // 轮询此接口可获取二维码扫码状态,
      // 每次生成新的code的时候清除check的计时器
      clearInterval(this.timer)
      this.timer = setInterval((key) => {
        // 每次check的时候时间戳都要为最新的
        checkcode(key, Date.now()).then((res) => {
          this.codeStatus = res.data.message
          this.status = res.data.code
        })
      }, 1000, key)
      // 生成后判断showIndex 是否显示的是code登录页面不是的话也要清除计时器
      if (this.showindex !== 1) {
        clearInterval(this.timer)
      }
    },
    refreshQrcode() {
      this.codeStatus = '请稍等更新中'
      this.codeImg = ''
      this.createcode()
    }
  },
  watch: {
    showindex(newVal, oldVal) {
      // 每次切换到其他登录模式的时候关闭自动检查的定时器 再次点击二维码登录重新
      // 获取新的二维码
      clearInterval(this.timer)
      if (newVal !== 1) {
        this.codeImg = ''
        this.isEffect = false
      } else {
        this.refreshQrcode()
      }
    },
    // 监听二维码状态的变换 如果 为800了就可以点击刷新了
    status(newVal) {
      if (newVal === 800) {
        // 失效了清空checkcode计时器
        this.isEffect = false
        clearInterval(this.timer)
      } else if (newVal === 803) {
        // 成功了也清空checkcode计时器
        this.isEffect = false
        clearInterval(this.timer)
        Toast("登录成功")
        sessionStorage.setItem("isLogin", true)
        this.$router.push("/")
        // 
      }
    },
    ismsgRight(newVal) {
      if (newVal) {
        Toast("登录成功")
        sessionStorage.setItem("isLogin", true)
        this.$router.push("/")
      } else {
        sessionStorage.setItem("isLogin", false)
        Toast('登录失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-image: url('https://img0.baidu.com/it/u=3645292787,606932856&fm=26&fmt=auto?qq-pf-to=pcqq.group');
  .wrap {
    background-color: #fff;
    overflow: hidden;
    border-radius: 20px;
    width: 330px;
    height: 500px;
    margin: 30% auto;
    .containner {
      width: 274px;
      height: 281px;
      margin: 50px auto;
      h1 {
        text-align: center;
        font-weight: normal;
        margin-bottom: 40px;
      }
      .type-btn-wrap {
        display: flex;
        justify-content: center;
        font-size: 16px;
        margin-bottom: 20px;
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
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: rgb(0, 0, 0);
        }
      }
      // 验证码登录
      .codeLogin {
        .codeqr,
        p {
          text-align: center;
          margin: 0;
          padding: 0;
        }
        .codeqr {
          .btn-fresh {
            margin-left: 60px;
            position: absolute;
            width: 160px;
            height: 160px;
            background-color: #ccc;
            opacity: 0.8;
            color: red;
            display: flex;
            justify-content: center;
            align-items: center;
            .iconfresh {
              font-family: element-icons !important;
              speak: none;
              font-style: normal;
              font-weight: 400;
              font-variant: normal;
              text-transform: none;
              line-height: 1;
              vertical-align: baseline;
              display: inline-block;
              -webkit-font-smoothing: antialiased;
            }
          }
        }
        .codeqr > p {
          margin-top: 10px;
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