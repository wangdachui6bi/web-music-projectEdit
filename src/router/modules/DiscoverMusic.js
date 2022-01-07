export default [
  {
    name: "PersonalRecom",
    path: '/personalrecom',
    component: () => import('@/views/DiscoverMusic/PersonalRecom')
  },
  {
    name: "ArtistsList",
    path: '/artistlist',
    component: () => import('@/views/DiscoverMusic/ArtistsList')
  },
  {
    name: "ArtistsListInfo",
    path: '/ArtistsListInfo',
    component: () => import('@/views/DiscoverMusic/ArtistsListInfo')
  }
]

