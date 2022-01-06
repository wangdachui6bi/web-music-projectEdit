import request from '../../utils/request'
/* 获取推荐歌单 */
export const getPersonalized = (limit) => {
  return request({
    method: 'get',
    url: `/personalized?limit=${limit}`
  })
}


