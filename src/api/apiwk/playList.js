import request from '../../utils/request'
// 获取歌单分类
/* 根据分类获取歌单 */
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

// export const getHighqualityTags = () => get('/playlist/highquality/tags')
// export const getHighquality = (limit, cat, before) => get('/top/playlist/highquality', { limit, cat, before })