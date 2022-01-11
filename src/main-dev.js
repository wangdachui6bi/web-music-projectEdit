import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import './plugins/element.js'
import router from './router'
import store from './store'
// 在mainjs先引入
import VueRouter from "vue-router"

// 引入矢量图
import '@/assets/css/index.css'
import '@/assets/fonts/iconfont/iconfont.css'

// rem适配
import 'lib-flexible'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')

// 再写这些
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
// 防止路由重复性跳转出现报错