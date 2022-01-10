import request from '@/utils/request'

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