<template>
  <div class="personal-recom">
    <div class="swiper-wrapper">
      <el-carousel :interval="4000" type="card" height="80px">
        <el-carousel-item v-for="item in imgList" :key="item.imageUrl">
          <img class="swiper-img" :src="item.imageUrl" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <!-- 未登录状态下的热门推荐 -->
    <div class="play-list" v-if="!isLogin">
      <h2 @click="$router.push('playlist')">
        热门推荐 <i class="iconfont icon-youjiantou1"></i>
      </h2>
      <div class="imglist">
        <ul class="img-list-ul">
          <li v-for="item in recSongList" :key="item.id" class="img-item-li">
            <div class="img-wrap">
              <img
                :src="item.picUrl"
                alt=""
                class="img img-radius-8 img-border"
                @click="getTo('playlistdetail', item.id)"
              />
              <div class="play-btn">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
            <div class="text-hidden">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 登录状态下的推荐歌单 -->
    <div class="play-list" v-else>
      <h2 @click="$router.push('playlist')">
        推荐歌单 <i class="iconfont icon-youjiantou1"></i>
      </h2>
      <div class="imglist">
        <ul class="img-list-ul">
          <li v-for="item in recommendList" :key="item.id" class="img-item-li">
            <div class="img-wrap">
              <img
                :src="item.picUrl"
                alt=""
                class="img img-radius-8 img-border"
                @click="getTo('playlistdetail', item.id)"
              />
              <div class="play-btn">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
            <div class="text-hidden">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { getBanner, getPersonalized, getRecommend } from '@/api/DiscoverMusic/PersonalRecom'

export default {
  name: "PersonalRecom",
  computed: {
    isLogin () {
      return this.$store.state.login.isLogin
    }
  },
  data () {
    return {
      imgList: [],
      recSongList: [],
      recommendList: []
    }
  },
  created () {
    console.log(sessionStorage.getItem('isLogin'))
    this.getImgList()
    this.getRecSongList(10)
  },
  watch: {
    isLogin: {
      immediate: true,
      handler () {
        if (this.isLogin) this.getRecommend()
      }
    }
  },
  methods: {
    async getImgList () {
      const res = await getBanner()
      // console.log(res)
      this.imgList = res.data.banners
    },
    // 获取热门推荐歌单 未登录时
    async getRecSongList (limit) {
      // if (this.isLogin) return
      const res = await getPersonalized(limit)
      // console.log(res, limit)
      // if (res.code !== 200) return
      this.recSongList = res.data.result
    },
    async getRecommend () {
      // if (this.isLogin) return
      const res = await getRecommend()
      // if (res.code !== 200) return
      console.log(res)
      this.recommendList = res.data.recommend
    },
    getTo (url, id) {
      this.$router.push(url + '/' + id)
      console.log(id)
    }
  }
}
</script>
<style lang="scss" scoped>
.swiper-img {
  border-radius: 8px;
  height: 100%;
  width: 100%;
}
h2 {
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  margin-left: 12px;
  color: #2c3e50;
  i {
    color: #2c3e50;
  }
}
.img-list-ul {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap;
  .img-item-li {
    margin-bottom: 30px;
    width: 30%;
    margin-right: 1%;
    margin-left: 2%;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
}

//图片区域
.img-wrap {
  position: relative;
  .play-btn {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 5px;
    bottom: 8px;
    color: #ec4141;
    background-color: #fbf7f6;
    border-radius: 50%;
    opacity: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    i {
      font-size: 20px;
    }
  }
  .img-border {
    box-sizing: border-box;
    border: 1px solid #dddddd;
  }
  .img-radius-8 {
    border-radius: 8px;
  }
  .img {
    width: 100%;
    height: auto;
  }
}
.text-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
