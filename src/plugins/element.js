import Vue from 'vue'
import {
  Button,
  Form,
  FormItem,
  Input,
  Avatar,
  Message,
  MessageBox
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Avatar)
Vue.prototype.$message = Message
Vue.prototype.$confirm = MessageBox.confirm // 消息确认