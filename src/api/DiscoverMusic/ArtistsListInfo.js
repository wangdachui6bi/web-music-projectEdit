import request from '@/utils/request'

export const artistListInfo = (id) => {
    return request({
        method: 'get',
        url: `/artist/detail?id=${id}`
    })
}

// 获取歌手top50歌曲
export const getArtistAlbumTop = (id) => {
    return request({
        method: 'get',
        url: `/artist/top/song?id=${id}`
    })
}

// 获取歌手专辑 改接口需要保存专辑id以便后面获取另一个接口专辑时间
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

// 获取歌手详情
export const getArtistDetails = (id) => {
    return request({
        method: 'get',
        url: `/artist/desc?id=${id}`
    })
}

// 获取音乐时间 该接口信息id 用来查询歌曲信息.还要拿专辑id 要传入专辑id albumId
export const getAlbumContent = (albumId) => {
    return request({
        method: 'get',
        url: `album?id=${albumId}`
    })
}