<template>
  <div class="comment">
    <el-skeleton :rows="6" animated :loading="loading">
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
      <template v-if="!loading">
        <div class="hot-wrap">
          <div class="font-bold font-16">精彩评论</div>
          <div
            v-for="item in hotComments"
            :key="item.userId"
            class="comment-item"
          >
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
                      <i class="iconfont icon-dianzan"></i>
                      <span>{{ item.likedCount }}</span>
                    </button>
                    <div class="div-column"></div>
                    <button class="no-btn">
                      <i class="iconfont icon-fenxiang"></i>
                    </button>
                    <div class="div-column"></div>
                    <button class="no-btn">
                      <i
                        class="iconfont icon-jianyi"
                        style="font-size: 19px"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="div-line"></div>
          </div>
          <div class="more-btn-wrap">
            <button class="btn btn-white">更多精彩评论</button>
          </div>
        </div>
        <div class="hot-wrap">
          <div class="font-16 font-bold">最新评论</div>
          <div
            class="comment-item"
            v-for="(item, index) in comments"
            :key="item.commentId"
          >
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
                  <!-- <div class="comtBf"> -->
                  <div class="reply-content">
                    <template v-if="replied[index].length > 0">
                      <span
                        class="font-12 pointer"
                        style="margin-left: 5px; color: rgb(80, 125, 175)"
                      >
                        @{{ replied[index][0].user.nickname }}：
                      </span>
                      <span class="font-12">
                        {{ replied[index][0].content }}
                      </span>
                    </template>
                  </div>
                  <!-- </div> -->
                </div>
                <div class="comment-info">
                  <div
                    class="time"
                    style="color: rgb(159, 159, 159); font-size: 12px"
                  >
                    {{ item.timeStr }}
                  </div>
                  <div class="comment-btn">
                    <button class="no-btn" style="font-size: 12px">
                      <i class="iconfont icon-dianzan"></i>
                      {{ item.likedCount }}
                      <span></span>
                    </button>
                    <div class="div-column"></div>
                    <button class="no-btn">
                      <i class="iconfont icon-fenxiang"></i>
                    </button>
                    <div class="div-column"></div>
                    <button class="no-btn">
                      <i
                        class="iconfont icon-jianyi"
                        style="font-size: 19px"
                      ></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="div-line"></div>
          </div>
          <div class="flex_center" style="margin-top: 10px">
            <el-pagination
              background
              layout="prev, pager, next"
              :comment="comments"
              :page-size="20"
              @current-change="currentChange"
              :current-page="currentPage"
              :total="commentCount"
            >
            </el-pagination>
          </div>
        </div>
      </template>
    </el-skeleton>
  </div>
</template>

<script>
import { getHotComment, getNewComment } from '@/api/DiscoverMusic/PersonalRecom'
export default {
  props: ["list"],
  data () {
    return {
      hotComments: [],
      comments: [],
      replied: [],
      loading: true,
      currentPage: 1,
      offset: 0,
      commentCount: 0
    }
  },
  created () {
    this.getHotComment(this.list.id, 2, 5)
    this.getNewComment()
    // console.log(this.list)
  },
  methods: {
    async getHotComment (id, type, limit) {
      this.loading = true
      const res = await getHotComment(id, type, limit)
      // console.log(res)
      this.hotComments = res.data.hotComments
      this.loading = false
    },
    async getNewComment () {
      this.loading = true
      const res = await getNewComment({ id: this.list.id })
      this.comments = res.data.comments
      this.commentCount = res.data.total
      res.data.comments.forEach((com) => {
        this.replied.push(com.beReplied)
      })
      this.loading = false
    },
    currentChange (page) {
      this.currentPage = page
      getNewComment({ id: this.list.id, page: this.currentPage - 1 }).then((res) => {
        this.comments = res.data.comments
      })
    }
  }
}
</script>

<style lang="scss">
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
      .reply-content {
        background-color: #f4f4f4;
        border-radius: 6px;
        word-break: break-all;
        word-wrap: break-word;
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
  .flex_center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ec4141;
    color: #fff;
  }
  .el-pagination.is-background .el-pager li {
    margin: 0 1px;
  }
}
.more-btn-wrap {
  text-align: center;
  margin-top: 20px;
}
</style>