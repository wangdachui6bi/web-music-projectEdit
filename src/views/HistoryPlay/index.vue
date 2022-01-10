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
    <el-table
      :data="tableData"
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
          <span style="margin-left: 10px">{{ scope.row.name }}</span>
          <div class="vip-tag" v-if="scope.row.fee === 1">VIP</div>
          <div class="vip-tag" v-if="scope.row.mv !== 0">MV</div>
        </template>
      </el-table-column>
      <el-table-column prop="ar[0].name" label="歌手" width="80">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 最近播放
export default {
  name: "HistoryPlay",
  data() {
    return {
      count: 0,
      tableData: [],
      hislistSongMsg: [],
      isListenId: -1
    }
  },

  methods: {
    getOneSong(row) {
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
    changHistoryList() {
      const hisAll = JSON.parse(localStorage.historyplayList || '[]')
      hisAll.forEach(item => {
        const songDetail = {}
        songDetail.songName = item.name
        songDetail.singer = item.ar[0].name
        songDetail.id = item.id
        songDetail.picUrl = item.al.picUrl
        this.hislistSongMsg.push(songDetail)
      })
    },
    playHistorySong() {
      // 将该歌单里的的所有歌曲信息添加到vuex 相应数据并且把
      // 播放的歌曲 singleSongMsg设置为该歌单第一首歌
      // 而且对第一首歌进行MP3url请求
      this.$store.commit("songDetail/setSongList", this.hislistSongMsg)
      this.$store.dispatch('songDetail/getoneMusic', this.hislistSongMsg[0])
    }
  },
  created() {
    // 获取存储在本地的最近播放的列表
    this.tableData = JSON.parse(localStorage.getItem("historyplayList") || "[]")
    this.count = this.tableData.length
    // 将本地localhitorylist数据进行截取
    this.changHistoryList()
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