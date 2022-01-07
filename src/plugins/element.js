import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Avatar,
  Message,
  MessageBox,
  Carousel,
  CarouselItem,
  InfiniteScroll,
  Icon
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InfiniteScroll)
Vue.use(Icon)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm // 消息确认