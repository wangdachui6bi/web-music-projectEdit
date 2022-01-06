<template>
  <div class="app">
    <Layout></Layout>
  </div>
</template>
<script>
import Layout from "@/layout"
import { userAccount } from "@/api/login.js"
export default {
  data () {
    return {

    }
  },
  components: {
    Layout
  },
  methods: {
    async getAccount () {
      const res = await userAccount()
      console.log(res)
      // 将数据传给Vuex
      this.$store.commit('login/setProfile', res.data.profile)
      this.$store.commit('login/setAccount', res.data.account)
    }
  },
  mounted () {
    this.getAccount()
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
</style>
