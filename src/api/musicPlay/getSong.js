import request from '@/utils/request'

// 获取音乐url 可以传多个id 逗号
// 前端进行数组遍历 生成str传进来
export const getMusicUrl = (id) => {
  return request({
    method: 'get',
    url: `/song/url?id=` + id
  })
}
// /* 获取音乐详情 */
// '/song/detail'
export const getMusicListByIds = (ids) => {
  return request({
    method: 'get',
    url: '/song/detail?ids=' + ids
  })
}
/* 获取音乐歌词 */
// '/lyric'
export const getLyric = (ids) => {
  return request({
    method: 'get',
    url: '/lyric' + ids
  })
}
// 获取歌单封面
export const getCover = (id) => {
  return request({
    method: 'get',
    url: '/playlist/cover/update?id=' + id
  })
}
// 获得专辑内容
export const getAlbumDetail = (id) => {
  return request({
    method: 'get',
    url: '/album?id=' + id
  })
}