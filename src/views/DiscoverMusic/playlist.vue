<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="sheetdetail">
        <button>
          {{ msg }}
          <i class="iconfont icon icon-youjiantou1"></i>
        </button>
        <van-tabs v-model="active" swipeable @click-tab="onClickTab">
          <van-tab
            v-for="(item, index) in hotcat"
            :title="item.name"
            :key="index"
          >
            <div class="listdetail">
              <ul class="listul" v-for="(list, index) in playlist" :key="index">
                <li>
                  <img :src="list.coverImgUrl" alt="" />
                </li>
                <li>
                  <span>{{ list.name }}</span>
                </li>
              </ul>
            </div>
          </van-tab>
        </van-tabs>
      </div>
    </div>
    <div class="totallist">
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
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getHotCat, getplaylist } from '../../api/playList'
export default {
  name: "playlist",
  data() {
    return {
      msg: '华语',
      active: 0,
      hotcat: [],
      listitem: [],
      playlist: []
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
  methods: {
    clickChange(item) {
      // 改变颜色
      item.activity = !item.activity
      console.log(item.activity)
    },
    onClickTab() {
      console.log(123)
    }
  }
}
</script>

<style lang="scss" scoped>
.playlist {
  .playlist-top {
    .sheetdetail {
      display: flex;
      button {
        width: 80px;
        text-align: center;
        border-radius: 30px;
      }
      ul {
        display: flex;
      }
    }
  }
  .totallist {
    display: none;
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