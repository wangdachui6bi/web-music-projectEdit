<template>
  <!-- 歌单详情 -->
  <div class="view">
    <el-skeleton :rows="6" animated :loading="loading">
      <div class="albumdetail">
        <!-- 歌单图片及信息 -->
        <div class="detail-desc">
          <!-- 歌单图片 -->
          <div class="detail-img-wrapper">
            <img class="img img-radius-8 img-border" :src="albList.picUrl" />
          </div>
          <!-- 歌单信息 -->
          <div class="detail-desc-info">
            <div class="info-title">
              <div class="tag">专辑</div>
              <span class="titlename">{{ albList.name }}</span>
            </div>
            <!-- 歌手信息 -->
            <!-- <div class="author">
              <div class="author-info">
                <span
                  style="color: rgb(11, 88, 176)"
                  class="mleft-12 font-12 pointer"
                  >歌手 :
                </span>
                <span class="mleft-12 font-12" style="color: #2c3e50"></span>
              </div>
            </div> -->
            <!-- 按钮 -->
            <ul class="info-btn">
              <button class="btn btn-red" @click="playListSongs">
                <i class="el-icon-caret-right"></i>
              </button>
              <button class="btn btn-white">
                <i class="el-icon-folder-checked"></i>
              </button>
              <button class="btn btn-white">
                <i class="el-icon-share"></i>
              </button>
            </ul>
            <!-- 标签 -->
            <div class="detail-tag">
              <span>歌手 : </span>
              <span style="margin: 10px; font-size: 14px; color: #3771dd">{{
                albList.artist.name
              }}</span>
            </div>
            <!-- 播放数量歌曲数量 -->
            <div class="num-info">
              <span>时间 :</span>
              <span>{{ albList.publishTime | datefilter }} </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 列表头 -->
      <div class="detail-head">
        <van-tabs v-model="active">
          <van-tab title="歌曲列表"><AlbumList :list="songs" /></van-tab>
          <van-tab title="评论"><AlbumComment :list="albList" /></van-tab>
          <van-tab title="专辑详情">
            <div style="font-weight: 700">专辑介绍</div>
            <div class="my-pre">
              <p v-html="albList.description"></p>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </el-skeleton>
  </div>
</template>
<script>
import { getAlbumDetail } from '@/api/DiscoverMusic/AlbumDetail'
import AlbumList from '@/components/list/AlbumList'
import AlbumComment from '@/components/comment/AlbumComment'
import moment from 'moment'
export default {
  name: 'AlbumListDetail',
  props: {
    id: {
      type: String,
      required: true
    }
  },
  components: {
    AlbumList,
    AlbumComment
  },
  data() {
    return {
      active: 0,
      loading: true,
      albList: {
        artist: {},
        info: {}
      },
      songs: [],
      isListenId: 0,
      songMsg: {},
      listSongMsg: []
    }
  },
  created() {
    this.getAlbumDetail(this.id)
    // this.getPlayListDetail()
  },
  methods: {
    // 将该歌单里的的所有歌曲信息添加到vuex 相应数据并且把
    // 播放的歌曲 singleSongMsg设置为该歌单第一首歌
    // 而且对第一首歌进行MP3url请求
    playListSongs() {
      // 把该歌单歌曲数据提交到后面 并进行第一首歌播放
      this.$store.commit("songDetail/setSongList", this.listSongMsg)
      // 获取第一首歌MP3url
      this.$store.dispatch('songDetail/getoneMusic', this.listSongMsg[0])
    },
    async getAlbumDetail(id) {
      const res = await getAlbumDetail(id)
      // console.log(res.data.songs)
      this.albList = res.data.album
      this.songs = res.data.songs
      this.loading = false
      // 将该专辑所有歌曲的信息存到vuex
      this.$store.commit('songDetail/setplayListTracks', this.songs)
      this.songs.forEach((song) => {
        const songDetail = {}
        songDetail.songName = song.name
        songDetail.singer = song.ar[0].name
        songDetail.id = song.id
        songDetail.picUrl = song.al.picUrl
        this.listSongMsg.push(songDetail)
      })
      // console.log(this.songs)
    }
  },
  filters: {
    datefilter(date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>

<style lang="scss">
.view {
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;
}
.albumdetail {
  margin-top: 20px;
}
.pointer {
  cursor: pointer;
}
.mleft-12 {
  margin-left: 12px;
}
.font-12 {
  font-size: 12px;
}
.detail-desc {
  position: relative;
  display: block;
  //  歌单图片
  .detail-img-wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    border-radius: 8px;
    overflow: hidden;
    z-index: -1;
    .img-border {
      box-sizing: border-box;
    }
    .img {
      width: 100%;
      transform: none;
      border: none;
      height: auto;
      max-width: 100%;
    }
    .img-radius-8 {
      border-radius: 8px;
    }
  }
  // 歌单信息
  .detail-desc-info {
    padding-top: 10px;
    position: relative;
    line-height: 24px;
    margin-left: 20px;
    min-height: 240px;
    .tag {
      display: inline-block;
      border: 1px solid #ec4141;
      padding: 0 2px;
      font-size: 14px;
      height: 22px;
      line-height: 22px;
      color: #ec4141;
      border-radius: 2px;
    }
    .titlename {
      font-size: 20px;
      font-weight: 700;
      margin-left: 12px;
    }
    .author {
      margin: 5px 0;
      height: 24px;
      display: flex;
      .author-img {
        height: 24px;
        cursor: pointer;
        .img {
          max-width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .info-btn {
      margin: 5px 0;
      display: flex;
      flex-wrap: wrap;
      .btn {
        margin: 5px;
        border: none;
        outline: none;
        height: 30px;
        padding: 4px 14px;
        border-radius: 15px;
        cursor: pointer;
      }
      .btn-red {
        background-color: #ec4141;
        color: #fff;
      }
      .btn-white {
        border: 1px solid #d8d8d8;
        background-color: #fff;
        color: #373737;
        i {
          color: #999;
        }
      }
    }
    .detail-tag {
      font-size: 14px;
      color: #2c3e50;
    }
    .num-info {
      font-size: 14px;
      color: #2c3e50;
    }
    .intro {
      font-size: 14px;
      color: #2c3e50;
      span {
        // white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }
}
.detail-head {
  .van-tab--active {
    font-size: 20px;
    font-weight: 700;
  }
}
.my-pre {
  text-indent: 2em;
  line-height: 2;
  width: 100%;
  p {
    color: #676767;
  }
}
</style>