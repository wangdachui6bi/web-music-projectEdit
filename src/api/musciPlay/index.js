import request from '@/utils/request'

// 获取音乐url
export const getMusicUrl = (id) => {
  return request({
    method: 'get',
    url: `/song/url?id=${id}`
  })
}