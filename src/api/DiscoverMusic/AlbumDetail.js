import request from '@/utils/request'

/* 获取专辑内容 */
export const getAlbumDetail = (id) => {
  return request({
    method: 'get',
    url: `/album?id=${id}`
  })
}

/* 专辑评论, 调用此接口 , 传入音乐 id 和 limit 参数 , 可获得该专辑的所有评论 ( 不需要登录) */
export const getAlbumComment = (id) => {
  return request({
    method: 'get',
    url: `/comment/album?id=${id}`
  })
}