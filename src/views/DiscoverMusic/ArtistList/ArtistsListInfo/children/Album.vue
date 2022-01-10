<template>
  <div class="Album">
    <div class="top50">
      <div class="topImg">
        <img src="http://47.102.159.133/img/top50.89421d54.png" alt="" />
      </div>
      <!-- top50 的歌曲 -->
      <div class="topList">
        <p>
          <span>热门50首</span>
          <i class="icon iconfont icon-bofang"></i>
        </p>
        <el-table
          :data="tableData"
          stripe
          style="width: 100%"
          @row-click="getOneSong"
        >
          <el-table-column prop="index" label="" width="50px">
          </el-table-column>
          <el-table-column prop="name" label="音乐标题" width="90px">
          </el-table-column>
          <el-table-column prop="dt" label="时长"> </el-table-column>
        </el-table>
        <p>
          <span @click="getMore">{{ flag ? "点击加载更多" : "点我收起" }}</span>
        </p>
      </div>
    </div>
    <!-- 更多专辑 -->
    <div v-for="(aAlbum, dex) in allHotAlbums" :key="aAlbum.id" class="top50">
      <div class="topImg">
        <img :src="aAlbum.blurPicUrl" alt="" />
      </div>
      <div class="topList">
        <p>
          <span>{{ aAlbum.name }}</span>
          <i class="icon iconfont icon-bofang"></i>
        </p>
        <table>
          <thead>
            <tr>
              <th style="width: 50px"></th>
              <th style="width: 90px">音乐标题</th>
              <th aid="aAlbum.id">时长</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(alumSong, index) in allAlbumSongMsg[dex]" :key="index" @click="getOneSong(alumSong)">
              <td style="width: 50px">{{ alumSong.idKey }}</td>
              <td class="sl">{{ alumSong.name }}</td>
              <td>{{ alumSong.dt | dataFilter }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistAlbumTop, getArtistAlbum, getAlbumContent } from '@/api/DiscoverMusic/ArtistsListInfo'
import { getAlbumDetail } from '@/api/musicPlay/getSong.js'
import moment from 'moment'
export default {
  data() {
    return {
      id: this.$route.params.id,
      tableData: [],
      index: 1,
      flag: true,
      allHotAlbums: [],
      allTime: [],
      isListenId: 0,
      songMsg: {},
      allAlbumSongMsg: []
    }
  },
  filters: {
    dataFilter(arg) {
      return moment(arg).format('mm:ss')
    }
  },
  mounted() {
    this.getArtisListInfo(this.id)
    this.getAlbum(this.id)
  },
  methods: {
    // 点击歌曲进行播放
    getOneSong(row) {
      if (this.isListenId !== row.id) {
        this.isListenId = row.id
        // 响应式的数据
        const songDetail = {}
        songDetail.songName = row.name
        songDetail.singer = row.ar[0].name
        songDetail.id = row.id
        songDetail.picUrl = row.al.picUrl
        this.songMsg = songDetail
        this.$store.dispatch('songDetail/getoneMusic', songDetail)
        this.$store.commit('songDetail/setplayListTracks', [row])
      }
    },
    async getArtisListInfo(id) {
      const res = await getArtistAlbumTop(id)
      const list = res.data.songs
      list.forEach((item, index) => {
        item.index = index + 1
        item.dt = moment(item.dt).format("mm:ss")
      })
      if (this.flag) {
        this.tableData = list.slice(0, 10)
      } else {
        this.tableData = list
      }
    },
    async getAlbum(id) {
      const res = await getArtistAlbum(id)
      const listAl = res.data.hotAlbums
      listAl.forEach((item, index) => {
        const albumId = item.id
        this.getTime(albumId)
        item.index = index + 1
      })
      this.allHotAlbums = listAl
    },
    async getTime(id) {
      const res = await getAlbumContent(id)
      const allTimeone = res.data.songs
      allTimeone.forEach((item, index) => {
        const t = moment(item.dt).format("mm:ss")
        this.allTime.push(t)
      })

      /* const allTime = []
      list.forEach((item) => {
        allTime.push(item.dt)
        return allTime
      }) */
    },
    getMore() {
      this.flag = !this.flag
      this.getArtisListInfo(this.id)
    }
    /* async getMore(id) {
      const result = await getArtistAlbum(id)
      const resultList = result.data.songs
      resultList.forEach((item, index) => {
        item.index = index + 1
        item.dt = moment(item.dt).format("mm:ss")
      })
      this.tableData = resultList
      this.flag = !this.flag
      console.log(this.flag)
    } */
  },
  watch: {
    allAlumId(newVal) {
      newVal.forEach((alumId) => {
        getAlbumDetail(alumId).then((res) => {
          res.data.songs.forEach((song, index) => {
            song.idKey = index + 1
          })
          this.allAlbumSongMsg.push(res.data.songs)
        })
      })
      console.log(this.allHotAlbums)
      console.log(this.allAlbumSongMsg)
    }
  },
  computed: {
    allAlumId() {
      const alumIdarr = this.allHotAlbums.map((alum) => {
        return alum.id
      })
      return alumIdarr
    }
  }
}
</script>

<style lang="scss" scoped>
.Album {
  * {
    margin: 0;
    padding: 0;
  }
  .top50 {
    margin-top: 30px;
    display: flex;
    justify-content: space-around;
    .topImg {
      width: 40%;
      height: 86px;
      padding-left: 5%;
      box-sizing: border-box;
      img {
        width: 86px;
        border-radius: 8px;
      }
    }
    .topList {
      width: 60%;
      p span {
        margin-right: 30px;
      }
      table {
        thead {
          tr {
            height: 40px;
            line-height: 40px;
            th {
              font-size: 12px;
              font-weight: normal;
            }
          }
        }
        tbody {
          tr {
            font-size: 12px;
            height: 40px;
            line-height: 40px;
            td {
              text-align: center;
            }
            .sl {
              width: 90px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
  }
}
</style>