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
  }
]

