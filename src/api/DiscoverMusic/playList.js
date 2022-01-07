import request from '../../utils/request'
// 获取歌单分类
/* 根据分类获取歌单 */
export const getAllCat = () => {
  return request({
    method: 'get',
    url: '/playlist/catlist'
  })
}
// 获取热门歌单选项
export const getHotCat = () => {
  return request({
    method: 'get',
    url: '/playlist/hot'
  })
}
// 根据tag获取精品推荐歌单 限制条数
export const getplaylist = ({ limit = 50, order = 'hot', cat, page = 0 }) => {
  const offset = page * limit
  cat = encodeURIComponent(cat)
  return request({
    method: 'get',
    url: `/top/playlist?limit=${limit}&&order=${order}&&cat=${cat}&&offset=${offset}`
  })
}
// 全部的
export const getplaylistAll = ({ order = 'hot', cat }) => {
  cat = encodeURIComponent(cat)
  return request({
    method: 'get',
    url: `/top/playlist?&&order=${order}&&cat=${cat}`
  })
}
// 根据高质量精品推荐tag 获取高质量歌单
export const getHighquality = ({ limit = 1, cat }) => {
  cat = encodeURIComponent(cat)
  return request({
    method: 'get',
    url: `/top/playlist/highquality?limit=${limit}&&cat=${cat}`
  })
}
// 获取高质量精品推荐tag
export const getHighqualityTags = (limit, cat, before) => {
  cat = encodeURIComponent(cat)
  return request({
    method: 'get',
    url: `/playlist/highquality/tags`
  })
}
