export default [
  {
    path: '/',
    component: () => import('@/commponents/header-bar/navlist.vue')
  },
  {
    path: '/artistlist',
    component: () => import('../../views/DiscoverMusic/ArtistsList.vue')
  }
]

