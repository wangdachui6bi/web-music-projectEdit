<template>
  <div class="songLyric">
    <div class="detail">
      <div class="song-title">
        <p ref="song">歌名</p>
        <p ref="singer">歌手</p>
      </div>
      <div class="wrapper">
        <ul ref="ul" class="content">
          <li v-for="(item, index) of ms" :key="index">{{ item.c }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ms: []
    }
  }
}
</script>

<style style="scss" scoped>
.songLyric {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: red;
}
</style>