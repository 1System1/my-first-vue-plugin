
const routers=[
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: '首页',
    meta: { title: ' 首页' },
    component: () => import('@c/layout/Layout'),
    redirect: '/indicator',
    children:[
      {
        path:"/indicator",
        name: '指标管理',
        meta: { title: '指标管理' },
        component: () => import('@c/views/indicator/src')
      },
      {
        path:"/test",
        name: '测试',
        meta: { title: '测试' },
        component: () => import('@c/views/test/src')
      },
      {
        path:"/test1",
        name: '测试',
        meta: { title: '测试' },
        component: () => import('@c/views/test/src/index1')
      }
    ]
  }

]


export default routers
