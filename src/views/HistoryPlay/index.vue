<template>
  <div class="HistoryPlay view-main mtop-20">
    <div class="info">
      <div>
        <span class="font-24 font-bold">最近播放</span>
        <span class="font-14 mleft-10">共 {{ count }} 首</span>
      </div>
      <div class="btn-wrap">
        <button class="no-btn">清除列表</button>
      </div>
    </div>
    <div class="btn-wrap mtop-10">
      <button class="btn btn-red">
        <i class="iconfont icon-bofang"></i>
        播放全部
      </button>
    </div>
    <div class="div-line mtop-20"></div>
    <el-table :data="tableData" style="width: 100%" stripe>
      <el-table-column type="index" width="50"> </el-table-column>
      <el-table-column prop="favicon" width="30">
        <i class="iconfont icon-aixin"></i>
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
  </div>
</template>

<script>
// 最近播放
export default {
  name: "HistoryPlay",
  data() {
    return {
      count: 0,
      tableData: []
    }
  },
  methods: {

  },
  created() {
    // 获取存储在本地的最近播放的列表
    this.tableData = JSON.parse(localStorage.getItem("historyplayList") || "[]")
    this.count = this.tableData.length
  }
}
</script>

<style lang="scss" >
.HistoryPlay {
  .info {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .el-table__cell{
    div.cell{
      white-space: nowrap;
    }
  }
}
</style>