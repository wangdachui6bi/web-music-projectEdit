export default [
  {
    name: "Login",
    path: '/login',
    component: () => import('@/views/Login'),
    meta: {
      needHead: false,
      tittle:"登录"
    }
  }
]

