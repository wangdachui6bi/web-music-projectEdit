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
  Icon,
  Table,
  TableColumn
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
Vue.use(Table)
Vue.use(TableColumn)

Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm // 消息确认