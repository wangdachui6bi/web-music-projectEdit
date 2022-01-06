import request from '../utils/request'
export const search = () => {
  return request({
    method: 'get',
    url: '/search?keywords=海阔天空'
  })
}

