import request from '@/utils/request'

// 登录
export const login = ({ phone, password }) => {
  return request({
    method: 'POST',
    url: "/login/cellphone",
    data: {
      phone,
      password
    }
  })
}
// 退出
export const logout = () => {
  return request({
    method: 'get',
    url: "/logout"
  })
}

// 登录状态
export const userAccount = () => {
  return request({
    method: 'get',
    url: `/user/account?${new Date().getTime()}`
  })
}