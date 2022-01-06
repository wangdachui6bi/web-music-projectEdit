<template>
  <div class="FooBar">
    <div class="footer-bar">
      <div class="player">
        <div class="player-container">
          <!-- 封面 作者 歌名 -->
          <div class="player-left">
            <img
              src="https://cdn.jsdelivr.net/gh/crazybox521/blogImg/music.jpg"
              class="img-border"
            />
            <div class="music-info">
              <div class="font-14 w-150 text-hidden">未知歌名</div>
              <div class="font-12 w-100 text-hidden">未知歌手名</div>
            </div>
          </div>
          <!-- 按钮组 -->
          <div class="player-wrapper">
            <div class="player-bar-btn"></div>
            <div class="player-bar-btn"></div>
            <div class="player-bar-btn"></div>
          </div>
          <div class="btn-other"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooBar"
}
</script>

<style lang="scss" scoped>
.FooBar {
  height: 51px;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
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
        }
      }
    }
  }
}
</style>