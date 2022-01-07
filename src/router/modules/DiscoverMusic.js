export default [
  {
    name: "DiscoverMusic",
    path: '/discovermusic',
    component: () => import('@/views/DiscoverMusic')
  },
  {
    path: '/artistlist',
    component: () => import('../../views/DiscoverMusic/ArtistsList')
  },
  {
    path: '/personalrecom',
    component: () => import('@/views/DiscoverMusic/PersonalRecom')
  }
]

