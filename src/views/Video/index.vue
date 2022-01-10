<template>
  <div class="Video">
    <!-- <el-skeleton :rows="6" animated :loading="eleLoading"> -->
    <template v-if="!eleLoading">
      <div class="chooseType">
        <van-tabs v-model="activeTop">
          <van-tab title="视频">
            <div class="Video-top">
              <div class="sheetdetail">
                <button ref="clickbutton">
                  {{ msg }}
                  <i class="iconfont icon icon-youjiantou1"></i>
                </button>
                <van-tabs v-model="active" @click="onClickTab">
                  <van-tab
                    v-for="(item, index) in hotcat"
                    :title="item.name"
                    :key="index"
                  ></van-tab>
                </van-tabs>
                <!-- <div class="totallist" v-show="isShow">
                <p>全部歌单</p>
                <dl
                  class="listdl"
                  v-for="(item, index) in categories"
                  :key="index"
                >
                  <dt class="listtitle">
                    <i :class="['icon', 'iconfont', `${iconarr[index]}`]"></i>
                    {{ item }}
                  </dt>
                  <div style="display: flex">
                    <dd v-for="(item2, index2) in catesub[index]" :key="index2">
                      <span
                        :class="{ borderCir: item2.activity }"
                        @click="clickChange(item2)"
                        >{{ item2.name }}</span
                      >
                    </dd>
                  </div>
                </dl>
              </div> -->
              </div>
            </div>
            <div class="vdDetail">
              <van-list
                v-model="loading"
                :finished="finished"
                :finished-text="finishedText"
                @load="onLoad"
                class="vdDetailList"
              >
                <ul>
                  <li
                    v-for="(video, index) in videoAll"
                    :key="index"
                    @click="goDetail(video.data.vid)"
                  >
                    <!-- 数据在video.data -->
                    <div class="vd">
                      <img :src="video.data.coverUrl" alt="" />
                      <p>{{ video.data.title }}</p>
                      <span>{{ "by" + video.data.creator.nickname }}</span>
                    </div>
                  </li>
                </ul></van-list
              >
            </div>
          </van-tab>
          <van-tab title="MV"></van-tab>
        </van-tabs>
      </div>
    </template>
    <!-- </el-skeleton> -->
  </div>
</template>

<script>
// 视频
import { getVideoHotTag, getAllVideo } from '@/api/Video'
export default {
  name: "Video",
  data() {
    return {
      activeTop: 0,
      active: 0,
      msg: "全部视频",
      hotcat: [{ name: '' }],
      videoAll: [],
      eleLoading: true,
      loading: false,
      finishedText: '没有更多了',
      offset: 0,
      finished: false,
      check: true
    }
  },
  methods: {
    goDetail(id) {
      this.$router.push("/videodetail/v/" + id)
    },
    onLoad() {
      setTimeout(() => {
        this.getAllVideo(this.offset)
      }, 2000)
    },
    onClickTab(name, title) {
      this.msg = title
    },
    async getAllVideo() {
      this.offset += 10
      const res = await getAllVideo()
      this.videoAll = this.videoAll.concat(res.data.datas)
      this.eleLoading = false
    }
  },
  created() {
    this.getAllVideo()
  },
  mounted() {
    getVideoHotTag().then((res) => {
      this.hotcat = res.data.data
    })
  }
}
</script>

<style lang="scss" scoped>
.Video {
  .Video-top {
    box-sizing: border-box;
    padding: 0;
    .sheetdetail {
      // display: flex;
      // overflow: hidden;
      margin-bottom: 10px;
      button {
        position: relative;
        z-index: 200;
        float: left;
        width: 122px;
        text-align: center;
        border-radius: 30px;
        margin-top: 8px;
        height: 36px;
        border: none;
      }
    }
  }
  .vdDetail {
    box-sizing: border-box;
    padding-left: 10px;
    padding-right: 10px;
    ul {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      li {
        width: 45%;
        div {
          img {
            width: 100%;
          }
        }
        p {
          margin: 0;
          padding: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        span {
          color: #e0e0e0;
        }
      }
    }
  }
}
</style>