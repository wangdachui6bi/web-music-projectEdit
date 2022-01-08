export default [
  {
    name: "PersonalRecom",
    path: '/personalrecom',
    component: () => import('@/views/DiscoverMusic/PersonalRecom')
  },
  {
    name: "ArtistList",
    path: '/artistlist',
    component: () => import('@/views/DiscoverMusic/ArtistList')
  },
  {
    name: "TopList",
    path: '/toplist',
    component: () => import('@/views/DiscoverMusic/TopList')
  },
  {
    name: "ArtistListInfo",
    path: '/artistdetail/:id',
    component: () => import('@/views/DiscoverMusic/ArtistList/ArtistsListInfo'),
    props:true
  }
]

