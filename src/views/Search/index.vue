<template>
  <div class="Search view-main">
    <div class="search-list mtop-20">
      <div class="font-bold">找到 {{ Count }} 个 {{ typename }} 的搜索结果</div>
      <!-- tab栏切换 -->
      <ul class="search-menu">
        <li
          class="search-menu-item"
          v-for="(type, index) in types"
          :key="index"
          :class="index === active ? 'isActive' : ''"
          @click="search(index, type.name, type.type)"
        >
          {{ type.name }}
        </li>
      </ul>
      <!-- 单曲 -->
      <el-skeleton :rows="6" animated :loading="loading" v-show="type === 1">
        <el-table
          :data="searchRes"
          style="width: 100%"
          stripe
          @row-click="getOneSong"
        >
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="favicon" width="30">
            <i class="iconfont icon-aixin"></i>
          </el-table-column>
          <el-table-column prop="name" label="音乐标题" width="211">
            <template slot-scope="scope">
              <span style="margin-left: 10px" class="nameText">{{
                scope.row.name
              }}</span>
              <div class="vip-tag" v-if="scope.row.fee === 1">VIP</div>
              <div class="vip-tag" v-if="scope.row.mv !== 0">MV</div>
            </template>
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="80">
          </el-table-column>
        </el-table>
      </el-skeleton>
      <!-- 专辑 -->
      <el-skeleton :rows="6" animated :loading="loading" v-show="type === 10">
        <ul class="info-list" v-if="type === 10">
          <template v-if="!loading">
            <li class="info-item" v-for="item in searchRes" :key="item.id">
              <img :src="item.blurPicUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
              <div class="sub-item font-12">
                <span class="mleft-10" style="color: rgb(103, 103, 103)">
                  {{ item.artist.name }}
                </span>
              </div>
            </li>
          </template>
        </ul>
      </el-skeleton>
      <!-- 歌手 -->
      <el-skeleton :rows="6" animated :loading="loading" v-show="type === 100">
        <ul class="info-list" v-if="type === 100">
          <template v-if="!loading">
            <li
              class="info-item"
              v-for="item in searchRes"
              :key="item.id"
              @click="goArtistInfo(item.id)"
            >
              <img :src="item.picUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
            </li>
          </template>
        </ul>
      </el-skeleton>
      <!-- 歌单 -->
      <el-skeleton :rows="6" animated :loading="loading" v-show="type === 1000">
        <ul class="info-list" v-if="type === 1000">
          <template v-if="!loading">
            <li
              class="info-item"
              v-for="item in searchRes"
              :key="item.id"
              @click="goPlayListDetail(item.id)"
            >
              <img :src="item.coverImgUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
              <div class="sub-item font-12">
                <span class="mleft-10" style="color: rgb(103, 103, 103)">
                  {{ item.creator.nickname }}
                </span>
              </div>
            </li>
          </template>
        </ul>
      </el-skeleton>
      <!-- 用户 -->
      <el-skeleton :rows="6" animated :loading="loading" v-show="type === 1002">
        <ul class="info-list" v-if="type === 1002">
          <template v-if="!loading">
            <li class="info-item" v-for="item in searchRes" :key="item.id">
              <img :src="item.avatarUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.nickname }}</div>
            </li>
          </template>
        </ul>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import { searchKeyword } from "@/api/Search"
export default {
  name: "Search",
  props: ["keyword"],
  data() {
    return {
      searchRes: [],
      Count: 0,
      types: [{ name: "单曲", type: 1 }, { name: "专辑", type: 10 }, { name: "歌手", type: 100 }, { name: "歌单", type: 1000 }, { name: "用户", type: 1002 }, { name: "MV", type: 1004 }],
      active: 0,
      loading: true,
      type: 1,
      typename: "单曲",
      isListenId: 0,
      songMsg: {}
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 请求数据
    getOneSong(row) {
      if (this.isListenId !== row.id) {
        console.log(row)
        this.isListenId = row.id
        // 响应式的数据
        const songDetail = {}
        songDetail.songName = row.name
        songDetail.singer = row.ar[0].name
        songDetail.id = row.id
        songDetail.picUrl = row.al.picUrl
        this.songMsg = songDetail
        this.$store.dispatch('songDetail/getoneMusic', songDetail)
        this.$store.commit('songDetail/setplayListTracks', [row])
      }
    },
    async init(keyword = this.keyword, type = 1, offset = 0) {
      this.loading = true
      this.type = type
      const { data: { result } } = await searchKeyword(keyword, type, offset)
      if (type === 1) {
        this.type = type
        this.searchRes = result.songs
        this.Count = result.songCount
      } else if (type === 10) {
        this.searchRes = result.albums
        this.Count = result.albumCount
      } else if (type === 100) {
        this.searchRes = result.artists
        this.Count = result.artistCount
      } else if (type === 1000) {
        this.searchRes = result.playlists
        this.Count = result.playlistCount
      } else if (type === 1002) {
        this.searchRes = result.userprofiles
        this.Count = result.userprofileCount
      }
      this.loading = false
    },
    // 改变搜索的type
    search(index, typename, type) {
      this.active = index
      this.typename = typename
      this.init(this.keyword, type)
    },
    // 去歌单详情页
    goPlayListDetail(id) {
      this.$router.push(`/playlistdetail/${id}`)
    },
    // 去歌手详情页
    goArtistInfo(id) {
      this.$router.push(`/artistdetail/${id}`)
    }
  },
  watch: {
    '$route'(to, from) {
      this.init(this.keyword, this.type)
    }
  }
}
</script>

<style lang="scss" >
.Search {
  .search-menu {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin: 20px 0;
    .search-menu-item {
      width: 40px;
      margin-right: 20px;
      line-height: 1;
      text-align: center;
    }
    .search-menu-item.isActive {
      font-size: 16px;
      font-weight: 700;
    }
    .search-menu-item.isActive:after {
      display: block;
      content: "";
      height: 4px;
      width: 90%;
      margin: 0 auto;
      background-color: #ec4141;
      border-radius: 2px;
    }
  }
  .el-table__row {
    span {
      width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    div {
      // width: 180px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .info-list {
    .info-item {
      display: flex;
      height: 90px;
      align-items: center;
      .sub-img {
        height: 60px;
        width: 60px;
        border-radius: 4px;
      }
      .sub-title {
        min-width: 100px;
        flex: 1;
      }
      .sub-item {
        width: 150px;
        color: #c3c3c4;
      }
    }
    .info-item:nth-child(odd) {
      background-color: #f9f9f9;
    }
  }
}
</style>