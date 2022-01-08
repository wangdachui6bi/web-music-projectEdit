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
  // 歌单详情页
  {
    name: "PlayListDetail",
    path: "/playlistdetail/:id",
    component: () => import('@/views/DiscoverMusic/PlayList/PlayListDetail'),
    props: true
  }
]

