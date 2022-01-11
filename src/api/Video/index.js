/* 视频分类 */

/* 全部视频列表 */
// export const getAllVideo = (offset) => get('/video/timeline/all', { offset })

/* 根据标签获取视频列表 */
// export const getVideoByTag = (id, offset) => get('/video/group', { id, offset })

/* 视频热门分类 */
import request from '@/utils/request'
export const getVideoHotTag = () => {
  return request({
    method: 'get',
    url: '/video/category/list'
  })
}
/* 全部视频列表 */
export const getAllVideo = (offset = 0) => {
  return request({
    method: 'get',
    url: `/video/timeline/all?offset=${offset}`
  })
}
/* 视频分类 */
export const getVideoAlltag = () => {
  return request({
    method: 'get',
    url: '/video/group/list'
  })
}
/* 根据标签获取视频列表 */
// /related/allvideo?id=89ADDE33C0AAE8EC14B99F6750DB954D
export const getVideoByTag = (id, offset) => {
  return request({
    method: 'get',
    url: `/video/group?id=${id}&&offset=${offset}`
  })
}
// 获取视频播放地址
export const getVideoUrl = (id) => {
  return request({
    method: 'get',
    url: `/video/url?id=${id}`
  })
}

// 获取视频详情
export const getVideoDetail = (id) => {
  return request({
    method: 'get',
    url: `/video/detail?id=${id}`
  })
}

// 获取视频点赞转发评论数据
export const getVideoLikeNumber = (id) => {
  return request({
    method: 'get',
    url: `/video/detail/info?vid=${id}`
  })
}

// 获取视频的评论 tid为type值 0: 歌曲 1mv 2歌单
export const getVideoComment = (id) => {
  return request({
    method: 'get',
    url: `/comment/hot?id=${id}&type=5&limit=5`
  })
}
// 根据arer 获取不同地区最新mv
export const getMvNewByArea = (area, limit = 8) => {
  area = encodeURIComponent(area)
  return request({
    method: 'get',
    url: `/mv/first?area=${area}&&limit=${limit}`
  })
}
// 获取网易出品 mv
export const getMvWY = (limit = 8) => {
  return request({
    method: 'get',
    url: `/mv/exclusive/rcmd?limit=${limit}`
  })
}

// 获取不同area排行榜mv
export const getMVTopArea = (area, limit = 8) => {
  area = encodeURIComponent(area)
  return request({
    method: 'get',
    url: `/top/mv?area=${area}&&limit=${limit}`
  })
}