import request from '@/utils/request'

// 获取已收藏专辑列表
export const getColAlbum = () => {
  return request({
    method: 'get',
    url: "/album/sublist"
  })
}
// 获取已收藏歌手列表
export const getColArtists = () => {
  return request({
    method: 'get',
    url: "/artist/sublist"
  })
}
// 获取已收藏视频列表
export const getColMV = () => {
  return request({
    method: 'get',
    url: "/mv/sublist"
  })
}