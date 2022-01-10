<template>
  <el-skeleton :rows="6" animated :loading="loading">
    <el-table :data="tracks" style="width: 100%" stripe @row-click="getOneSong">
      <el-table-column
        type="index"
        label=""
        width="50"
        style="color: rgb(195, 195, 219)"
      >
      </el-table-column>
      <el-table-column prop="tag" label="" width="30">
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
      <el-table-column prop="name" label="音乐标题" show-overflow-tooltip>
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
          <span style="color: #969697" v-if="scope.row.alia.length !== 0"
            >({{ scope.row.alia[0] }})</span
          >
          <span
            class="vip-tag"
            style="color: rgb(236, 73, 73); border-color: rgb(236, 73, 73)"
            v-if="scope.row.mv !== 0"
            >MV<i class="el-icon-caret-right"></i
          ></span>
          <span class="vip-tag" v-if="scope.row.fee == 1">VIP</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="ar[0].name"
        label="歌手"
        width="80"
        show-overflow-tooltip
      >
      </el-table-column>
    </el-table>
  </el-skeleton>
</template>

<script>

import { getLikeIdList, likeMusic } from '@/api/DiscoverMusic/PersonalRecom'
// import { getMusicUrl } from '@/api/musicPlay/getSong.js'
// import { mapActions } from 'vuex'

export default {
  props: ['list', "updatedList"],
  data() {
    return {
      /* 喜欢的音乐列表 */
      likeIdList: [],
      tracks: [],
      loading: true,
      songId: [],
      isListenId: 0,
      songMsg: {}
    }
  },
  computed: {
    uid() {
      return this.$store.state.login.profile.userId
    }
  },
  created() {
    // console.log(this.uid)
    this.getLikeIdList(this.uid)
    this.list.tracks.forEach(track => {
      this.songId.push(track.id)
    })
    this.init()
  },
  methods: {
    async init() {
      await this.getLikeIdList(this.uid)
      this.list.tracks.forEach(track => {
        this.songId.push(track.id)
      })
      const arr = JSON.parse(JSON.stringify(this.list.tracks))
      arr.forEach(item => {
        this.$set(item, "isLiked", this.isLiked(item.id))
        this.tracks.push(item)
      })
    },
    // 点击歌曲所在行数获得该歌曲 播放地址
    // 当正在播放的歌曲的id等于想要听歌的id 则无法再点 
    getOneSong(row) {
      if (this.isListenId !== row.id) {
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
    // 并且如果是暂停状态则恢复播放
    // 播放状态则没用
    async getLikeIdList(uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
      this.loading = false
    },
    isLiked(id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    async likeMusic(item) {
      item.isLiked = !item.isLiked
      await likeMusic(item.id, item.isLiked)
      this.getLikeIdList(this.uid)
      this.updatedList()
    }
  }
}
</script>

<style lang="scss">
.vip-tag {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #fe672e;
  border-radius: 2px;
  color: #fe672e;
  margin-left: 10px;
  height: 16px;
  padding: 0 2px;
  line-height: 1;
  font-family: "Avenir";
}
</style>