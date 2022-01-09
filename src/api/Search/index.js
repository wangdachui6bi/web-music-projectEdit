// /search/hot/detail

import request from '@/utils/request'

// 热搜榜
export const hotSearch = () => {
  return request({
    method: 'get',
    url: "/search/hot/detail"
  })
}

// 搜索
export const searchKeyword = (keyword, type, offset) => {
  return request({
    method: 'get',
    url: `/cloudsearch?keywords=${keyword}&&type=${type}&&offset=${offset}`
  })
}
