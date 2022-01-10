<template>
  <div class="newsongs">
    <div class="songbutton">
      <button
        @click="
          btnclick($event);
          showFlag = true;
          isalbum = false;
        "
        ref="btnnew"
        class="active"
      >
        新歌速递
      </button>
      <button
        @click="
          btnclick($event);
          showFlag = false;
          getnewalbum();
        "
        ref="btnout"
      >
        新碟上架
      </button>
    </div>
    <!-- 新歌速递 -->
    <div class="newsong" v-if="showFlag">
      <div class="songlistchoose">
        <van-row type="flex">
          <van-col
            :class="index === active ? 'active' : ''"
            @click.self="changetype(item.type, index)"
            span="4"
            v-for="(item, index) in typelist"
            :key="index"
            :ref="'btn' + index"
            >{{ item.name }}</van-col
          >
        </van-row>
        <div class="play-btn">
          <i :class="['el-icon-caret-right', 'active']"></i>
          <i class="el-icon-folder-add"></i>
        </div>
      </div>
      <div class="songlistdetail">
        <ul
          class="newsongul"
          v-for="(item, index) in typedata"
          :key="index"
          @click="getOneSong(item)"
        >
          <li>{{ item.keyI }}</li>
          <!-- album.blurPicUrl -->
          <li>
            <img :src="item.album.blurPicUrl" alt="" />
          </li>
          <!-- 歌名 -->
          <li>{{ item.name }}</li>
          <!--  作者名-->
          <li>{{ item.artists[0].name }}</li>
          <!-- album.name -->
          <li>{{ item.album.name }}</li>
          <!-- 播放时间 -->
          <li>{{ item.duration | playtime }}</li>
          <!-- 歌曲MP3请求id item. -->
        </ul>
      </div>
    </div>
    <!-- 新碟上架 -->
    <div class="newalbum" v-else>
      <van-list
        v-model="loading"
        :finished="finished"
        :finished-text="weekDataalbum.length > 0 ? '没有更多了' : '正在加载中'"
        @load="onLoad"
        class="albumlist"
        :immediate-check="check"
      >
        <ul>
          <li v-for="(item, index) in weekDataalbum" :key="index">
            <div class="albumimgli">
              <img
                :src="item.blurPicUrl"
                alt=""
                @click="getTo('albumdetail', item.id)"
              />
              <div class="play-btn">
                <i class="el-icon-caret-right"></i>
              </div>
            </div>
            <div>{{ item.name }}</div>
            <div>{{ item.artist.name }}</div>
          </li>
        </ul>
      </van-list>
    </div>
  </div>
</template>
<script>
import { getTopNewMusic, getTopNewalbum } from '@/api/DiscoverMusic/newSongs.js'
// 新歌速递
// import moment from 'moment'
export default {
  name: "NewSongs",
  data() {
    return {
      typelist: [{ name: '全部', type: 0 }, { name: '华语', type: 7 }, { name: '欧美', type: 96 }, { name: '日本', type: 8 }, { name: '韩国', type: 16 }
      ],
      typedata: [],
      active: 0,
      showFlag: true,
      list: [],
      isalbum: false,
      // 获取的最新每周的新碟
      weekDataalbum: [],
      loading: false,
      finished: false,
      count: 0,
      page: 0,
      limit: 30,
      wkalbumall: [],
      check: true
    }
  },
  mounted() {
    this.changetype(0, 0)
  },
  filters: {
    playtime(time) {
      // 转化为播放时间
      const mm = parseInt(time / 1000 / 60).toString().padStart(2, 0)
      const ss = parseInt(time / 1000 % 60).toString().padStart(2, 0)
      const str = `${mm}:${ss}`
      return str
    }
  },
  methods: {
    // 播放音乐
    getOneSong(row) {
      if (this.isListenId !== row.id) {
        this.$store.commit('songDetail/songAllMsg', row)
        this.isListenId = row.id
        // 响应式的数据
        const songDetail = {}
        row.ar = []
        row.al = {}
        // 因为专辑信息 这一组件的歌曲信息的属性跟其他的不一样
        // 添加同样的属性保持一直方便统一
        row.ar.push({ name: row.artists[0].name })
        row.al.picUrl = row.album.blurPicUrl
        songDetail.songName = row.name
        songDetail.singer = row.ar[0].name
        songDetail.id = row.id
        songDetail.picUrl = row.album.blurPicUrl
        this.songMsg = songDetail
        this.$store.dispatch('songDetail/getoneMusic', songDetail)
        this.$store.commit('songDetail/setplayListTracks', [row])
      } else { }
      if (!this.$store.state.songDetail.isPlay) {
        this.$store.commit("songDetail/playback")
      }
    },
    // 跳转专辑详情
    getTo(url, id) {
      this.$router.push(url + '/' + id)
      // console.log(id)
    },
    btnclick(event) {
      for (var key in this.$refs) {
        this.$refs[key].className = ''
      }
      event.target.className = 'active'
    },
    // 点击改变颜色 并且改变歌单
    async changetype(type, index) {
      this.active = index
      const res = await getTopNewMusic(type)
      res.data.data.forEach((item, index) => {
        // 给每个数据添家一个id属性
        const strId = (index + 1).toString().padStart(2, 0)
        item.keyI = strId
        // 数据太长放不下 处理一下
        item.album.name = item.album.name.substring(0, 12)
        item.name = item.name.substring(0, 12)
        // item.duration = moment(item.duration).format('mm:ss')
        const list = []
        list.push({
          id: item.id,
          dt: item.duration,
          alia: item.alias,
          al: item.album,
          ar: item.artists,
          name: item.name,
          mv: item.mvid,
          fee: item.fee
        })
        this.list = Object.freeze(list)
      })

      // 直接赋值新数组 也是响应式的 如果直接改老数组数据 不用push这些方法监听不到
      this.typedata = res.data.data
    },
    onLoad() {
      setTimeout(() => {
        this.getpagealbum()
        this.loading = false
        if (this.weekDataalbum.length >= this.count) {
          this.finished = true
        }
      }, 2000)
    },
    getnewalbum(limit = 30) {
      if (!this.isalbum) {
        this.isalbum = true
        getTopNewalbum({ limit }).then((res) => {
          // 分批请求
          // console.log(res)
          this.wkalbumall = res.data.weekData
          this.weekDataalbum = this.weekDataalbum.concat(this.wkalbumall.slice(0, 30))
          this.count += res.data.weekData.length
        })
      }
    },
    // 分批次展示数据 当用户下滑获取更多数据的时候
    getpagealbum() {
      this.page++
      this.weekDataalbum = this.weekDataalbum.concat(this.wkalbumall.slice(this.page * this.limit, this.limit + this.page * this.limit))
    }
  }
}
</script>

