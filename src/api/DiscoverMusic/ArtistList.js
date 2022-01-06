import request from '@/utils/request'

export const artistList = ({ type, area, initial }) => {
  return request({
    method: 'get',
    url: `/artist/list?limit=30&offset=0&type=${type}&area=${area}&initial=${initial}`
  })
}