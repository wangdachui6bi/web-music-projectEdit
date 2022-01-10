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
export const getVideoByTag = (id, offset) => {
  return request({
    method: 'get',
    url: `/video/group?id=${id}&&offset=${offset}`
  })
}