export const Error404 = () =>
  import(/* webpackChunkName: 'Error404' */ '@/views/Error404')
// 静态页
const ConstPage = () =>
  import(/* webpackChunkName: 'ConstPage' */ '@/views/constPage')

/**
 * 路由配置 | 固定路由
 *
 * @description 无权限限制路由
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
    path: '/',
    meta: {
      isMenu: false
    }
  },
  {
    path: '/constPage',
    name: 'constPage',
    component: ConstPage,
    meta: {
      title: '静态路由页',
      isMenu: true,
      keepAlive: true
    }
  }
]
