<template>
  <div class="DailyRecom">
    <div class="view-main mtop-20">
      <el-skeleton :rows="6" animated :loading="loading">
        <!-- 标题 -->
        <div class="info">
          <div class="img-wrap">
            <div class="day font-bold">
              {{ new Date().getDate().toString().padStart(2, 0) }}
            </div>
          </div>
          <div class="text mleft-30 mtop-20">
            <div class="font-24 font-bold">每日歌曲推荐</div>
            <div class="desc mtop-10">根据你的音乐口味生成，每天6:00更新</div>
          </div>
        </div>
        <!-- 按钮组 -->
        <div class="btn-wrap">
          <div class="btn btn-red">
            <i class="iconfont icon-bofang1"></i>
            播放全部
          </div>
          <div class="btn btn-white mleft-12">
            <i class="iconfont icon-tianjiawenjian"></i>
            收藏全部
          </div>
        </div>
        <div class="div-line mtop-20"></div>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column type="index" width="50"> </el-table-column>
          <el-table-column prop="favicon" width="30">
            <template slot-scope="scope">
              <span @click="likeMusic(scope.row)">
                <div>
                  <i
                    v-if="scope.row.isLiked"
                    style="color: red"
                    class="iconfont icon-aixin1"
                  ></i>
                  <i v-else class="iconfont icon-aixin"></i>
                </div>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="音乐标题" width="211">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
              <div class="vip-tag" v-if="scope.row.fee === 1">VIP</div>
              <div class="vip-tag" v-if="scope.row.mv !== 0">MV</div>
            </template>
          </el-table-column>
          <el-table-column prop="ar[0].name" label="歌手" width="80">
          </el-table-column>
        </el-table>
      </el-skeleton>
    </div>
  </div>
</template>

<script>
import { recommendSongs } from "@/api/DailyRecom"
import { getLikeIdList, likeMusic } from '@/api/DiscoverMusic/PersonalRecom'
// 每日推荐     
export default {
  name: "DailyRecom",
  data () {
    return {
      loading: true,
      tableData: [],
      likeIdList: []
    }
  },
  methods: {
    async getLikeList () {
      const { data: { data: { dailySongs } } } = await recommendSongs()
      dailySongs.forEach((item) => {
        this.$set(item, "isLiked", this.isLiked(item.id))
        this.tableData.push(item)
      })
    },
    async getLikeIdList (uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
      this.loading = false
    },
    isLiked (id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    async likeMusic (item) {
      item.isLiked = !item.isLiked
      // this.getLikeList(this.uid)
      await likeMusic(item.id, item.isLiked)
      // if (res.code !== 200) return
      // Toast(`${liked ? '取消喜欢' : '喜欢'}成功`)
      this.getLikeList(this.uid)
    }
  },
  created () {
    this.getLikeList()
    this.getLikeIdList(this.uid)
  },
  computed: {
    uid () {
      return this.$store.state.login.profile.userId
    }
  }
}
</script>

<style lang="scss" >
.DailyRecom {
  // 标题
  .info {
    display: flex;
    // width: 100%;
    .img-wrap {
      height: 100px;
      width: 100px;
      background: url(../../assets/img/calendar.png) 0 0/100% no-repeat;
      .day {
        width: 100px;
        height: 40px;
        font-size: 40px;
        color: #ec4141;
        margin-top: 30px;
        text-align: center;
      }
    }
  }
  // 按钮组
  .btn-wrap {
    width: 370px;
    height: 30px;
    .btn {
      display: inline-block;
      padding: 0;
      text-align: center;
      line-height: 30px;
    }
    .btn-red {
      width: 100px;
      height: 100%;
      border-radius: 25px;
    }
    .btn-white {
      width: 100px;
      height: 100%;
      border-radius: 25px;
    }
  }
  // 歌单
  .div-line {
    border-top: 1px solid #e0e0e0;
  }
  .el-table td,
  .el-table th {
    padding: 6px 0;
    border: none;
    font-size: 12px;
  }
  .el-table__cell {
    > div {
      box-sizing: border-box;
      white-space: nowrap;
      min-width: 50px;
    }
  }
}
</style>