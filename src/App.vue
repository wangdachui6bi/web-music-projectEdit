<template>
  <div id="app">
    <Layout></Layout>
  </div>
</template>
<script>
import Layout from "@/layout"
export default {
  components: {
    Layout
  }
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  color: #2c3e50;
}
:root {
  font-size: 14px;
}
// 版心
.view-main {
  width: 90%;
  margin: 0 auto;
  max-width: 1200px;
}
.search-input .el-input__inner {
  height: 36px;
  line-height: 36px;
  background-color: #e13e3e;
  border-radius: 16px;
  border: 0;
  color: snow;
}
.btn {
  border: none;
  outline: none;
  height: 30px;
  padding: 4px 14px;
  border-radius: 15px;
  cursor: pointer;
}
.btn-red {
  background-color: #ec4141;
  color: #fff;
}
.btn-white {
  border: 1px solid #d8d8d8;
  background-color: #fff;
  color: #373737;
}
.img-border {
  box-sizing: border-box;
  border: 1px solid #ddd;
}
.img-radius-8 {
  border-radius: 8px;
}
.img-radius-4 {
  border-radius: 4px;
}
.img-h {
  height: 100%;
}
.img {
  width: 100%;
}
.font-bold {
  font-weight: 700;
}
.font-24 {
  font-size: 24px;
}
.font-20 {
  font-size: 20px;
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
.mleft-12 {
  margin-left: 12px;
}
.mleft-30 {
  margin-left: 30px;
}
.mright-10 {
  margin-right: 10px;
}
.mtop-10 {
  margin-top: 10px;
}
.mtop-20 {
  margin-top: 20px;
}
.mleft-200 {
  margin-left: 200px;
}

.text-hidden {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.no-btn {
  outline: 0;
  border: 0;
  color: #676767;
  cursor: pointer;
  background-color: #fff;
}
// 弹窗
.el-message-box {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -50%;
  margin-top: -25%;
  width: 100% !important;
}
</style>
