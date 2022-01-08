import request from '@/utils/request'

/* 获取轮播图 */
export const getBanner = () => request('/banner')

/* 获取热门歌单 */
export const getPersonalized = (limit) => {
  return request({
    method: 'get',
    url: `/personalized?limit=${limit}`
  })
}

/* login 获取个性推荐歌单 */
export const getRecommend = () => request('/recommend/resource')

// Date.now()
/* 获取歌单详情 */
export const getPlayListDetail = (id, timestamp) => {
  return request({
    method: 'get',
    url: `/playlist/detail?id=${id}&timestamp=${timestamp}`
  })
}

/* 喜欢音乐列表(调用此接口 , 传入用户 id, 可获取已喜欢音乐 id 列表(id 数组)) */
export const getLikeIdList = (uid, timestamp) => {
  return request({
    method: 'get',
    url: `/likelist?id=${uid}&timestamp=${timestamp}`
  })
}

/* 喜欢的音乐(调用此接口 , 传入音乐 id, 可喜欢该音乐) */
export const likeMusic = (id, like, timestamp) => {
  return request({
    method: 'get',
    url: `/like?id=${id}&like=${like}&timestamp=${timestamp}`
  })
}