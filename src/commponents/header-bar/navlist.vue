<template>
  <div class="navlist">
    <van-tabs v-model="active">
      <van-tab title="个性推荐">个性推荐</van-tab>
      <van-tab title="歌单">歌单</van-tab>
      <van-tab title="排行榜">排行榜</van-tab>
      <van-tab title="歌手">歌手</van-tab>
      <van-tab title="最新音乐">最新音乐</van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 1
    }
  }
}
</script>

<style lang='scss' scoped>
.navlist{
  .van-tab{
    height: 30px;
  }
}
</style>