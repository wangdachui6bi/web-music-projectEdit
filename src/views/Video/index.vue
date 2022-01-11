<template>
  <div class="Video">
    <el-skeleton :rows="6" animated :loading="eleLoading">
      <template v-if="!eleLoading">
        <div class="chooseType">
          <van-tabs v-model="activeTop">
            <van-tab title="视频">
              <div class="Video-top">
                <div class="sheetdetail">
                  <button ref="clickbutton" @click="tabShow = !tabShow">
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
                  <div class="totallist" v-if="tabShow">
                    <div>
                      <p><span @click="getAllVideo">全部视频</span></p>
                      <ul class="tabAll">
                        <li v-for="(tag, index) in allTag" :key="index">
                          <span
                            :class="{ borderCir: tag.activity }"
                            @click="clickChange(tag)"
                            >{{ tag.name }}</span
                          >
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
              <div class="vdDetail">
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
              </div>
            </van-tab>
            <van-tab title="MV" class="MVdetail">
              <MV :title="type[0]" :getMv="getMvNew"></MV>
              <MV
                :title="type[1]"
                :getMv="getMvWy"
                :isHaveClick="isHaveClick"
              ></MV>
              <MV :title="type[2]" :getMv="getMvTop"></MV>
            </van-tab>
          </van-tabs>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
// 视频
// getVideoByTag
import { getVideoHotTag, getAllVideo, getVideoAlltag, getVideoByTag, getMvNewByArea, getMvWY, getMVTopArea } from '@/api/Video'
import MV from '@/components/MV/mv.vue'
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
      check: true,
      allTag: [],
      tabShow: false,
      isHaveClick: false,
      type: ['最新MV', '网易出品', 'MV排行榜']

    }
  },
  components: {
    MV
  },
  methods: {
    async getMvNew(title = '内地') {
      const { data } = await getMvNewByArea(title)
      return data
    },
    async getMvWy() {
      const { data } = await getMvWY()
      return data
    },
    async getMvTop(title = '内地') {
      const { data } = await getMVTopArea(title)
      return data
    },
    async clickChange(item) {
      // 改变颜色
      // 排他思想 所有的全部变为false
      this.allTag.forEach((tag, index) => {
        tag.activity = false
      })
      item.activity = !item.activity
      this.msg = item.name
      this.tabShow = false
      var data = []
      var offset = 0
      for (var i = 0; i < 2; i++) {
        const res = await getVideoByTag(item.id, offset)
        data = data.concat(res.data.datas)
        offset = offset + 8
      }
      this.videoAll = data
    },
    goDetail(id) {
      this.$router.push("/videodetail/v/" + id)
    },
    onLoad() {
      setTimeout(() => {
        this.getAllVideo(this.offset)
      }, 2000)
    },
    // getVideoByTag
    async onClickTab(name, title) {
      this.msg = title
      const catId = this.hotcat.find((item) => item.name === title)
      var data = []
      var offset = 0
      for (var i = 0; i < 2; i++) {
        const res = await getVideoByTag(catId.id, offset)
        // concat对原数组无影响 会返回结合后的新数组
        data = data.concat(res.data.datas)
        offset += 8
      }
      this.videoAll = data
    },
    async getAllVideo() {
      // 把这个设置成true再设置成false模板会在请求返回结果才重新解析
      this.eleLoading = true
      this.tabShow = false
      const res = await getAllVideo(this.offset)
      this.videoAll = res.data.datas
      this.offset += 8
      if (this.allTag.length !== 0) {
        this.eleLoading = false
        return 0
      }
      const allTag = await getVideoAlltag()
      this.allTag = allTag.data.data
      this.allTag.forEach(tag => {
        tag.activity = false
      })
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
      display: flex;
      overflow: hidden;
      margin-bottom: 10px;
      button {
        position: absolute;
        z-index: 200;
        float: left;
        width: 122px;
        text-align: center;
        border-radius: 30px;
        margin-top: 8px;
        height: 36px;
        border: none;
      }
      .van-tabs {
        margin-left: 120px;
      }
      .totallist {
        margin-top: 40px;
        border-radius: 15px;
        position: absolute;
        padding: 0 20px 0 20px;
        div {
          box-sizing: border-box;
          z-index: 9999;
          box-shadow: 5px -5px 8px 0px rgba(0, 0, 0, 0.2),
            -5px -5px 8px 0px rgba(0, 0, 0, 0.2);
          background-color: #fff;
          overflow: hidden;
          .borderCir {
            color: red;
            background-color: rgba(255, 182, 198, 0.2);
            border-radius: 15px;
          }
          p {
            margin: 15px;
            border-bottom: 1px solid #eee;
            padding: 0px 0px 10px 10px;
          }
          ul.tabAll {
            display: flex;
            flex-wrap: wrap;
            box-sizing: border-box;
            padding-left: 30px;
            li {
              margin-bottom: 10px;
              width: 26%;
              margin-right: 20px;
              span {
                text-align: center;
                display: block;
                cursor: pointer;
                padding: 4px 10px;
                font-size: 14px;
              }
            }
          }
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