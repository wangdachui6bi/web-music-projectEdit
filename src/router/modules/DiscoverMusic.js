export default [
  {
    path: '/personalrecom',
    component: () => import('@/views/DiscoverMusic/PersonalRecom'),
    meta: {
      needHead: true,
      tittle: '个性推荐'
    }
  },
  {
    name: "ArtistList",
    path: '/artistlist',
    component: () => import('@/views/DiscoverMusic/ArtistList'),
    meta: {
      needHead: true,
      tittle: '歌手列表'
    }
  },
  {
    name: "TopList",
    path: '/toplist',
    component: () => import('@/views/DiscoverMusic/TopList'),
    meta: {
      needHead: true,
      tittle: '排行榜'
    }
  },
  {
    name: "ArtistListInfo",
    path: '/artistdetail/:id',
    component: () => import('@/views/DiscoverMusic/ArtistList/ArtistsListInfo'),
    props: true,
    meta: {
      needHead: true,
      tittle: '歌手主页'

    }
  },
  {

    name: "PlayList",
    path: '/playlist',
    component: () => import("@/views/DiscoverMusic/PlayList"),
    meta: {
      needHead: true,
      tittle: '歌单列表'
    }
  },
  {
    name: "Newsongs",
    path: '/newsongs',
    component: () => import("@/views/DiscoverMusic/NewSongs"),
    meta: {
      needHead: true,
      tittle: '最新音乐'
    }
  },
  // 歌单详情页
  {
    name: "PlayListDetail",
    path: "/playlistdetail/:id",
    component: () => import('@/views/DiscoverMusic/PlayList/PlayListDetail'),
    props: true,
    meta: {
      needHead: true,
      tittle: '歌单详情'
    }
  },
  // 专辑详情页
  {
    props: true,
    name: "AlbumDetail",
    path: "/albumdetail/:id",
    component: () => import('@/views/DiscoverMusic/NewSongs/AlbumListDetail'),
    meta: {
      needHead: true,
      tittle: '专辑详情'
    }
  },
  {
    name: "PlayMvDetail",
    path: "/videodetail/mv/:id",
    component: () => import('@/views/DiscoverMusic/MvInfo'),
    props: true,
    meta: {
      needHead: true,
      tittle: 'MV详情'
    }
  }
]

