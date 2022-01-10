<template>
  <div class="search-input">
    <el-input
      placeholder="搜索"
      prefix-icon="el-icon-search"
      v-model="input"
      @focus="onFocus"
      @blur="onChange"
      @keyup.enter.native="search(input)"
      ref="refInput"
    ></el-input>
    <div class="search-info_tip" v-show="isOnFocus">
      <!-- 搜索历史 -->
      <div class="his-search">
        <div class="hot-title font-14">
          <span>搜索历史</span>
          <button class="no-btn" @click="delHistory">
            <i class="el-icon-delete"></i>
          </button>
        </div>
        <div class="his-wrap">
          <button
            class="btn btn-white his-item font-12"
            v-for="(item, index) in searchHistory"
            :key="index"
            @click="search(item)"
          >
            {{ item }}
          </button>
        </div>
      </div>
      <!-- 热搜榜 -->
      <div class="hot-search mtop-20">
        <div class="hot-title font-14">热搜榜</div>
        <div
          v-for="(item, index) in hotList"
          :key="index"
          class="hot-item"
          :class="index < 3 ? 'top-item' : ''"
          @click="search(item.searchWord)"
        >
          <div class="item-index">{{ index + 1 }}</div>
          <div class="item-info">
            <div class="key-word">
              <span class="font-12 item-key">{{ item.searchWord }}</span>
              <span class="font-12 mleft-10" style="color: rgb(194, 193, 193)">
                {{ item.score }}
              </span>
            </div>
            <div>
              <span class="font-12" style="color: rgb(153, 153, 153)">
                {{ item.content }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { hotSearch } from "@/api/Search"
export default {
  name: "SearchInput",
  data() {
    return {
      input: '',
      isOnFocus: false,
      searchHistory: [],
      hotList: [],
      keyword: ''
    }
  },
  created() {
    this.init()
    this.input = this.$store.state.search.keyword
  },
  methods: {
    // 点击搜索事件
    async search(keyword) {
      this.input = keyword
      this.keyword = keyword
    },
    // 搜索框的聚焦和失焦事件
    onChange() {
      setTimeout(() => {
        this.isOnFocus = false
      }, 50)
    },
    onFocus() {
      this.isOnFocus = true
    },
    // 删除搜索历史
    delHistory() {
      this.searchHistory = []
      localStorage.removeItem("search")
    },
    // 初始化数据
    async init() {
      // 获取搜索历史
      // localStorage.setItem("search", JSON.stringify(['孤勇者', '情绪收音机']))
      this.searchHistory = JSON.parse(localStorage.getItem("search") || "[]")
      // 获取热搜榜
      const { data: { data } } = await hotSearch()
      this.hotList = data
    }
  },
  watch: {
    keyword(newVal, oldVal) {
      if (newVal === oldVal) return
      this.$router.push(`/search/${this.keyword}`)
      this.isOnFocus = false
      this.$store.commit('search/setKeyword', this.keyword)
    }
  }
}
</script>

<style lang="scss" scoped>
// 搜索栏
.search-input {
  margin: 0;
  position: relative;
  .el-input {
    width: 200px;
  }
  .search-info_tip {
    position: absolute;
    top: 40px;
    width: 340px;
    min-height: 340px;
    max-height: 420px;
    transition: all 0.5s;
    overflow-y: auto;
    border-radius: 8px;
    box-shadow: 0 1px 4px #ddd;
    background-color: #fff;
    z-index: 100;
    color: #000;
    left: -60px;
    // 历史搜索
    .his-search {
      .hot-title {
        color: #666;
        margin: 10px auto 10px 10px;
      }
      .his-wrap {
        padding: 0 18px;
        display: flex;
        flex-wrap: wrap;
        .his-item {
          margin: 0 10px 10px 0;
          height: 26px;
        }
      }
    }
    // 热搜榜
    .hot-search {
      .hot-title {
        color: #666;
        margin: 10px auto 10px 10px;
      }
      .hot-item {
        height: 50px;
        display: flex;
        align-items: center;
        .item-index {
          color: #c2c2c2;
          width: 40px;
          text-align: center;
        }
      }
      .top-item {
        .item-index {
          color: #e13e3e;
        }
      }
    }
  }
}
</style>