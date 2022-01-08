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
          <button>点我</button>
        </p>
        <el-table :data="tableData" stripe style="width: 100%">
          <el-table-column prop="index" label="" width="50px">
          </el-table-column>
          <el-table-column prop="name" label="音乐标题" width="90px">
          </el-table-column>
          <el-table-column prop="" label="时长"> </el-table-column>
        </el-table>
        <p><span @click="getMore">点击加载更多</span></p>
      </div>
    </div>
    <!-- 更多专辑 -->
    <div v-for="aAlbum in allHotAlbums" :key="aAlbum.id" class="top50">
      <div class="topImg">
        <img :src="aAlbum.blurPicUrl" alt="" />
      </div>
      <!-- top50 的歌曲 -->
      <div class="topList">
        <p>
          <span>{{ aAlbum.name }}</span>
          <button>点我</button>
        </p>
        <table>
          <thead>
            <tr>
              <th style="width: 50px"></th>
              <th style="width: 90px">音乐标题</th>
              <th>时长</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="width: 50px">1</td>
              <td style="width: 90px">{{ aAlbum.name }}</td>
              <td>{{ aAlbum.dt }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { getArtistAlbumTop, getArtistAlbum } from '@/api/DiscoverMusic/ArtistsListInfo'
import moment from 'moment'
export default {
  data() {
    return {
      id: this.$route.params.id,
      tableData: [],
      index: 1,
      flag: true,
      allHotAlbums: []
    }
  },
  mounted() {
    this.getArtisListInfo(this.id)
    this.getAlbum(this.id)
  },
  methods: {
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
        item.index = index + 1
        item.dt = moment(item.mark).format("mm:ss")
      })
      this.allHotAlbums = listAl
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
            td{
              text-align: center;
            }
          }
        }
      }
    }
  }
}
</style>