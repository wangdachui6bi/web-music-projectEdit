<template>
  <!-- 歌单详情 -->
  <div class="play-list-detail">
    <!-- 歌单图片及信息 -->
    <div class="detail-desc">
      <!-- 歌单图片 -->
      <div class="detail-img-wrapper">
        <img class="img img-radius-8 img-border" :src="playlist.coverImgUrl" />
      </div>
      <!-- 歌单信息 -->
      <div class="detail-desc-info">
        <div class="info-title">
          <div class="tag">歌单</div>
          <span class="titlename">{{ playlist.name }}</span>
        </div>
        <!-- 作者信息 -->
        <div class="author">
          <div class="author-img">
            <img :src="playlist.creator.avatarUrl" class="img" />
          </div>
          <div class="author-info">
            <span
              style="color: rgb(11, 88, 176)"
              class="mleft-12 font-12 pointer"
              >{{ playlist.creator.nickname }}</span
            >
            <span class="mleft-12 font-12" style="color: #2c3e50">{{
              playlist.createTime | datefilter
            }}</span>
          </div>
        </div>
        <!-- 按钮 -->
        <ul class="info-btn">
          <button class="btn btn-red">
            <i class="el-icon-caret-right"></i>
          </button>
          <button class="btn btn-white">
            <i class="el-icon-folder-checked"></i>
          </button>
          <button class="btn btn-white">
            <i class="el-icon-share"></i>
          </button>
          <button class="btn btn-red">
            <i class="el-icon-hot-water"></i>
          </button>
        </ul>
        <!-- 标签 -->
        <div class="detail-tag">
          <span>标签 : </span>
          <span style="margin: 10px; font-size: 14px">{{
            playlist.tags[0]
          }}</span>
        </div>
        <!-- 播放数量歌曲数量 -->
        <div class="num-info">
          <span>歌曲 : {{ playlist.trackCount }}</span>
          <span>播放 : {{ playlist.playCount | countFormat }}</span>
        </div>
        <!-- 简介 -->
        <div class="intro">
          <p style="max-width: 1000px; padding-bottom: 10px">
            简介：{{ playlist.description }}
          </p>
        </div>
      </div>
    </div>
    <!-- 列表头 -->
    <div class="detail-head">
      <van-tabs v-model="active">
        <van-tab title="歌曲列表"><MusicList :list="playlist" /></van-tab>
        <van-tab title="评论"><Comment :list="playlist" /></van-tab>
        <van-tab title="收藏者">收藏者</van-tab>
      </van-tabs>
    </div>
    <!-- 列表内容 -->
    <div></div>
  </div>
</template>

<script>
import { getPlayListDetail } from '@/api/DiscoverMusic/PersonalRecom'
import MusicList from '@/components/list/MusicList'
import Comment from '@/components/comment/Comment'
import moment from 'moment'
export default {
  name: "PlayListDetail",
  components: {
    MusicList,
    Comment
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      playlist: {},
      active: 0
    }
  },
  created () {
    this.getPlayListDetail(this.id)
  },
  methods: {
    async getPlayListDetail (id) {
      const res = await getPlayListDetail(id)
      this.playlist = res.data.playlist
    }
  },
  filters: {
    datefilter (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    countFormat (count) {
      if (typeof count === 'undefined') return 0
      if (count < 10000) return count
      else return Math.floor(count / 10000) + '万'
    }
  }
}
</script>

<style lang="scss">
.play-list-detail {
  width: 90%;
  margin: 0 auto;
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
    }
  }
}
.detail-head {
  .van-tab--active {
    font-size: 20px;
    font-weight: 700;
  }
}
</style>