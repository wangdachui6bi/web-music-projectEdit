<template>
  <div class="VideoDetail">
    <el-skeleton :rows="6" animated :loading="loading">
      <template v-if="!loading">
        <h1>←&nbsp;&nbsp;视频详情</h1>
        <div class="playVideo">
          <video
            :src="videoPlayDate.url"
            controls="controls"
            width="370px"
          ></video>
        </div>
        <div class="artistInfo">
          <img :src="videoArtists.avatarUrl" alt="" />
          <span class="nameInfo">{{ videoArtists.nickname }}</span>
        </div>
        <div class="mvN">{{ videoDate.title }}</div>
        <p class="number">
          <span>发布时间:{{ publishTime }}</span>
          <span>播放次数:{{ videoDate.playTime | filterNumber }}万</span>
        </p>

        <!-- 点赞 -->
        <div class="dz">
          <button>
            <i class="icon iconfont icon-dianzan"></i>
            ({{ dzData.likedCount }})
          </button>
          <button>
            <i class="icon iconfont icon-tianjiawenjian"></i>
            {{ dzData.commentCount }}
          </button>
          <button class="pl">
            <i
              class="icon iconfont icon-fenxiang mg"
              @click="showShare = true"
            ></i>
            {{ dzData.shareCount }}
            <div>
              <van-share-sheet
                v-model="showShare"
                title="立即分享给好友"
                :options="options"
                @select="onSelect"
              />
            </div>
          </button>
        </div>

        <p>
          <span>评论({{ dzData.commentCount }})</span>
        </p>

        <div>
          <van-field
            v-model="message"
            rows="2"
            autosize
            type="textarea"
            maxlength="140"
            placeholder="请输入留言"
            show-word-limit
            :label="at"
          />
        </div>
        <div class="leavInfo">
          <div class="leavInfo-left">
            <span @click="inputLabel">@</span>
            <span @click="inputLa">#</span>
          </div>
          <button>评论</button>
        </div>
        <!-- 精彩评论 -->
        <p class="comment">精彩评论</p>
        <div>
          <div class="commitItem" v-for="item in hotComments" :key="item.id">
            <img :src="item.user.avatarUrl" alt="" class="headPortrait" />
            <div class="comment_main">
              <div>
                <span class="user">{{ item.user.nickname }}:</span>
                {{ item.content }}
              </div>
              <div class="dzDetail">
                <span class="time">{{ item.timeStr }}</span>
                <div class="rightIcon">
                  <span class="dzNumber">
                    <i class="icon iconfont icon-dianzan"></i>
                    {{ item.likedCount }}
                  </span>
                  <div class="div-column"></div>
                  <i class="icon iconfont icon-fenxiang"></i>
                  <div class="div-column"></div>
                  <i class="icon iconfont icon-jianyi fz19"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import moment from "moment"
import { getVideoUrl, getVideoDetail, getVideoLikeNumber, getVideoComment } from '@/api/Video'
import { Toast } from 'vant'
export default {
  name: 'VideoDetail',
  data () {
    return {
      VideoId: this.$route.params.id,
      videoPlayDate: [],
      videoDate: [],
      videoArtists: {},
      dzData: {},
      at: "",
      loading: true,
      message: '',
      videoComments: [],
      hotComments: [],
      showShare: false,
      options: [
        { name: '微信', icon: 'wechat' },
        { name: '微博', icon: 'weibo' },
        { name: '复制链接', icon: 'link' },
        { name: '分享海报', icon: 'poster' },
        { name: '二维码', icon: 'qrcode' }
      ]
    }
  },
  created () {
    this.init()
  },
  computed: {
    publishTime () {
      return moment(this.videoDate.publishTime).format("YYYY-MM-DD hh:mm:ss")
    }
  },
  filters: {
    filterNumber (number) {
      return parseInt(number / 10000)
    }
  },
  methods: {
    async init () {
      await this.getVideo(this.VideoId)
      await this.getVideoName(this.VideoId)
      await this.getVideoLikes(this.VideoId)
      await this.getComment(this.VideoId)
      this.loading = false
    },
    async getVideo (id) {
      const res = await getVideoUrl(id)
      this.videoPlayDate = res.data.urls[0]
    },
    async getComment (id) {
      const res = await getVideoComment(id)
      this.hotComments = res.data.hotComments
      // console.log(res.data)
    },
    async getVideoLikes (id) {
      const res = await getVideoLikeNumber(id)
      this.dzData = res.data
    },
    async getVideoName (id) {
      const res = await getVideoDetail(id)
      console.log(res)
      this.videoArtists = res.data.data.creator
      this.videoDate = res.data.data
    },
    inputLabel () {
      this.at = "@"
    },
    inputLa () {
      this.at = "#想说啥#"
    },
    onSelect (option) {
      Toast(option.name)
      this.showShare = false
    }
  }
}
</script>

<style lang="scss" scoped>
.VideoDetail {
  h1 {
    font-size: 16px;
  }
  width: 90%;
  margin: 0 auto;
  .playVideo {
    margin-top: 10px;
    width: 370px;
    height: 210px;
    margin: 0 auto;
  }
  .artistInfo {
    margin: 10px auto;
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      float: left;
    }
    .nameInfo {
      display: block;
      height: 40px;
      line-height: 40px;
      margin-left: 50px;
      font-size: 14px;
      color: #2c3e50;
    }
  }
  .mvN {
    margin-top: 10px;
    font-size: 18px;
    font-weight: 700;
  }
  .number {
    color: rgb(207, 207, 207);
    font-size: 12px;
    span {
      margin-right: 20px;
    }
  }
  .dz {
    margin-top: 20px;
    button {
      outline: none;
      height: 30px;
      padding: 4px 14px;
      border-radius: 15px;
      cursor: pointer;
      border: 1px solid #d8d8d8;
      background-color: #fff;
      color: #373737;
      margin-right: 10px;
    }
    .pl {
      width: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      display: inline-block;
    }
  }
  .van-cell {
    border: 1px solid #e5e5e5;
  }
  .leavInfo {
    color: #676767;
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leavInfo-left {
      span {
        font-size: 18px;
        margin-right: 20px;
      }
    }
    button {
      border: 1px solid #d8d8d8;
      background-color: #fff;
      color: #373737;
      outline: none;
      height: 30px;
      padding: 4px 14px;
      border-radius: 15px;
      cursor: pointer;
    }
  }
  .comment {
    font-size: 16px;
    font-weight: 700;
  }
  .commitItem {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .headPortrait {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
    .comment_main {
      margin-left: 10px;
      font-size: 12px;
      .user {
        color: rgb(80, 125, 175);
        font-size: 12px;
      }
      .dzDetail {
        width: 320px;
        display: flex;
        justify-content: space-between;
        .time {
          height: 30px;
          line-height: 38px;
          color: rgb(159, 159, 159);
        }
        .rightIcon {
          display: flex;
          align-items: center;
          .dzNumber {
            display: inline-block;
            box-sizing: border-box;
          }
          .div-column {
            display: inline-block;
            width: 1px;
            height: 14px;
            background-color: #dfcfe7;
            margin: 0 5px;
          }
          .fz19 {
            font-size: 19px;
          }
        }
      }
    }
  }
}
</style>