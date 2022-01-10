export default [
  {
    name: "Video",
    path: "/video",
    component: () => import('@/views/Video'),
    meta: {
      needHead: true
    }
  },
  {
    name: "Video",
    path: "/videodetail/v/:id",
    props: true,
    component: () => import('@/views/Video/VideoDetails'),
    meta: {
      needHead: true
    }
  }

]