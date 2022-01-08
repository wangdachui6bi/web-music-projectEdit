<template>
  <div class="app">
    <Layout></Layout>
  </div>
</template>
<script>
import Layout from "@/layout"
export default {
  data () {
    return {

    }
  },
  components: {
    Layout
  }
}
</script>
<style lang="scss">
.search-input .el-input__inner {
  height: 36px;
  line-height: 36px;
  background-color: #e13e3e;
  border-radius: 16px;
  border: 0;
  color: snow;
}
.img-border {
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.font-14 {
  font-size: 14px;
}
.font-12 {
  font-size: 12px;
}
.w-150 {
  width: 150px;
}
.w-100 {
  width: 100px;
}
.text-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
// 弹窗
.el-message-box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50%;
  margin-top: -25%;
}
</style>
