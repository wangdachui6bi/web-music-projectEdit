import request from '../../utils/request'
// 新歌速递
// 全部:0 华语:7 欧美:96 日本:8 韩国:16
export const getTopNewMusic = (type) => {
  return request({
    method: 'get',
    url: `/top/song?type=${type}`
  })
}
// 新碟上架
export const getTopNewalbum = ({ limit, offset, area, type = 'All', year, month }) => {
  return request({
    method: 'get',
    url: `/top/album?limit=${limit}&type=${type}`
  })
}
