<template>
  <div class="comment">
    <div class="area-wrap">
      <textarea class="text-area"></textarea>
      <div class="word-num">140</div>
    </div>
    <div class="btn-wrap">
      <div class="at-btv">
        <button class="no-btn">@</button>
        <button class="no-btn">#</button>
      </div>
      <div class="send-btn">
        <button class="btn btn-white">评论</button>
      </div>
    </div>
    <div class="hot-wrap">
      <div class="font-bold font-16">精彩评论</div>
      <div v-for="item in hotComments" :key="item.userId" class="comment-item">
        <div class="comment_main">
          <div class="img-wrap">
            <img :src="item.user.avatarUrl" class="img" alt="" />
          </div>
          <div class="comment-wrap">
            <div class="comment-content">
              <span style="color: rgb(80, 125, 175)"
                >{{ item.user.nickname }}：</span
              >
              <span>{{ item.content }}</span>
            </div>
            <div class="comment-info">
              <div
                class="time"
                style="color: rgb(159, 159, 159); font-size: 12px"
              >
                {{ item.timeStr }}
              </div>
              <div class="comment-btn">
                <button class="no-btn">
                  <i></i>
                  <span>{{ item.likedCount }}</span>
                </button>
                <div class="div-column"></div>
                <button class="no-btn">
                  <i></i>
                </button>
                <div class="div-column"></div>
                <button class="no-btn">
                  <i></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="div-line"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { getHotComment } from '@/api/DiscoverMusic/PersonalRecom'
export default {
  props: ["list"],
  data () {
    return {
      hotComments: []
    }
  },
  created () {
    this.getHotComment(this.list.id, 2, 5)
    console.log(this.list)
  },
  methods: {
    async getHotComment (id, type, limit) {
      const res = await getHotComment(id, type, limit)
      console.log(res)
      this.hotComments = res.data.hotComments
    }
  }

}
</script>

<style lang="scss" scoped>
.area-wrap {
  position: relative;
  .text-area {
    box-sizing: border-box;
    width: 100%;
    height: 60px;
    border: 1px solid #e5e5e5;
    outline: none;
    font-size: 14px;
    border-radius: 4px;
    padding: 4px 10px;
    resize: none;
    word-break: break-all;
    word-wrap: break-word;
  }
  .word-num {
    position: absolute;
    bottom: 4px;
    right: 4px;
    color: #dfcfdf;
  }
}
.btn-wrap {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .no-btn {
    outline: 0;
    border: 0;
    color: #676767;
    cursor: pointer;
    font-size: 18px;
    background-color: #fff;
  }
  .btn {
    border: none;
    outline: none;
    height: 30px;
    padding: 4px 14px;
    border-radius: 15px;
    cursor: pointer;
  }
  .btn-white {
    border: 1px solid #d8d8d8;
    background-color: #fff;
    color: #373737;
  }
}
.hot-wrap {
  margin-top: 20px;
  color: #2c3e50;
  .font-bold {
    font-weight: 700;
  }
  .font-16 {
    font-size: 16px;
  }
  .comment_main {
    display: flex;
    align-items: center;
    margin: 10px 0;
    .img-wrap {
      height: 40px;
      width: 40px;
      .img {
        width: 100%;
        border-radius: 50%;
        cursor: pointer;
        height: auto;
        max-width: 100%;
      }
    }
    .comment-wrap {
      line-height: 30px;
      flex: 1;
      margin-left: 10px;
      .comment-content {
        word-break: break-all;
        word-wrap: break-word;
        span {
          cursor: pointer;
          font-size: 12px;
        }
      }
      .comment-info {
        display: flex;
        justify-content: space-between;
        .no-btn {
          outline: 0;
          border: 0;
          color: #676767;
          cursor: pointer;
          font-size: 18px;
          background-color: #fff;
        }
        span {
          font-size: 12px;
        }
        .div-column {
          display: inline-block;
          width: 1px;
          height: 14px;
          background-color: #dfcfe7;
        }
      }
    }
  }
  .div-line {
    border-top: 1px solid #e0e0e0;
  }
}
</style>