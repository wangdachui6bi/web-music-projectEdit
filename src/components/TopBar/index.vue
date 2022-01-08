<template>
  <div class="TopBar">
    <div class="header-bar">
      <!-- 菜单 -->
      <div class="menu-btn" @click="showPopup">
        <span></span>
      </div>
      <!-- 后退 -->
      <div class="btn-history">
        <button class="btn-circle" @click="$router.go(-1)">
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
      <!-- 弹出菜单 -->
      <div class="asideBar" :class="isCollapse ? 'active' : ''">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          :collapse="isCollapse"
        >
          <el-menu-item index="1-1">发现音乐</el-menu-item>
          <el-menu-item index="1-2">视频</el-menu-item>
          <el-menu-item index="1-3">私人FM</el-menu-item>
          <el-menu-item-group>
            <span slot="title">我的音乐</span>
            <el-menu-item index="2-1">每日推荐</el-menu-item>
            <el-menu-item index="2-2">最近播放</el-menu-item>
            <el-menu-item index="2-3">我的收藏</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">创建的歌单</span>
            <el-menu-item
              v-for="item in createdList"
              index="`${item.id}`"
              :key="item.id"
            >
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group>
            <span slot="title">收藏的歌单</span>
            <el-menu-item
              v-for="item in collectedList"
              index="item.id"
              :key="item.id"
            >
              {{ item.name }}
            </el-menu-item>
          </el-menu-item-group>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex"
import { logout, userAccount, playlist } from '@/api/login'

export default {
  name: "TopBar",
  data () {
    return {
      isCollapse: false,
      input: '',
      createdList: [],
      collectedList: []
    }
  },
  computed: {
    ...mapState('login', ['profile'])
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    // 弹出菜单
    showPopup () {
      this.isCollapse = !this.isCollapse
    },
    // 获取账户信息
    async getAccount () {
      const res = await userAccount()
      // 将数据传给Vuex
      this.$store.commit('login/setProfile', res.data.profile)
      this.$store.commit('login/setAccount', res.data.account)
      playlist(this.$store.state.login.profile.userId).then(({ data: { playlist } }) => {
        this.createdList = playlist.filter(item => !item.subscribed)
        this.collectedList = playlist.filter(item => item.subscribed)
        console.log(this.createdList)
        console.log(this.collectedList)
      })
    },
    // 退出弹窗
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

<style lang="scss" >
.TopBar {
  position: fixed;
  background-color: #ec4141;
  height: 60px;
  width: 100%;
  top: 0;
  z-index: 999;
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
  .asideBar {
    display: block;
    width: 48%;
    max-height: 85vh;
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    border-right: 1px solid #efefef;
    position: absolute;
    top: 60px;
    left: -100%;
    transition: all 0.5s;
  }
  .active {
    left: 0;
  }
  .el-menu-item {
    height: 40px;
    line-height: 40px;
    margin-bottom: 3px;
  }
  .el-menu-item.is-active {
    color: #313131;
    font-weight: 700;
    font-size: 15px;
  }
  .el-menu-item.is-active,
  .el-menu-item:focus,
  .el-menu-item:hover {
    background-color: #f6f6f7;
  }
  .el-menu--collapse {
    width: 100%;
  }
}
</style>