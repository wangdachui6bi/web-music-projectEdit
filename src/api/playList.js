import request from '../utils/request'
// 获取歌单分类
/* 根据分类获取歌单 */
// export const getPlayListByCat = ({ limit, order, cat, offset }) => get('/top/playlist', { limit, order, cat, offset })
export const getPlayListByCat = () => {
  return request({
    method: 'get',
    url: '/search?keywords=海阔天空'
  })
}
export const getAllCat = () => {
  return request({
    method: 'get',
    url: '/playlist/catlist'
  })
}

export const getHotCat = () => {
  return request({
    method: 'get',
    url: '/playlist/hot'
  })
}

export const getplaylist = ({ limit = 50, order = 'hot', cat }) => {
  return request({
    method: 'get',
    url: `/top/playlist?limit=${limit}&&order=${order}&&cat=${cat}`
  })
}

// export const getHighqualityTags = () => get('/playlist/highquality/tags')
// export const getHighquality = (limit, cat, before) => get('/top/playlist/highquality', { limit, cat, before })