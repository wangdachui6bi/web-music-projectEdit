import Vue from 'vue'
import App from './App.vue'
// 生产版本通过cdn引入
// import './plugins/vant.js'
// import './plugins/element.js'
import router from './router'
import store from './store'
// 导入删除cookie
import clearCookie from './utils/clearCookie'
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
// 防止路由重复性跳转出现报错
window.onunload = () => {
  clearCookie()
}