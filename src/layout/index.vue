<template>
  <div class="layout">
    <TopBar v-if="$route.path !== '/login'"></TopBar>
    <div class="main">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    <FooBar v-if="$route.path !== '/login'"></FooBar>
  </div>
</template>

<script>
import FooBar from "@/components/FooBar"
import TopBar from "@/components/TopBar"
export default {
  name: "layout",
  components: {
    FooBar,
    TopBar
  }
}
</script>

<style lang="scss" scoped>
.layout {
  padding-top: 60px;
}
</style>