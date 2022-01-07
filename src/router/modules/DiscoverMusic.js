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
    name: "TopList",
    path: '/toplist',
    component: () => import('@/views/DiscoverMusic/TopList')
  }
]

