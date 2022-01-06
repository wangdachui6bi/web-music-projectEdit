import request from '@/utils/request'

/* 获取轮播图 */
export const getBanner = () => request('/banner')

/* 获取推荐歌单 */
export const getPersonalized = (limit) => {
  return request({
    method: 'get',
    url: `/personalized?limit=${limit}`
  })
}


