<template>
  <div class="TopList view-main">
    <div class="guanfang-list">
      <h2 class="font-bold font-20">官方榜</h2>
      <div
        class="guanfang-item mtop-10"
        v-for="item in officialList"
        :key="item.id"
      >
        <div class="guanfang">
          <div class="img-wrap">
            <img :src="item.coverImgUrl" class="img-h img-radius-4 pointer" />
          </div>
          <ul class="mleft-30">
            <li v-for="(item2, index2) in item.tracks" :key="item2.id">
              <span class="mleft-12 text-hidden">{{ index2 + 1 }}</span>
              <span class="mleft-12 geming text-hidden">{{
                item2.al.name
              }}</span>
              <span class="zuozhe mright-10 text-hidden">{{
                item2.ar[0].name
              }}</span>
            </li>
          </ul>
        </div>
        <div class="mleft-200">
          <button class="mtop-10 no-btn">
            查看全部
            <i class="iconfont icon-youjiantou1"></i>
          </button>
        </div>
      </div>
    </div>
    <div class="global-list">
      <h2 class="font-bold font-20">全球榜</h2>
      <div class="img-list">
        <ul class="img-list-ul">
          <li class="img-item-li" v-for="item in globalList" :key="item.id">
            <div class="img-wrap">
              <!-- 封面 -->
              <img
                :src="item.coverImgUrl"
                class="img img-radius-8 img-border"
              />
              <!-- 播放量 -->
              <div class="video-playcount font-12">
                <i class="iconfont icon-bofang1"></i>
                {{ `${parseInt(item.playCount / 10000)}万` }}
              </div>
              <div class="play-btn">
                <i class="iconfont icon-bofang1"></i>
              </div>
            </div>

            <!-- 榜名 -->
            <div class="text-hidden">{{ item.name }}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
// 排行榜
import { getTopList, getListDetails } from "@/api/DiscoverMusic/TopList"
export default {
  name: "TopList",
  data () {
    return {
      officialList: [],
      globalList: []
    }
  },
  methods: {
    // 获取全部榜单
    async topList () {
      const { data: { list, code, msg } } = await getTopList()
      if (code === 200) {
        this.listDetails(list.slice(0, 4))
        this.globalList = list.slice(4)
      } else {
        Toast(msg)
      }
    },
    // 查询官方榜单
    async listDetails (arr) {
      arr.forEach(async item => {
        const { data: { playlist } } = await getListDetails(item.id)
        const arr = playlist.tracks.slice(0, 5)
        this.officialList.push({
          name: playlist.name,
          id: playlist.id,
          description: playlist.description,
          coverImgUrl: playlist.coverImgUrl,
          tracks: arr
        })
        // this.officialList.push(playlist)
      })
    }
  },
  created () {
    this.topList()
  }
}
</script>

<style lang="scss" scoped>
.TopList {
  .guanfang-list {
    h2 {
      margin: 0;
    }
    .guanfang-item {
      margin-bottom: 20px;
      .guanfang {
        display: flex;
        height: 160px;
        .img-wrap {
          position: relative;
          width: 60px;
          height: 60px;
          img {
            width: 60px;
            height: 60px;
          }
        }
        ul {
          flex-grow: 1;
          li {
            height: 32px;
            line-height: 32px;
            color: red;
            background-color: #fff;
            span {
              display: inline-block;
            }
            .geming {
              color: #373737;
              width: 80px;
            }
            .zuozhe {
              float: right;
              color: #9b9b9b;
              width: 80px;
            }
          }
          li:first-child {
            background-color: #f9f9f9;
          }
          li:nth-child(3) {
            background-color: #efefef;
          }
          li:nth-child(4) {
            color: #666;
          }
          li:nth-child(5) {
            color: #666;
            background-color: #f9f9f9;
          }
        }
      }
    }
  }
  .global-list {
    .img-list-ul {
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      .img-item-li {
        margin-bottom: 30px;
        width: 32%;
        margin-right: 2%;
        .img-wrap {
          position: relative;
          .video-playcount {
            color: #fff;
            position: absolute;
            right: 10px;
            top: 10px;
            text-shadow: 0 0 2px #000;
            .iconfont {
              font-size: 12px;
            }
          }
          .play-btn {
            position: absolute;
            background-color: #fbf7f6;
            color: #ec4141;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 50%;
            transition: all 0.8s;
            width: 24px;
            height: 24px;
            right: 5px;
            bottom: 8px;
            opacity: 1;
          }
        }
      }
      .img-item-li:nth-child(3n) {
        margin-right: 0;
      }
    }
  }
}
</style>