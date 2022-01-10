<template>
  <div class="FooBar">
    <div class="footer-bar">
      <div class="player">
        <div class="player-container">
          <!-- 封面 作者 歌名 -->
          <div class="player-left">
            <img :src="picUrl" class="img-border" />
            <div class="music-info" v-if="!listenStatus">
              <div class="font-14 w-150 text-hidden">未知歌名</div>
              <div class="font-12 w-100 text-hidden">未知歌手名</div>
            </div>
            <div class="music-info" v-else>
              <div class="font-14 w-150 text-hidden">
                {{ singleSongMsg.songName }}
              </div>
              <div class="font-12 w-100 text-hidden">
                {{ singleSongMsg.singer }}
              </div>
            </div>
          </div>
          <!-- 按钮组 -->
          <div class="player-wrapper">
            <div class="player-bar">
              <!-- 上一首 -->
              <div
                class="player-bar-btn"
                @click="
                  premusic();
                  active = 1;
                "
              >
                <i
                  :class="[
                    'iconfont',
                    'icon-shangyishou',
                    { active: active === 1 },
                  ]"
                ></i>
              </div>
              <!-- 播放 -->
              <div class="player-bar-btn" @click="controlPlay">
                <i class="iconfont icon-bofang1" v-if="!isPlay"></i>
                <i class="iconfont icon-tingzhi" style="color: red" v-else></i>
              </div>
              <!-- 下一首 -->
              <div
                class="player-bar-btn"
                @click="
                  nextmusic();
                  active = 2;
                "
              >
                <i
                  :class="[
                    'iconfont',
                    'icon-xiayishou',
                    { active: active === 2 },
                  ]"
                ></i>
              </div>
              <!-- 收藏 -->
              <div class="player-bar-btn">
                <i class="iconfont icon-aixin"></i>
              </div>
            </div>
          </div>
          <audio
            ref="audioRef"
            :src="musicUrl"
            autoplay
            @ended="nextmusic"
          ></audio>
          <div class="btn-other"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'vuex'
export default {
  name: "FooBar",
  data() {
    return {
      active: 0,
      isHistoryHave: false
    }
  },

  methods: {
    nextmusic() {
      this.$store.commit('songDetail/nextsong')
    },
    controlPlay() {
      if (this.singleSongMsg.id === undefined) return
      this.$store.commit('songDetail/controlPlay')
    },
    premusic() {
      this.$store.commit('songDetail/presong')
    }
  },
  watch: {
    // 通过vuex的isplay监听是否播放
    isPlay(newVal) {
      if (this.musicUrl === '') {
        return 0
      }
      if (newVal) {
        this.$refs.audioRef.play()
      } else {
        this.$refs.audioRef.pause()
      }
    },
    singleSongMsg(newVal) {
      // 检测每次singleSongMsg的变化 如果新的这个历史播放数组没有的话就添加进来
      const isHaveIndex = this.historyplayList.findIndex((song) => song.id === newVal.id)
      if (isHaveIndex === -1) {
        this.isHistoryHave = false
      } else {
        this.isHistoryHave = true
      }
      if (!this.isHistoryHave) {
        console.log(this.$store.state.songDetail.playListTracks)
        const songTrack = this.$store.state.songDetail.playListTracks.find(item => item.id === newVal.id)
        this.historyplayList.push(songTrack)
      }
      localStorage.historyplayList = JSON.stringify(this.historyplayList)
    }
  },
  computed: {
    // 是否有播放的歌曲状态
    historyplayList() {
      return JSON.parse(localStorage.historyplayList || '[]')
    },
    listenStatus() {
      return this.$store.state.songDetail.isHavesong
    },
    picUrl() {
      return this.singleSongMsg.picUrl ? this.singleSongMsg.picUrl : 'https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg'
    },
    singleSongMsg() {
      return this.$store.state.songDetail.singleSongMsg
    },
    musicUrl() {
      return this.singleSongMsg.songUrl ? this.singleSongMsg.songUrl : ''
    },
    // 将vuex的isPlay引入
    isPlay() {
      return this.$store.state.songDetail.isPlay
    }
  }
}
</script>

<style lang="scss" scoped>
.FooBar {
  height: 51px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  .footer-bar {
    height: 100%;
    .player {
      height: 100%;
      .player-container {
        box-sizing: border-box;
        border-top: 1px solid #eee;
        display: flex;
        width: 100%;
        height: 100%;
        justify-content: space-between;
        align-items: center;
        background-color: #fff;
        // 封面 歌名 作者
        .player-left {
          display: flex;
          align-items: center;
          position: relative;
          width: 300px;
          img {
            margin: 0 10px;
            height: 50px;
            width: 50px;
            border-radius: 8px;
          }
        }
        // 播放控件
        .player-bar {
          margin-top: 0;
          width: 150px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-around;
          .player-bar-btn {
            outline: none;
            border: none;
            background-color: #fff;
            cursor: pointer;
          }
          i.active {
            color: red;
          }
          .player-bar-btn:nth-child(2) {
            height: 32px;
            width: 32px;
            border-radius: 50%;
            background-color: #f4f4f4;
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }
      }
    }
  }
}
</style>