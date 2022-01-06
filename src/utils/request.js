import axios from 'axios'

// axios适配 开发 测试 产品三种url
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API
})

export default service
