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
  }
]

