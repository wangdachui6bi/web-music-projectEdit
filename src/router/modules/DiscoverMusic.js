export default [
  {
    path: '/artistlist',
    component: () => import('@/views/DiscoverMusic/ArtistList'),
    meta: {
      needHead: true
    }
  },
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

    name: "PlayList",
    path: '/playlist',
    component: () => import("@/views/DiscoverMusic/PlayList"),
    meta: {
      needHead: true
    }
  },
  {

    name: "NewSongs",
    path: '/newsongs',
    component: () => import("@/views/DiscoverMusic/NewSongs"),
    meta: {
      needHead: true
    }
  }
]

