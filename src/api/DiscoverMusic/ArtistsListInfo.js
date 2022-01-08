import request from '@/utils/request'

export const artistListInfo = (id) => {
    return request({
        method: 'get',
        url: `/artist/detail?id=${id}`
    })
}

export const getArtistAlbumTop = (id) => {
    return request({
        method: 'get',
        url: `/artist/top/song?id=${id}`
    })
}

export const getArtistAlbum = (id) => {
    return request({
        method: 'get',
        url: `/artist/album?id=${id}`
    })
}

export const getArtistMV = (id) => {
    return request({
        method: 'get',
        url: `/artist/mv?id=${id}`
    })
}

export const getSimilar = (id) => {
    return request({
        method: 'get',
        url: `/simi/artist?id=${id}`
    })
}