<style lang="scss" scoped>
.newsongs {
  .songbutton {
    margin-left: 25%;
    width: 202px;
    height: 32px;
    border: 1px solid #bbb;
    border-radius: 16px;
    button {
      width: 50%;
      text-align: center;
      border-radius: 16px;
      line-height: 30px;
      border: none;
      background-color: white;
      transition: all 0.5s;
    }
    button.active {
      background-color: #bbb;
      color: #fff;
    }
  }
  // 根据type选择歌单
  .newsong {
    .songlistchoose {
      margin: 34px 0 20px 0;
      display: flex;
      .van-row {
        width: 72%;
        margin-left: 20px;
        .van-col {
          color: #676767;
          cursor: pointer;
          width: 19%;
        }
        .van-col.active {
          color: #373737;
          font-weight: 700;
        }
      }
      .play-btn {
        display: flex;
        i {
          text-align: center;
          color: #d8d8d8;
          border-radius: 15px;
          border: 1px solid #d8d8d8;
          padding: 5px;
          margin-right: 5px;
          font-size: 14px;
          align-items: center;
        }
        i.acitve {
          background-color: red;
          color: white;
        }
      }
    }
    // 歌曲listdetail
    .songlistdetail {
      padding-left: 10px;
      padding-right: 10px;
      box-sizing: border-box;
      .newsongul {
        display: flex;
        justify-content: space-between;
        li {
          width: 19%;
          height: 90px;
          box-sizing: border-box;
          padding: 10px;
          font-size: 13px;
          align-self: center;
          img {
            width: 60px;
            height: 60px;
          }
        }
        li:first-of-type {
          width: 30px;
          color: #cfcfdf;
        }
        li:last-of-type {
          color: #cfcfdf;
        }
        li:not(:nth-child(2)) {
          padding-top: 37px;
        }
      }
      .newsongul:nth-of-type(2n + 1) {
        background-color: #f9f9f9;
      }
    }
  }
  .newalbum {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    box-sizing: border-box;
    padding: 0 14px 0 14px;
    justify-content: space-between;
    align-items: center;
    ul {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      .albumimgli {
        position: relative;
        .play-btn {
          position: absolute;
          width: 24px;
          height: 24px;
          right: 5px;
          bottom: 5px;
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
      li {
        width: 32%;
        box-sizing: border-box;
        padding: 10px;
        div {
          text-align: center;
        }
        div:nth-child(2) {
          font-size: 13px;
          margin: 2px 0 2px 0;
        }
        div:nth-child(3) {
          color: rgb(159, 159, 159);
          font-size: 12px;
        }
        img {
          width: 100%;
        }
      }
    }
  }
}
</style>