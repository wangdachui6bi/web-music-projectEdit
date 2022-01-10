<template>
  <div class="not-found">
    <el-empty
      description="404 Not Found"
      :image-size="400"
      image="https://cdn.jsdelivr.net/gh/crazybox521/blogImg/404.svg"
    >
      <el-button @click="$router.back()">返回上一页</el-button>
    </el-empty>
  </div>
</template>

<script>
export default {
  name: "NoFoundPages",
  data() {
    return {
      data: ['A', 'B']
    }
  },
  mounted() {
    console.log(this.$route)
  }
}
</script>

<style lang="scss" >
.not-found {
  height: 100vh;
  .el-empty__image {
    width: 100% !important;
    img {
      width: 100%;
    }
  }
  .el-empty__description,
  .el-empty__bottom {
    margin: 20px 0 0 0;
  }
}
</style>