<template>
  <el-skeleton :rows="5" animated :loading="loading">
    <div class="mv">
      <div class="mvInfo" v-for="video in videos" :key="video.id">
        <div class="mvImgInfo">
          <img :src="video.imgurl16v9" alt="" />
        </div>
        <p>{{ video.name }}</p>
      </div>
    </div>
  </el-skeleton>
</template>

<script>
import { getArtistMV } from '@/api/DiscoverMusic/ArtistsListInfo'
export default {
  data () {
    return {
      videos: [],
      id: this.$route.params.id,
      loading: true
    }
  },
  mounted () {
    this.getArtisListInfo(this.id)
  },
  methods: {
    async getArtisListInfo (id) {
      const res = await getArtistMV(id)
      this.videos = res.data.mvs
      this.loading = false
    }
  }
}
</script>

<style lang="scss">
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
      img {
        width: 100%;
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