export default [
  {
    name: "DailyRecom",
    path: '/dailyrecom',
    component: () => import('@/views/DailyRecom'),
    meta: {
      needHead: true,
      tittle:'每日推荐'
    }
  }
]

