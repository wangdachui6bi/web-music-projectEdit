export default {
  name: "Search",
  path: '/search/:keyword',
  component: () => import('@/views/Search'),
  props: true,
  meta: {
    needHead: true,
    tittle:'按歌搜索'
  }
}