import request from '@/utils/request'

/**
 * 获取排行榜
 * @return {code,list} 
 * list是一个对象数组 coverImgUrl是排行榜的封面 name是排行榜的名字 
 * id是歌单id 用于查询歌单详情
 */
export const getTopList = () => {
  return request({
    method: 'GET',
    url: '/toplist'
  })
}

/**
 * 获取歌单详情 只差前四个
 * @return {code,playlist} 
 * playlist是被查询的歌单信息  
 * playlist中有一个tracks对象数组, 
 * al.name是歌名 al.picUrl是歌曲链接  ar[0].name是歌手
 */
export const getListDetails = (id) => {
  return request({
    method: 'GET',
    url: `/toplist?${id}`
  })
}