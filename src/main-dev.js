import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router'
import store from './store'
// rem适配
// import 'lib-flexible'
import './assets/fonts/iconfont/iconfont.css'
import './assets/css/index.css'
Vue.config.productionTip = false
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
