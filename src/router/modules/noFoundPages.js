export default {
  name: "notFound",
  path: '*',
  component: () => import('@/views/NoFoundPages/NoFoundPages'),
  meta: {
    needHead: false,
    tittle: '找不到页面'
  }
}