<template>
  <div class="similarSinger">
    <div class="similarInfo" v-for="(artist) in similarArtist" :key="artist.id">
      <div class="imgInfo">
        <img :src="artist.picUrl" alt="">
      </div>
      <p>{{artist.name}}</p>
    </div>

  </div>
</template>

<script>
import { getSimilar } from '@/api/DiscoverMusic/ArtistsListInfo'
export default {
  data() {
    return {
      id: this.$route.params.id,
      similarArtist:[]
    }
  },
  mounted() {
    this.getSimilarInfo(this.id)
  },
  methods: {
    async getSimilarInfo(id) {
      const res = await getSimilar(id)
      const list = res.data.artists
      list.push({
        picUrl:'',
        name:''
      })
      this.similarArtist = list
    }
  }
}
</script>

<style lang="scss" scoped>
.similarSinger{
  *{
    margin: 0;padding: 0;
  }
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-around;
  .similarInfo{
    width: 118px;
    margin-top: 20px;
    .imgInfo{
      width: 118px;
      img{
        border-radius: 8px;
        width: 100%;
        box-sizing: border-box;
      }
    }
  }
}
</style>