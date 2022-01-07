import Vue from 'vue'
import App from './App.vue'
import './plugins/vant.js'
import './plugins/element.js'
import router from './router'
import store from './store'
// 按需引入ElementUI
import { Carousel, CarouselItem, InfiniteScroll, Icon } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 歌手组件按需引入elementUI-cg
import { Backtop } from ' element-ui '
// 引入矢量图
import '@/assets/css/index.css'
import '@/assets/fonts/iconfont/iconfont.css'

// 按需应用ElementUI
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InfiniteScroll)
Vue.use(Icon)

// 歌手组件按需引入elementUI -cg
Vue.component(Backtop)

// rem适配
// import 'lib-flexible'
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
