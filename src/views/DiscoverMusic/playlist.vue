<template>
  <div class="playlist">
    <div class="playlist-top">
      <div class="sheetdetail">
        <button>
          {{ msg }}
          <i class="iconfont icon icon-youjiantou1"></i>
        </button>
        <van-tabs v-model="active" swipeable>
          <van-tab
            v-for="(item, index) in hotcat"
            :title="item.name"
            :key="index"
          >
            内容 {{ index }}
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import { getHotCat } from '../../api/apiwk/playList'
export default {
  data() {
    return {
      msg: '华语',
      active: 0,
      hotcat: []
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
      console.log(this.hotcat)
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
      item.activity = !item.activity
      console.log(item.activity)
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