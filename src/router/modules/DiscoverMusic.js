export default [
  {
    path: '/personalrecom',
    component: () => import('@/views/DiscoverMusic/PersonalRecom'),
    meta: {
      needHead: true
    }
  },
  {
    name: "ArtistList",
    path: '/artistlist',
    component: () => import('@/views/DiscoverMusic/ArtistList'),
    meta: {
      needHead: true
    }
  },
  {
    name: "TopList",
    path: '/toplist',
    component: () => import('@/views/DiscoverMusic/TopList'),
    meta: {
      needHead: true
    }
  },
  {
    name: "ArtistListInfo",
    path: '/artistdetail/:id',
    component: () => import('@/views/DiscoverMusic/ArtistList/ArtistsListInfo'),
    props: true,
    meta: {
      needHead: true
    }
  },
  {

    name: "PlayList",
    path: '/playlist',
    component: () => import("@/views/DiscoverMusic/PlayList"),
    meta: {
      needHead: true
    }
  },
  {
    name: "Newsongs",
    path: '/newsongs',
    component: () => import("@/views/DiscoverMusic/NewSongs"),
    meta: {
      needHead: true
    }
  },
  // 歌单详情页
  {
    name: "PlayListDetail",
    path: "/playlistdetail/:id",
    component: () => import('@/views/DiscoverMusic/PlayList/PlayListDetail'),
    props: true,
    meta: {
      needHead: true
    }
  },
  // 专辑详情页
  {
    name: "AlbumDetail",
    path: "/albumdetail/:id",
    props: true,
    component: () => import('@/views/DiscoverMusic/NewSongs/AlbumListDetail'),
    meta: {
      needHead: true
    }
  },
  {
    name: "PlayMvDetail",
    path: "/videodetail/mv/:id",
    component: () => import('@/views/DiscoverMusic/MvInfo'),
    props: true,
    meta: {
      needHead: true
    }
  }
]

