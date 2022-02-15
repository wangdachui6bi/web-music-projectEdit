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
      <el-skeleton :rows="6" animated :loading="loading">
        <!-- 单曲 -->
        <template v-if="!loading && type === 1">
          <el-table
            :data="searchRes"
            style="width: 100%"
            stripe
            @row-click="getOneSong"
          >
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="favicon" width="30">
              <template slot-scope="scope">
                <span @click="likeMusic(scope.row)">
                  <div style="width: 38px">
                    <i
                      v-if="scope.row.isLiked"
                      style="color: red"
                      class="iconfont icon-aixin1"
                    ></i>
                    <i v-else class="iconfont icon-aixin"></i>
                  </div>
                </span>
              </template>
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
        </template>
        <!-- 专辑 -->
        <template v-if="!loading && type === 10">
          <ul class="info-list">
            <li class="info-item" v-for="item in searchRes" :key="item.id">
              <img :src="item.blurPicUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
              <div class="sub-item font-12">
                <span class="mleft-10" style="color: rgb(103, 103, 103)">
                  {{ item.artist.name }}
                </span>
              </div>
            </li>
          </ul>
        </template>
        <!-- 歌手 -->
        <template v-if="!loading && type === 100">
          <ul class="info-list">
            <li
              class="info-item"
              v-for="item in searchRes"
              :key="item.id"
              @click="goArtistInfo(item.id)"
            >
              <img :src="item.picUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">{{ item.name }}</div>
            </li>
          </ul>
        </template>
        <!-- 歌单 -->
        <template v-if="!loading && type === 1000">
          <ul class="info-list">
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
          </ul>
        </template>
        <!-- 用户 -->
        <template v-if="!loading && type === 1002">
          <ul class="info-list">
            <li class="info-item" v-for="item in searchRes" :key="item.id">
              <img :src="item.avatarUrl" class="sub-img mleft-10" alt="" />
              <div class="sub-title font-14 mleft-10">
                {{ item.nickname }}
              </div>
            </li>
          </ul>
        </template>
        <!-- Mv -->
        <template v-if="!loading && type === 1004">
          <div class="vdDetail">
            <ul>
              <li
                v-for="(video, index) in searchRes"
                :key="index"
                @click="goMvDetail(video.id)"
              >
                <!-- 数据在video.data -->
                <div class="vd">
                  <img :src="video.cover" alt="" />
                  <p>{{ video.name }}</p>
                  <span>{{ "by" + video.artists[0].name }}</span>
                </div>
              </li>
            </ul>
          </div>
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import { searchKeyword } from "@/api/Search"
import { getLikeIdList, likeMusic } from '@/api/DiscoverMusic/PersonalRecom'
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
      songMsg: {},
      likeIdList: []
    }
  },
  created() {
    this.init()
  },
  updated() {
    console.log(this.searchRes)
  },
  computed: {
    uid() {
      return this.$store.state.login.profile.userId
    }
  },
  methods: {
    // 请求数据
    getOneSong(row) {
      if (this.isListenId !== row.id) {
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
      this.type = type
      const { data: { result } } = await searchKeyword(keyword, type, offset)
      await this.getLikeIdList(this.uid)
      if (type === 1) {
        this.type = type
        this.Count = result.songCount
        this.searchRes = []
        result.songs.forEach((item) => {
          this.$set(item, "isLiked", this.isLiked(item.id))
          this.searchRes.push(item)
          // this.searchRes = item
        })
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
      } else if (type === 1004) {
        this.searchRes = result.mvs
        this.Count = result.mvCount
        console.log(this.searchRes)
      }
      this.loading = false
    },
    goMvDetail(id) {
      this.$router.push("/videodetail/mv/" + id)
    },
    // 改变搜索的type
    search(index, typename, type) {
      this.loading = true
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
    },
    async getLikeIdList(uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
    },
    // 判断当前是否喜欢
    isLiked(id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    // 点击喜欢
    async likeMusic(item) {
      item.isLiked = !item.isLiked
      await likeMusic(item.id, item.isLiked)
      this.init(this.keyword, this.type)
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
  .vdDetail {
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
          }
        }
        p {
          margin: 0;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          color: #e0e0e0;
        }
      }
    }
  }
}
</style>