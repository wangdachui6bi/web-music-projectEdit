import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import './plugins/element.js'
import router from './router'
import store from './store'
// 引入矢量图
import '@/assets/css/index.css'
import '@/assets/fonts/iconfont/iconfont.css'

// rem适配
// import 'lib-flexible'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
