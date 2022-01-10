<template>
  <div class="mv">
    <div class="mvInfo" v-for="video in videos" :key="video.id">
      <div class="mvImgInfo">
        <img :src="video.imgurl16v9" alt=""  @click="turnToPlay(video.id)"/>
        <div class="positionIcon">
          <i class="el-icon-video-play icon1"></i>
          <span class="spn1">{{ video.num }}</span>
          <span>{{video.flag?"万":""}}</span>
        </div>
      </div>
      <p>{{ video.name }}</p>
    </div>
  </div>
</template>

<script>
import { getArtistMV } from '@/api/DiscoverMusic/ArtistsListInfo'
export default {
  data() {
    return {
      videos: [],
      id: this.$route.params.id
    }
  },
  mounted() {
    this.getArtisListInfo(this.id)
  },
  methods: {
    async getArtisListInfo(id) {
      const res = await getArtistMV(id)
      const list = res.data.mvs
      list.forEach((item) => {
        if (item.playCount > 10000) {
          item.num = parseInt(item.playCount / 10000)
          item.flag = true
        } else {
          item.num = item.playCount
           item.flag = false
        }
      })
      this.videos = list
    },
    turnToPlay(id){
       this.$router.push(`/videodetail/mv/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.mv {
  * {
    margin: 0;
    padding: 0;
  }
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  .mvInfo {
    width: 177px;
    .mvImgInfo {
      width: 177px;
      position: relative;
      img {
        width: 100%;
      }
      .positionIcon {
        position: absolute;
        top: 2px;
        right: 2px;
        color: white;
        font-size: 12px;
        text-align: center;
        .icon1 {
          font-size: 16px;
          float: left;
        }
        .spn1 {
          margin-left: 2px;
        }
      }
    }
    p {
      overflow: hidden;
      word-break: keep-all;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
}
</style>