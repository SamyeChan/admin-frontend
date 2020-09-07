// - - - - - - 路由容器 - - -
const PageWrapper = () =>
  import(
    /* webpackChunkName: 'PageWrapper' */ '@/components/layout/PageWrapper'
  )

// - - - - - - demo页面 - - -
const OnePage = () =>
  import(/* webpackChunkName: 'OnePage' */ '@/views/demoPage/One')
const TwoPage = () =>
  import(/* webpackChunkName: 'TwoPage' */ '@/views/demoPage/Two')

// - - - - - - 404页面 - - -
const Error404 = () =>
  import(/* webpackChunkName: 'Error404' */ '@/views/Error404')

/**
 * 路由配置 | 固定路由
 * @description 无权限限制路由
 *
 * ---
 *
 * @param path 路由路径 --> 权限判断依据 //! FIXME - 后续应该设定以 name 作为判断依据
 * @param name 路由名称
 * @param component 相关组件
 * @param meta 路由携带信息
 *      - title：路由名称 --> 若路由为菜单，则会显示于侧边栏；//! RD_first
 *      - isMenu：路由类型（是否为菜单）；//! RD_first
 *      - icon：菜单图标 --> 暂时仅一级菜单支持图标；
 *      - keepAlive：页面是否开启缓存；
 */
export const constantRoutes = [
  {
    path: '/'
  },
  // - - - - 同级单页面 - - - -
  {
    name: 'demoSingle',
    path: '/demoS',
    component: OnePage,
    meta: {
      title: 'DEMO-single',
      isMenu: true,
      icon: 'el-icon-document'
    }
  },
  // - - - - 同级多页面 - - - -
  {
    name: 'demoMulti',
    path: '/demoM',
    redirect: '/demoM/one',
    component: PageWrapper,
    meta: {
      title: 'DEMO-multiple',
      isMenu: true,
      icon: 'el-icon-document'
    },
    children: [
      {
        name: 'demoOne',
        path: 'one',
        component: OnePage,
        meta: {
          title: 'One',
          isMenu: true
        }
      },
      {
        name: 'demoTwo',
        path: 'two',
        component: TwoPage,
        meta: {
          title: 'Two',
          isMenu: true
        }
      }
    ]
  },
  // - - - - 404页面 - - - -
  {
    path: '*',
    name: 'error404',
    components: {
      notFound: Error404
    }
  }
]
