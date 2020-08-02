export const Error404 = () =>
  import(/* webpackChunkName: 'Error404' */ '@/views/Error404')
// 基础信息
const BasicSet = () =>
  import(/* webpackChunkName: 'BasicSet' */ '@/views/basicSet')
const StoreInfo = () =>
  import(/* webpackChunkName: 'BasicStoreInfo' */ '@/views/basicSet/StoreInfo')
const PersonalSet = () =>
  import(
    /* webpackChunkName: 'BasicPersonalSet' */ '@/views/basicSet/PersonalSet'
  )
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
  // - - - - - - - - - - - - - - - - 基础模块 - - -
  {
    path: '/basic/store',
    name: 'basic',
    component: BasicSet,
    meta: {
      title: '门店信息',
      isMenu: true,
      icon: 'el-icon-document'
    },
    children: [
      {
        path: '/basic/store',
        name: 'storeInfo',
        component: StoreInfo,
        meta: {
          // pTitle: '门店信息',
          title: '详情'
          // isMenu: true
        }
      },
      {
        path: '/basic/personal',
        name: 'personalSet',
        component: PersonalSet,
        meta: {
          title: '个人设置'
          // isMenu: true
        }
      }
    ]
  }
]
