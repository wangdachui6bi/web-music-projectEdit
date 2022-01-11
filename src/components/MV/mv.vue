<template>
  <div class="MV">
    <button class="newBtn">{{ title }}</button>
    <van-tabs v-model="activeMV" @click="MVGujia" v-if="isHaveClick">
      <van-tab title="内地"></van-tab>
      <van-tab title="港台"></van-tab>
      <van-tab title="欧美"></van-tab>
      <van-tab title="日本"></van-tab>
      <van-tab title="韩国"></van-tab>
    </van-tabs>
    <el-skeleton :rows="6" animated :loading="eleLoading">
      <div v-if="!eleLoading" class="mvDetail">
        <ul>
          <li v-for="(mv, index) in newMVAll" :key="index">
            <div class="mvSingle" @click="turnToPlay(mv.id)">
              <img :src="mv.cover" alt="" />
              <p>{{ mv.name }}</p>
              <p>{{ mv.artistName }}</p>
            </div>
          </li>
        </ul>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
export default {
  props: {
    isHaveClick: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    // 从父组件
    getMv: {
      type: Function,
      default: () => {
        return Function
      }
    }
  },
  data() {
    return {
      activeMV: 0,
      newMVAll: [],
      eleLoading: true
    }
  },
  created() {
    this.MVGujia()
  },
  methods: {
    turnToPlay(id) {
      this.$router.push(`/videodetail/mv/${id}`)
    },
    async MVGujia() {
      this.eleLoading = true
      const res = await this.getMv()
      this.newMVAll = res.data
      this.eleLoading = false
    }
  }

}
</script>

<style lang="scss" >
.MV {
  padding: 0 20px 0 20px;
  box-sizing: border-box;
  .newBtn {
    margin-top: 20px;
    outline: 0;
    border: 0;
    color: #676767;
    cursor: pointer;
    font-size: 18px;
    background-color: #fff;
  }
  .van-tabs {
    .van-tabs__line {
      background-color: #fff;
    }
    .van-tab--active {
      .van-tab__text--ellipsis {
        text-align: center;
        display: block;
        cursor: pointer;
        padding: 4px 10px;
        font-size: 14px;
        color: red;
        background-color: rgba(255, 182, 198, 0.2);
        border-radius: 15px;
      }
    }
  }
  .mvDetail {
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 45%;
        margin-bottom: 14px;
        div {
          img {
            width: 100%;
            height: 112px;
          }
        }
        p {
          margin: 0;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        p:first-of-type {
          margin: 4px 0 4px 0;
        }
        span {
          color: #e0e0e0;
        }
      }
    }
  }
}
</style>