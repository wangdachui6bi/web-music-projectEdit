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

// 获取用户歌单
export const playlist = (uid) => {
  return request({
    method: 'get',
    url: `/user/playlist?uid=${uid}`
  })
}
// 二维码登录获取key
// 并且需要传入时间戳防止缓存
export const getcodekey = (timestamp) => {
  return request({
    method: 'get',
    url: `/login/qr/key?timestamp=${timestamp}`
  })
}
// 根据key生成二维码图片的 base64 和二维码信息
export const createcodemsg = (key, qrimg = true, timestamp) => {
  return request({
    method: 'get',
    url: `/login/qr/create?key=${key}&&qrimg=${qrimg}&&timestamp=${timestamp}`
  })
}
// 二维码检测扫码状态
// 轮询二维码状态 800 为二维码过期,801 为等待扫码,802 为
// 待确认,803 为授权登录成功( 803状态码下会返回 cookies)
export const checkcode = (key, timestamp) => {
  return request({
    method: 'get',
    url: `/login/qr/check?key=${key}&timestamp=${timestamp}`
  })
}
// 验证码登录 
// 获取验证码
export const sendIdentify = (phone) => {
  return request({
    method: 'get',
    url: `/captcha/sent?phone=${phone}`
  })
}
// 验证验证码
export const checkIdentify = (phone, captcha) => {
  return request({
    method: 'get',
    url: `/captcha/verify?phone=${phone}&&captcha=${captcha}`
  })
}
