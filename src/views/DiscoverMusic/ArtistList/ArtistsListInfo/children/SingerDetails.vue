<template>
  <div class="introduce">
    <el-skeleton :rows="5" animated :loading="loading">
      <div class="ins">
        <h2>个人简介</h2>
        <p class="selfins">{{ selfDetail }}</p>
        <div v-for="(item, index) in details" :key="index" class="others">
          <h2>{{ item.ti }}</h2>
          <p class="otherp">{{ item.txt }}</p>
        </div>
      </div>
    </el-skeleton>
  </div>
</template>

<script>
import { getArtistDetails } from '@/api/DiscoverMusic/ArtistsListInfo'
export default {
  data () {
    return {
      id: this.$route.params.id,
      details: [],
      selfDetail: [],
      loading: true
    }
  },
  mounted () {
    this.getArtisListInfo(this.id)
  },
  methods: {
    async getArtisListInfo (id) {
      const res = await getArtistDetails(id)
      this.selfDetail = res.data.briefDesc
      this.details = res.data.introduction
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.introduce {
  .ins {
    width: 370px;
    margin: 0 auto;
    h2 {
      font-size: 14px;
    }
    .selfins {
      font-size: 14px;
      color: #676767;
      text-indent: 2em;
      line-height: 2;
    }
    .others {
      h2 {
        font-size: 14px;
      }
      .otherp {
        font-size: 14px;
        color: #676767;
        text-indent: 2em;
        line-height: 2;
      }
    }
  }
}
</style>