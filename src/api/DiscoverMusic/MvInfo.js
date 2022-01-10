import request from '@/utils/request'

// 获取视频播放地址
export const getMvDetail = (id) => {
  return request({
    method: 'get',
    url: `/mv/url?id=${id}`
  })
}

// 获取mv的歌手详情
export const getMvArtist = (id) => {
  return request({
    method: 'get',
    url: `/mv/detail?mvid=${id}`
  })
}

// 获取视频点赞转发评论数据
export const getMvLikeNumber = (id) => {
  return request({
    method: 'get',
    url: `/mv/detail/info?mvid=${id}`
  })
}

// 获取mv的评论 tid为type值 0: 歌曲 1mv 2歌单
export const getMvComment = (id) => {
  return request({
    method: 'get',
    url: `/comment/hot?id=${id}&type=1&limit=5`
  })
}