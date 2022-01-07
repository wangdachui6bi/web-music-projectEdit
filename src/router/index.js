import Vue from 'vue'
import VueRouter from 'vue-router'
import NoFoundPages from './modules/noFoundPages'
// 路由写为数组形式 方便写同级的路由 进行路由懒加载
// 路由写为数组形式 方便写同级的路由 进行路由懒加载
// 模块化引入
import login from "./modules/Login"
import DiscoverMusic from "./modules/DiscoverMusic"
import DailyRecom from './modules/DailyRecom'
import { Toast } from 'vant'
Vue.use(Toast)
Vue.use(VueRouter)
// 路由写为数组形式 方便写同级的路由 进行路由懒加载
const routes = [
  ...login,
  ...DiscoverMusic,
  ...DailyRecom,
  NoFoundPages,
  {
    path: "/",
    redirect: "/personalrecom"
  }
]

const router = new VueRouter({
  routes
})

// 全局前置守卫
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    // 如果登录了就放行
    if (sessionStorage.getItem("isLogin")) {
      next()
    } else {
      next("/login")
    }
  } else {
    if (sessionStorage.getItem("isLogin")) {
      Toast("您已登录！")
      router.push("/")
    } else {
      next()
    }
  }
})

export default router
