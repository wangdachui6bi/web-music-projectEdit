<template>
  <div class="playlist">
    <div class="totallist">
      <van-cell is-link @click="showPopup">展示弹出层</van-cell>
      <van-popup v-model="show">内容</van-popup>
    </div>
    <div class="highquality" v-for="(highlist, index) in arrtag" :key="index">
      <div class="highlist">
        <img :src="highlist.coverImgUrl" alt="" />
        <div class="hgtext">
          <div>精品歌单</div>
          <div>{{ highlist.name }}</div>
        </div>
      </div>
    </div>
    <div class="playlist-top">
      <div class="sheetdetail">
        <button>
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
      </div>
      <div class="listdetail">
        <ul class="listul" v-for="(list, index) in playlist" :key="index">
          <li>
            <img :src="list.coverImgUrl" alt="" />
          </li>
          <li class="listtextli">
            <span>{{ list.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <!-- <div class="totallist">
      <p>全部歌单</p>
      <dl class="listdl" v-for="(item, index) in categories" :key="index">
        <dt class="listtitle">{{ item }}</dt>
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
</template>





<script>
import { mapState, mapGetters } from 'vuex'
import { getHotCat, getplaylist, getHighquality } from '../../api/playList'
export default {
  name: "playlist",
  data() {
    return {
      msg: '华语',
      active: 0,
      hotcat: [],
      listitem: [],
      playlist: [],
      arrtag: [],
      show: false
    }
  },
  async created() {
    this.$store.dispatch("playlist/getAlcat")
    getHotCat().then((res) => {
      const arr = res.data.tags
      arr.forEach((item) => {
        this.$set(item, "acti", false)
      })
      this.hotcat = arr
    })
    getplaylist({ cat: this.msg }).then((res) => {
      this.playlist = res.data.playlists
    })
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
      handler(newVal, oldVal) {
        getplaylist({ cat: newVal }).then((res) => {
          this.playlist = res.data.playlists
        })
        getHighquality({ cat: newVal }).then((res) => {
          this.arrtag = res.data.playlists
          console.log(this.arrtag)
        })
      }
    }
  },
  methods: {
    clickChange(item) {
      // 改变颜色
      item.activity = !item.activity
      console.log(item.activity)
    },
    onClickTab(name, title) {
      this.msg = title
    },
    showPopup() {
      this.show = true
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  box-sizing: border-box;
  .highquality {
    padding: 10px 20px 10px 10px;
    .highlist {
      display: flex;
      margin: 15px 0 20px 20px;
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
          width: 120px;
        }
      }
    }
  }
  .playlist-top {
    box-sizing: border-box;
    padding: 0 14px;
    .sheetdetail {
      // display: flex;
      overflow: hidden;
      margin-bottom: 10px;
      button {
        float: left;
        width: 106px;
        text-align: center;
        border-radius: 30px;
        margin-top: 8px;
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
        li {
          margin: 0;
          img {
            width: 100%;
            height: 90%;
            border-radius: 20px;
          }
        }
        .listtextli {
          width: 100%;
          font-size: 12px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
      }
    }
  }
  .totallist {
    .wrapper {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    .block {
      width: 120px;
      height: 120px;
      background-color: #fff;
    }
    // display: none;
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
        width: 60%;
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
      font-size: 12px;
      border-bottom: 1px solid #eee;
      box-sizing: border-box;
      padding: 0 0 15px 10px;
    }
    .borderCir {
      color: red;
      background-color: pink;
      border-radius: 15%;
    }
  }
}
</style>