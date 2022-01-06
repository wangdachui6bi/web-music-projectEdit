import Vue from 'vue'
import VueRouter from 'vue-router'
import headerBar from './modules/header'
Vue.use(VueRouter)
// 路由写为数组形式 方便写同级的路由 进行路由懒加载
const routes = [
  ...headerBar
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router
