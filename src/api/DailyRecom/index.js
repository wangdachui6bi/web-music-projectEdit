import request from '@/utils/request'

// 获取每日推荐
export const recommendSongs = () => {
  return request({
    method: 'get',
    url: "/recommend/songs"
  })
}