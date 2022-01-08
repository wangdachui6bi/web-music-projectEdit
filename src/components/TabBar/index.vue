<template>
  <div class="TabBar">
    <van-tabs v-model="active">
      <van-tab title="个性推荐" to="/personalrecom" />
      <van-tab title="歌单" to="/playlist" />
      <van-tab title="排行榜" to="/toplist" />
      <van-tab title="歌手" to="/artistlist" />
      <van-tab title="最新音乐" to="/newsongs" />
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: "TabBar",
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style lang="scss" >
.TabBar {
  position: fixed;
  top: 60px;
  z-index: 999;
  height: 60px;
  width: 100%;
  line-height: 60px;
  .van-tab:nth-child(1),
  .van-tab:nth-child(5) {
    flex: 1.3;
  }
  .van-tab--active {
    .van-tab__text {
      font-size: 18px;
      font-weight: 700;
    }
  }
}
</style>