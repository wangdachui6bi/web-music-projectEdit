export default [
  {
    name: "Video",
    path: "/video",
    component: () => import('@/views/Video'),
    props: true,
    meta: {
      needHead: true,
      tittle: '视频推荐'
    }
  },
  {
    name: "VideoDetail",
    path: "/videodetail/v/:id",
    props: true,
    component: () => import('@/views/Video/VideoDetails'),
    meta: {
      needHead: true,
      tittle: "视频详情"
    }
  }

]