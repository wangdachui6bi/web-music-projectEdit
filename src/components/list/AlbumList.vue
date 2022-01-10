<template>
  <el-skeleton :rows="6" animated :loading="loading">
    <el-table :data="list" style="width: 100%" stripe @row-click="getOneSong">
      <el-table-column
        type="index"
        label=""
        width="50"
        style="color: rgb(195, 195, 219)"
      >
      </el-table-column>
      <el-table-column prop="tag" label="" width="30">
        <template slot-scope="scope">
          <span @click="likeMusic(scope.row.id)">
            <div>
              <i v-if="!isLiked(scope.row.id)" class="iconfont icon-aixin"></i>
              <i v-else style="color: red" class="iconfont icon-aixin1"></i>
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
export default {
  props: ['list'],
  data() {
    return {
      likeIdList: [],
      loading: true
    }
  },
  computed: {
    uid() {
      return this.$store.state.login.profile.userId
    }
  },
  created() {
    this.getLikeIdList(this.uid)
  },
  methods: {
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
    async getLikeIdList(uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
      this.loading = false
      // console.log(res)
    },
    isLiked(id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    async likeMusic(id) {
      this.getLikeIdList(this.uid)
      const liked = this.isLiked(id)
      likeMusic(id, !liked)
      // if (res.code !== 200) return
      // Toast(`${liked ? '取消喜欢' : '喜欢'}成功`)
      this.getLikeIdList(this.uid)
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