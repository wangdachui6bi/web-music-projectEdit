<template>
  <div class="newsongs">
    <div class="songbutton">
      <button @click="btnclick" ref="btn1" class="active">新歌速递</button>
      <button @click="btnclick" ref="btn2">新碟上架</button>
    </div>
    <div class="songlistchoose">
      <van-row type="flex">
        <van-col
          @click="changetype(item.type, $event)"
          span="4"
          v-for="(item, index) in typelist"
          :key="index"
          ref=""
          >{{ item.name }}</van-col
        >
      </van-row>
      <div class="play-btn">
        <i class="el-icon-caret-right active"></i>
        <i class="el-icon-folder-add"></i>
      </div>
    </div>
    <div class="songlistdetail">
      <ul class="newsongul" v-for="(item, index) in typedata" :key="index">
        <li></li>
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
</template>

<script>
import { getTopNewMusic } from '@/api/DiscoverMusic/newSongs.js'
// 新歌速递
// import moment from 'moment'
export default {
  name: "NewSongs",
  data() {
    return {
      typelist: [{ name: '全部', type: 0 }, { name: '华语', type: 7 }, { name: '欧美', type: 96 }, { name: '日本', type: 8 }, { name: '韩国', type: 16 }
      ],
      typedata: []
    }
  },
  created() {
    getTopNewMusic(96).then((res) => {
      console.log(res)
    })
    console.log(parseInt(212192 / 1000 / 60))
  },
  filters: {
    playtime(time) {
      // 转化为播放时间
      const mm = parseInt(time / 1000 / 60).toString().padStart(2, 0)
      const ss = (time % 60).toString().padStart(2, 0)
      const str = `${mm}:${ss}`
      return str
    }
  },
  methods: {
    btnclick(event) {
      for (var key in this.$refs) {
        this.$refs[key].className = ''
      }
      event.target.className = 'active'
    },
    async changetype(type, event) {
      for (let i = 0; i < event.target.parentNode.children.length; i++) {
        event.target.parentNode.children[i].className = 'van-col van-col--4'
      }
      const classStr = event.target.className
      event.target.className = classStr + ' active'
      const res = await getTopNewMusic(type)
      this.typedata = res.data.data
      console.log(this.typedata)
    }
  }
}
</script>

<style lang="scss" >
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
  .songlistchoose {
    margin-top: 40px;
    display: flex;
    .van-row {
      width: 74%;
      margin-left: 20px;
      .van-col {
        color: #676767;
        cursor: pointer;
      }
      .van-col.active {
        color: #373737;
        font-weight: 700;
      }
    }
    .play-btn {
      display: flex;
    }
    i {
      width: 20px !important;
      height: 20px !important;
      line-height: 20px;
      text-align: center;
      color: #d8d8d8;
      border-radius: 40%;
      border: 1px solid #d8d8d8;
      padding: 5px;
      margin-right: 5px;
    }
    .acitve {
      background-color: red !important;
      color: white !important;
    }
  }
  // 歌曲listdetail
  .songlistdetail {
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    .newsongul {
      display: flex;
      align-items: center;
      justify-content: space-between;
      li {
        width: 15%;
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
      }
    }
    .newsongul:nth-of-type(2n + 1) {
      background-color: #f9f9f9;
    }
  }
}
</style>