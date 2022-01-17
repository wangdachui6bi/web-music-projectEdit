<template>
  <div class="HistoryPlay view-main mtop-20">
    <div class="info">
      <div>
        <span class="font-24 font-bold">最近播放</span>
        <span class="font-14 mleft-10">共 {{ count }} 首</span>
      </div>
      <div class="btn-wrap">
        <button class="no-btn">清除列表</button>
      </div>
    </div>
    <div class="btn-wrap mtop-10">
      <button class="btn btn-red" @click="playHistorySong">
        <i class="iconfont icon-bofang"></i>
        播放全部
      </button>
    </div>
    <div class="div-line mtop-20"></div>
    <el-skeleton :rows="6" animated :loading="loading">
      <template v-if="!loading">
        <el-table :data="hislistSongMsg" style="width: 100%" stripe @row-click="getOneSong">
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="favicon" width="30">
            <template slot-scope="scope">
              <span @click="likeMusic(scope.row)">
                <div>
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
          <el-table-column prop="songName" label="音乐标题" width="211">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.songName }}</span>
              <div class="vip-tag" v-if="scope.row.fee === 1">VIP</div>
              <div
                class="vip-tag"
                v-if="scope.row.mv !== 0"
                @click="$router.push(`/videodetail/mv/${scope.row.mv}`)"
              >
                MV
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="singer" label="歌手" width="80">
          </el-table-column>
        </el-table>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { getLikeIdList, likeMusic } from '@/api/DiscoverMusic/PersonalRecom'
// 最近播放
export default {
  name: "HistoryPlay",
  data () {
    return {
      count: 0,
      tableData: [],
      hislistSongMsg: [],
      isListenId: -1,
      likeIdList: [],
      loading: true
    }
  },

  methods: {
    getOneSong (row) {
      if (this.isListenId !== row.id) {
        // console.log(row)
        this.$store.commit('songDetail/songAllMsg', row)
        this.isListenId = row.id
        // 响应式的数据
        const songDetail = {}
        songDetail.songName = row.name
        songDetail.singer = row.ar[0].name
        songDetail.id = row.id
        songDetail.picUrl = row.al.picUrl
        this.songMsg = songDetail
        this.$store.dispatch('songDetail/getoneMusic', songDetail)
        // this.$store.commit('songDetail/setplayListTracks', row)
      } else {
        if (!this.$store.state.songDetail.isPlay) {
          this.$store.commit("songDetail/playback")
        }
      }
    },
    async changHistoryList () {
      this.loading = true
      // 获取存储在本地的最近播放的列表
      this.hislistSongMsg = []
      const hisAll = JSON.parse(localStorage.historyplayList || '[]')
      this.count = hisAll.length
      await this.getLikeIdList(this.uid)
      hisAll.forEach((item) => {
        const songDetail = {}
        songDetail.songName = item.name
        songDetail.mv = item.mv
        songDetail.fee = item.fee
        songDetail.singer = item.ar[0].name
        songDetail.id = item.id
        songDetail.picUrl = item.al.picUrl
        songDetail.isLiked = this.isLiked(item.id)
        this.hislistSongMsg.push(songDetail)
      })
      this.loading = false
    },
    playHistorySong () {
      // 将该歌单里的的所有歌曲信息添加到vuex 相应数据并且把
      // 播放的歌曲 singleSongMsg设置为该歌单第一首歌
      // 而且对第一首歌进行MP3url请求
      if (this.hislistSongMsg.length === 0) return
      this.$store.commit("songDetail/setSongList", this.hislistSongMsg)
      this.$store.dispatch('songDetail/getoneMusic', this.hislistSongMsg[0])
    },
    async getLikeIdList (uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
    },
    isLiked (id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    async likeMusic (item) {
      item.isLiked = !item.isLiked
      await likeMusic(item.id, item.isLiked)
    }
  },
  created () {
    // 将本地localhitorylist数据进行截取
    this.changHistoryList()
  },
  computed: {
    uid () {
      return this.$store.state.login.profile.userId
    }
  }
}
</script>

<style lang="scss" >
.HistoryPlay {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-table__cell {
    div.cell {
      white-space: nowrap;
    }
  }
}
</style>