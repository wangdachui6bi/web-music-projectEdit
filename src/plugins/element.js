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
  Empty,
  Pagination,
  Table,
  TableColumn,
  Tooltip,
  Menu,
  MenuItem,
  Submenu,
  MenuItemGroup,
  Skeleton,
  SkeletonItem
} from 'element-ui'

import 'element-ui/lib/theme-chalk/index.css'

Vue.use(Button)
Vue.use(Form)
Vue.use(SkeletonItem)
Vue.use(Submenu)
Vue.use(Skeleton)
Vue.use(MenuItemGroup)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
// 按需应用ElementUI
Vue.use(Carousel)
Vue.use(CarouselItem)
Vue.use(InfiniteScroll)
Vue.use(Icon)
Vue.use(Empty)
Vue.use(Pagination)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Tooltip)

// 按需引入babel.config.js需要配置官方对应的规则


// 因为//由于Message组件并没有install方法供Vue来操作的，是直接返回的，
// 所以Message不能被Vue.use 直接进行添加就好
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm // 消息确认