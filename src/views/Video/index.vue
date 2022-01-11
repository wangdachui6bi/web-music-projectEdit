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
                <div class="totallist"></div>
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
                      <!-- <span>{{ "by" + video.data.creator.nickname }}</span> -->
                    </div>
                  </li>
                </ul>
              </van-list>
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
// getVideoByTag
import { getVideoHotTag, getAllVideo, getVideoAlltag, getVideoByTag } from '@/api/Video'
export default {
  name: "Video",
  data () {
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
      check: true,
      allTag: [],
      tabShow: false
    }
  },
  methods: {
    goDetail (id) {
      this.$router.push("/videodetail/v/" + id)
    },
    onLoad () {
      setTimeout(() => {
        this.getAllVideo(this.offset)
      }, 2000)
    },
    // getVideoByTag
    async onClickTab (name, title) {
      this.msg = title
      const catId = this.hotcat.find((item) => item.name === title)
      const res = await getVideoByTag(catId.id, 0)
      this.videoAll = res.data.datas
    },
    async getAllVideo () {
      // 把这个设置成true再设置成false模板会在请求返回结果才重新解析
      this.eleLoading = true
      this.offset += 10
      const res = await getAllVideo(this.offset)
      this.videoAll = this.videoAll.concat(res.data.datas)
      const allTag = await getVideoAlltag()
      this.allTag = allTag.data.data
      this.eleLoading = false
    }
  },
  created () {
    this.getAllVideo()
  },
  mounted () {
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
      position: relative;
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
        .totallist {
          position: absolute;
        }
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
        margin-bottom: 14px;
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