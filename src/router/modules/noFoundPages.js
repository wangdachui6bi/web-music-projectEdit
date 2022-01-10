export default {
  name: "notFound",
  path: '*',
  component: () => import('@/views/NoFoundPages/NoFoundPages'),
  meta: {
    needHead: false,
    tittle:'NotFound'
  }
}