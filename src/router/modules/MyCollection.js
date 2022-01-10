export default {
  name: "MyCollection",
  path: "/mycollection",
  component: () => import('@/views/MyCollection'),
  meta: {
    needHead: true
  }
}