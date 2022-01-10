export default {
  name: "HistoryPlay",
  path: '/historyplay',
  component: () => import('@/views/HistoryPlay'),
  meta: {
    needHead: true,
    tittle:'最近播放'
  }
}
