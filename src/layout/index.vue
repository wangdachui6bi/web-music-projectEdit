<template>
  <div class="layout">
    <TopBar v-if="$route.path !== '/login'"></TopBar>
    <div class="main">
      <TabBar v-if="TabList.includes($route.path)" />
      <router-view></router-view>
    </div>
    <FooBar v-if="$route.path !== '/login'"></FooBar>
  </div>
</template>

<script>
import FooBar from "@/components/FooBar"
import TopBar from "@/components/TopBar"
import TabBar from "@/components/TabBar"
export default {
  name: "layout",
  data () {
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
  padding-top: 60px;
  .main {
    margin-bottom: 51px;
  }
}
</style>