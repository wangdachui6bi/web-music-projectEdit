<template>
  <div class="artistListInfo">
    <div class="artistInfo">
      <div class="img-wrap">
        <img :src="singerDetails.cover" alt="" />
      </div>
      <p class="pname">
        <span>{{ singerDetails.name }}</span>
        <button>收藏</button>
      </p>
      <p class="pNumber">
        <span>单曲数:{{ singerDetails.albumSize }}</span>
        <span>专辑数:{{ singerDetails.albumSize }}</span>
        <span>MV数:{{ singerDetails.mvSize }}</span>
      </p>
    </div>

    <van-tabs v-model="active">
      <van-tab title="专辑">
        <Album />
      </van-tab>
      <van-tab title="MV">
        <Mv></Mv>
      </van-tab>
      <van-tab title="歌手详情">
        <Singerdetails></Singerdetails>
      </van-tab>
      <van-tab title="相似歌手">
        <Similar></Similar>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { artistListInfo } from '@/api/DiscoverMusic/ArtistsListInfo'
import Album from './children/Album.vue'
import Mv from './children/mv.vue'
import Similar from './children/SimilarSinger.vue'
import Singerdetails from './children/SingerDetails.vue'

export default {
  props: ['id'],
  components: {
    Album,
    Mv,
    Similar,
    Singerdetails
  },
  data() {
    return {
      singerDetails: [],
      active: 2
    }
  },
  mounted() {
    this.getArtisListInfo(this.id)
  },
  methods: {
    async getArtisListInfo(id) {
      const res = await artistListInfo(id)
      this.singerDetails = res.data.data.artist
    }
  }
}
</script>

<style lang="scss" scoped>
.artistListInfo {
  * {
    margin: 0;
    padding: 0;
  }
  color: #2c3e50;
  margin-top: 20px;
  .artistInfo {
    .img-wrap {
      width: 302px;
      height: 248px;
      margin: 0 auto;
      img {
        width: 100%;
        border-radius: 8px;
        border: 1px solid #ddd;
      }
    }
    .pname {
      padding-left: 25px;
      height: 50px;
      span {
        display: inline-block;
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        font-weight: 700;
        color: #2c3e50;
      }
      button {
        border: 1px solid #d8d8d8;
        background-color: #fff;
        color: #373737;
        outline: none;
        height: 30px;
        padding: 4px 18px;
        border-radius: 15px;
        cursor: pointer;
        margin-left: 10px;
        font-size: 13px;
        box-sizing: border-box;
      }
    }
    .pNumber {
      padding-left: 25px;
      height: 50px;
      line-height: 50px;
      span {
        font-size: 14px;
        margin-right: 20px;
      }
    }
  }
  .van-tabs__wrap {
    .van-tab--active {
      font-size: 18px !important;
    }
  }
}
</style>