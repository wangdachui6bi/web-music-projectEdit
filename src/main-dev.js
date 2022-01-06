import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import router from './router'
import store from './store'
import { Button, Empty } from 'element-ui'
import '@/assets/css/index.css'
import '@/assets/fonts/iconfont/iconfont.css'
// rem适配
// import 'lib-flexible'
Vue.config.productionTip = false

Vue.use(Button)
Vue.use(Empty)
new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
