<template>
  <div class="ArtistsList">
    <p><button @click="isShow = !isShow">打开列表</button></p>
    <div class="tag-wrapper" v-show="isShow">
      <div class="languages">
        <span class="lang">语种:</span>
        <div class="el-radio-group">
          <div class="el-radio" @click="allLang">全部</div>
          <div
            class="el-radio"
            v-for="country in countries"
            :key="country.id1"
            @click="countryId(country.id1)"
          >
            {{ country.name }}
          </div>
        </div>
      </div>
      <div class="languages">
        <span class="sort">分类:</span>
        <div class="el-radio-group">
          <div class="el-radio" @click="allsort">全部</div>
          <div
            class="el-radio"
            v-for="sort in sorts"
            :key="sort.id"
            @click="sortId(sort.id)"
          >
            {{ sort.name }}
          </div>
        </div>
      </div>
      <div class="languages">
        <span class="choice">筛选:</span>
        <div class="el-radio-group">
          <div class="el-radio" @click="filterAll">全部</div>
          <div
            class="el-radio"
            v-for="(item, index) in alphabet"
            :key="index"
            @click="zmId(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
    </div>

    <!-- 歌手图片 -->
    <div class="imgList">
      <div class="imgListInfo" v-for="msg in message" :key="msg.id">
        <img :src="msg.img1v1Url" @click="toArtisInfo(msg.id)" />
        <p>{{ msg.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { artistList } from '@/api/DiscoverMusic/ArtistList'
export default {
  name: "ArtistsList",
  data () {
    return {
      message: [],
      allid: -1,
      saveSortId: -1,// 保存分类id
      saveCountryId: -1,// 保存语种id
      saveZmId: -1,// 保存筛选的id
      sorts: [
        {
          id: 1,
          name: '男歌手'
        },
        {
          id: 2,
          name: '女歌手'
        },
        {
          id: 3,
          name: '乐队'
        }
      ],
      countries: [
        {
          id1: 7,
          name: '华语'
        },
        {
          id1: 96,
          name: '欧美'
        },
        {
          id1: 8,
          name: '日本'
        },
        {
          id1: 16,
          name: '韩国'
        },
        {
          id1: 0,
          name: '其他'
        }
      ],
      isShow: false,
      alphabet: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'G', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '#']
    }
  },
  mounted () {
    this.getArtisList()
  },
  methods: {
    async getArtisList (type, area, initial) {
      const res = await artistList({ type: this.saveSortId, area: this.saveCountryId, initial: this.saveZmId })
      this.message = res.data.artists
    },
    sortId (id) {
      this.saveSortId = id
      this.getArtisList()
    },
    countryId (id) {
      this.saveCountryId = id
      this.getArtisList()
    },
    zmId (id) {
      this.saveZmId = id
      this.getArtisList()
    },
    allLang () {
      this.saveCountryId = -1
      this.getArtisList()
    },
    allsort () {
      this.saveSortId = -1
      this.getArtisList()
    },
    filterAll () {
      this.saveZmId = -1
      this.getArtisList()
    },
    toArtisInfo (id) {
      console.log(id)
    }
  }
}
</script>

<style lang="scss" scoped>
.ArtistsList {
  width: 90%;
  margin: 0 auto;
  font-size: 14px;
  color: #2c3e50;
  .tag-wrapper {
    .languages {
      display: flex;
      margin-top: 10px;
      box-sizing: border-box;
      .lang {
        width: 80px;
        height: 30px;
        line-height: 30px;
        margin-right: 40px;
      }
      .el-radio-group {
        display: flex;
        flex-wrap: wrap;
        .el-radio {
          width: 60px;
          height: 30px;
          line-height: 30px;
          margin-right: 43px;
        }
      }
      .sort {
        width: 70px;
        height: 30px;
        line-height: 30px;
        margin-right: 29px;
      }
      .choice {
        width: 574px;
        height: 30px;
        line-height: 30px;
        margin-right: 23px;
        display: block;
      }
    }
  }
  .imgList {
    display: flex;
    flex-wrap: wrap;
    .imgListInfo {
      width: 107px;
      height: 146px;
      margin-right: 5px;
      img {
        width: 100%;
        border-radius: 5px;
        padding: 0;
        margin: 0;
      }
      p {
        font-size: 14px;
        color: #2c3e50;
        text-align: center;
        margin: 0;
      }
    }
  }
}
</style>