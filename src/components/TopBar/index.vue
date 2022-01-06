<template>
  <div class="TopBar">
    <div class="header-bar">
      <!-- 菜单 -->
      <div class="menu-btn">
        <span></span>
      </div>
      <!-- 后退 -->
      <div class="btn-history">
        <button class="btn-circle">
          <van-icon name="arrow-left" />
        </button>
      </div>
      <!-- 搜索栏 -->
      <div class="search-input">
        <el-input
          placeholder="搜索"
          prefix-icon="el-icon-search"
          v-model="input"
        ></el-input>
      </div>
      <!-- 头像 -->
      <div class="avatar-wrap">
        <el-avatar :size="'small'" :src="profile.avatarUrl"></el-avatar>
      </div>
      <!-- 用户名 -->
      <div class="login-info">
        <span @click="open">{{ profile.nickname }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { logout, userAccount } from '@/api/login'


export default {
  name: "TopBar",
  data () {
    return {
      input: ''
    }
  },
  computed: {
    ...mapState('login', ['profile'])
  },
  methods: {
    async getAccount () {
      const res = await userAccount()
      console.log(res)
      // 将数据传给Vuex
      this.$store.commit('login/setProfile', res.data.profile)
      this.$store.commit('login/setAccount', res.data.account)
    },
    open () {
      this.$confirm('将要退出登录 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 执行退出 移除登录状态
        logout()
        sessionStorage.removeItem("isLogin")
        this.$message({
          type: 'success',
          message: '退出成功!'
        })
        location.reload(true)
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    }
  },
  created () {
    this.getAccount()
  }
}
</script>

<style lang="scss" scoped>
.TopBar {
  position: fixed;
  background-color: #ec4141;
  height: 60px;
  width: 100%;
  top: 0;
  .header-bar {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    // 菜单按钮
    .menu-btn {
      display: inline-block;
      width: 24px;
      height: 24px;
      position: relative;
      span {
        position: absolute;
        display: inline-block;
        width: 20px;
        height: 2px;
        top: 2px;
        left: 4px;
        background-color: #fff;
        transition: none;
      }
      span:before {
        top: 8px;
        left: 0;
      }
      span:after {
        left: 0;
        top: 16px;
      }
      span:after,
      span:before {
        position: absolute;
        content: '';
        display: inline-block;
        width: 20px;
        height: 2px;
        background-color: #fff;
      }
    }
    // 回退按钮
    .btn-history {
      margin-left: 10px;
      display: flex;
      .btn-circle {
        display: flex;
        height: 26px;
        width: 26px;
        outline: 0;
        border: 0;
        background-color: #e13e3e;
        color: #fff;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        margin-right: 10px;
        cursor: pointer;
      }
    }
    // 搜索栏
    .search-input {
      margin: 0;
      position: relative;
      .el-input {
        width: 200px;
      }
    }
    // 头像
    .avatar-wrap {
      margin-left: 12px;
      .el-avatar {
        width: 30px;
        height: 30px;
      }
    }
    // 用户名
    .login-info {
      margin-left: 10px;
      color: #fff;
      font-size: 12px;
    }
  }
}
</style>