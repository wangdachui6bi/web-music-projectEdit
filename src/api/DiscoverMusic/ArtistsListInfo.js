import request from '@/utils/request'

export const artistListInfo = (id) => {
    return request({
        method: 'get',
        url: `/artist/songs?id=${id}`
    })
}