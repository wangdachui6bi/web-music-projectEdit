<template>
  <el-table :data="list.tracks" style="width: 100%" stripe>
    <el-table-column
      type="index"
      label=""
      width="50"
      style="color: rgb(195, 195, 219)"
    >
    </el-table-column>
    <el-table-column prop="tag" label="" width="30">
      <template slot-scope="scope">
        <span @click="likeMusic(scope.row.id)">
          <i v-if="!isLiked(scope.row.id)" class="iconfont icon-aixin"></i>
          <i v-else style="color: red" class="iconfont icon-aixin"></i>
        </span>
      </template>
    </el-table-column>
    <el-table-column prop="name" label="音乐标题" show-overflow-tooltip>
      <template slot-scope="scope">
        <span>{{ scope.row.name }}</span>
        <span style="color: #969697" v-if="scope.row.alia.length !== 0"
          >({{ scope.row.alia[0] }})</span
        >
        <span
          class="vip-tag"
          style="color: rgb(236, 73, 73); border-color: rgb(236, 73, 73)"
          v-if="scope.row.mv !== 0"
          >MV<i class="el-icon-caret-right"></i
        ></span>
        <span class="vip-tag" v-if="scope.row.fee == 1">VIP</span>
      </template>
    </el-table-column>
    <el-table-column
      prop="ar[0].name"
      label="歌手"
      width="80"
      show-overflow-tooltip
    >
    </el-table-column>
  </el-table>
</template>

<script>
import { getLikeIdList, likeMusic } from '@/api/DiscoverMusic/PersonalRecom'

export default {
  props: ['list'],
  data () {
    return {
      /* 喜欢的音乐列表 */
      likeIdList: []
    }
  },
  computed: {
    uid () {
      return this.$store.state.login.profile.userId
    }
  },
  created () {
    console.log(this.uid)
    this.getLikeIdList(this.uid)
  },
  methods: {
    async getLikeIdList (uid) {
      const res = await getLikeIdList(uid)
      this.likeIdList = res.data.ids
      console.log(res)
    },
    isLiked (id) {
      return this.likeIdList.indexOf(id) !== -1
    },
    async likeMusic (id) {
      const liked = this.isLiked(id)
      const res = await likeMusic(id, !liked)
      this.getLikeIdList(this.uid)
      console.log(res)
    }

  }
}
</script>

<style lang="scss">
.vip-tag {
  display: inline-block;
  box-sizing: border-box;
  border: 1px solid #fe672e;
  border-radius: 2px;
  color: #fe672e;
  margin-left: 10px;
  height: 16px;
  padding: 0 2px;
  line-height: 1;
  font-family: 'Avenir';
}
</style>