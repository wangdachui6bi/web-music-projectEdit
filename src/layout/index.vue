<template>
  <div class="layout">
    <!-- 头部 -->
    <template v-if="$route.meta.needHead">
      <TopBar></TopBar>
      <div class="TopBar-space"></div>
    </template>
    <!-- 主体 -->
    <div class="main">
      <template v-if="TabList.includes($route.path)">
        <TabBar></TabBar>
        <div class="TabBar-space"></div>
      </template>
      <router-view></router-view>
    </div>
    <!-- 底部 -->
    <template v-if="$route.meta.needHead">
      <FooBar></FooBar>
      <div class="FooBar-space"></div>
    </template>
  </div>
</template>

<script>
import FooBar from "@/components/FooBar"
import TopBar from "@/components/TopBar"
import TabBar from "@/components/TabBar"
export default {
  name: "layout",
  data() {
    return {
      TabList: [
        "/personalrecom",
        "/playlist",
        "/toplist",
        "/artistlist",
        "/newsongs"
      ]
    }
  },
  components: {
    FooBar,
    TopBar,
    TabBar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  // 留白 跟随头部和标签栏出现而出现
  .TopBar-space,
  .TabBar-space {
    height: 60px;
    width: 100%;
  }
  .FooBar-space {
    margin-bottom: 51px;
  }
}
</style>