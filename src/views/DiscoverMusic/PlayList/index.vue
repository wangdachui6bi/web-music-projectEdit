<template>
  <div class="playlist view-main">
    <el-skeleton :rows="6" animated :loading="loading">
      <div class="highquality" v-for="(highlist, index) in arrtag" :key="index">
        <div class="highlist">
          <img :src="highlist.coverImgUrl" alt="" />
          <div class="hgtext">
            <div>
              <i class="iconfont icon icon-huiyuan"></i>
              <span>精品歌单</span>
            </div>
            <div>{{ highlist.name }}</div>
          </div>
        </div>
      </div>
      <div class="playlist-top">
        <div class="sheetdetail">
          <button @click="changisShow" ref="clickbutton">
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
          <div class="totallist" v-show="isShow">
            <p>全部歌单</p>
            <dl class="listdl" v-for="(item, index) in categories" :key="index">
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
          </div>
        </div>
        <div class="listdetail">
          <ul class="listul" v-for="(list, index) in playlist" :key="index">
            <li class="img-wrap">
              <img
                :src="list.coverImgUrl"
                alt=""
                @click="getTo('playlistdetail', list.id)"
              />
              <div class="play-btn">
                <i class="el-icon-caret-right"></i>
              </div>
            </li>
            <li class="listtextli">
              <span>{{ list.name }}</span>
            </li>
          </ul>
        </div>
      </div>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="totallist"
        :page-size="50"
        @current-change="currentChange"
        :current-page="currentPage"
      >
      </el-pagination>
    </el-skeleton>
  </div>
</template>
<script>
import { mapState, mapGetters } from 'vuex'
import { getHotCat, getplaylist, getHighquality } from '../../../api/DiscoverMusic/playList'
export default {
  name: "playlist",
  data () {
    return {
      loading: true,
      msg: '华语',
      active: 0,
      hotcat: [],
      listitem: [],
      playlist: [],
      arrtag: [],
      show: false,
      isShow: false,
      currentPage: 1,
      offset: 0,
      totallist: 0,
      iconarr: ["icon-yuzhong", "icon-fengge", "icon-kafei1", "icon-iconweixiao", "icon-zhuti"]
    }
  },
  created () {
    this.$store.dispatch("playlist/getAlcat")
    getHotCat().then(async (res) => {
      const arr = res.data.tags
      arr.forEach((item) => {
        this.$set(item, "acti", false)
      })
      this.hotcat = arr
      const { data: { playlists } } = await getplaylist({ cat: this.msg })
      this.playlist = playlists
      this.loading = false
    })
  },
  mounted () {
    this.clickhidden()
  },
  computed: {
    ...mapState({
      // 大分类
      categories: state => state.playlist.categories,
      // 小分类
      sub: state => state.playlist.sub
    }),
    // 把sub中对应categories对应的当一起
    ...mapGetters({
      catesub: 'playlist/catesub'
    })
  },
  watch: {
    msg: {
      // 初始化进行一次监听
      immediate: true,
      async handler (newVal, oldVal) {
        getplaylist({ cat: newVal, page: this.currentPage - 1 }).then((res) => {
          this.playlist = res.data.playlists
          // 更改每次的总条数
          this.totallist = res.data.total
        })
        getHighquality({ cat: newVal }).then((res) => {
          this.arrtag = res.data.playlists
        })
        this.currentPage = 1
      }
    }
  },
  methods: {
    getTo (url, id) {
      this.$router.push(url + '/' + id)
      // console.log(id)
    },
    clickhidden () {
      document.body.onclick = (event) => {
        if (event.target !== this.$refs.clickbutton) {
          this.isShow = false
        }
      }
    },
    clickChange (item) {
      // 改变颜色
      // 排他思想 所有的全部变为false
      this.catesub.forEach((item, index) => {
        item.forEach((item) => {
          item.activity = false
        })
      })
      item.activity = !item.activity
      this.msg = item.name
      this.isShow = false
    },
    onClickTab (name, title) {
      this.msg = title
    },
    showPopup () {
      this.show = true
    },
    // 改变totallist状态
    changisShow () {
      this.isShow = !this.isShow
    },
    currentChange (page) {
      this.currentPage = page
      getplaylist({ cat: this.msg, page: this.currentPage - 1 }).then((res) => {
        this.playlist = res.data.playlists
      })
    }
  }
}
</script>

<style lang="scss">
.playlist {
  box-sizing: border-box;
  .highquality {
    padding: 0px 20px 10px 10px;
    .highlist {
      display: flex;
      margin-bottom: 20px;
      font-size: 12px;
      box-sizing: border-box;
      background-color: rgba(0, 0, 0, 0.1);
      background-image: linear-gradient(#ffecd2, #fcb69f);
      border-radius: 10px;
      padding: 10px;
      img {
        width: 140px;
        height: 140px;
      }
      .hgtext {
        margin: 50px 0 0 30px;
        div:first-child {
          color: orange;
          border: 1px solid orange;
          width: 80px;
          text-align: center;
          line-break: 12px;
          text-align: center;
          border-radius: 15px;
          margin-bottom: 15px;
        }
        div:nth-child(2) {
          width: 96px;
        }
      }
    }
  }
  .playlist-top {
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
      .totallist {
        position: absolute;
        z-index: 9999;
        background-color: white;
        box-shadow: 5px -5px 8px 0px rgba(0, 0, 0, 0.2),
          -5px -5px 8px 0px rgba(0, 0, 0, 0.2);
        margin: 10px 18px 10px -3px;
        // display: none;
        box-sizing: border-box;
        .listdl {
          box-sizing: border-box;
          padding: 0 15px;
          display: flex;
          // justify-content: space-around;
          flex-wrap: wrap;
          font-size: 13px;
          .listtitle {
            font-size: 16px;
            color: #5e5e5e;
            height: 100%;
            width: 20%;
          }
          div {
            width: 72%;
            flex-wrap: wrap;
            dd {
              width: 63px;
              margin-bottom: 8px;
              span {
                text-align: center;
                display: block;
                cursor: pointer;
                padding: 4px 10px;
              }
            }
          }
        }
        p {
          font-size: 14px;
          border-bottom: 1px solid #eee;
          box-sizing: border-box;
          padding: 15px 0 15px 10px;
        }
        .borderCir {
          color: red;
          background-color: rgba(255, 182, 198, 0.2);
          border-radius: 15px;
        }
      }
    }
    .listdetail {
      display: flex;
      flex-wrap: wrap;
      .listul {
        box-sizing: border-box;
        width: 33%;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 25px;
        li {
          margin: 0;
          img {
            width: 100%;
            height: 92%;
            border-radius: 20px;
          }
        }

        .img-wrap {
          position: relative;
          .play-btn {
            position: absolute;
            width: 24px;
            height: 24px;
            right: 7px;
            bottom: 16px;
            color: #ec4141;
            background-color: #fbf7f6;
            border-radius: 50%;
            opacity: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            i {
              font-size: 20px;
            }
          }
        }
        .listtextli {
          width: 100%;
          font-size: 14px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  // 分页器
  // 为啥不生效
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: #ec4141;
    color: #fff;
  }
  .el-pagination {
    button.btn-prev {
      margin-left: 2px;
      margin-right: 2px;
    }
    ul.el-pager {
      li:not(.disabled).active {
        background-color: red;
      }
      li {
        min-width: 26px;
        min-height: 26px;
      }
    }
  }
}
</style>