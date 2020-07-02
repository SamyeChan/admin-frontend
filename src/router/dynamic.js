// // 模块1
// const Module1 = () =>
//   import(/* webpackChunkName: 'Module1' */ '@/views/module1')
// const Module1List = () =>
//   import(/* webpackChunkName: 'Module1List' */ '@/views/module1/List')
// const Module1Detail = () =>
//   import(/* webpackChunkName: 'Module1Detail' */ '@/views/module1/Detail')
// // 模块2
// const Module2 = () =>
//   import(/* webpackChunkName: 'Module2' */ '@/views/module2')
// const Module2List = () =>
//   import(/* webpackChunkName: 'Module2List' */ '@/views/module2/List')
// const Module2Detail = () =>
//   import(/* webpackChunkName: 'Module2Detail' */ '@/views/module2/Detail')

/**
 * 路由配置 | 需前端动态挂载
 *
 * @description 根据后台返回的路由进行筛选
 *
 * @param path 路由路径 --> 权限判断依据 //! FIXME - 后续应该设定以“名称”作为判断依据
 * @param name 路由名称
 * @param component 相关组件
 * @param meta 路由携带信息
 *      - title：路由名称 --> 若路由为菜单，则会显示于侧边栏；//! RD_first
 *      - isMenu：路由类型（是否为菜单）；//! RD_first
 *      - icon：菜单图标 --> 暂时仅一级菜单支持图标；
 *      - keepAlive：页面是否开启缓存；
 */

export const dynamicRoutes = [
  // {
  //   path: '/module1',
  //   name: 'module1',
  //   component: Module1,
  //   redirect: '/module1/list',
  //   meta: {
  //     title: '模块1',
  //     isMenu: true,
  //     icon: 'el-icon-s-goods'
  //   },
  //   children: [
  //     {
  //       path: '/module1/list',
  //       name: 'module1List',
  //       component: Module1List,
  //       meta: {
  //         pTitle: '模块1',
  //         title: '列表',
  //         isMenu: true
  //       }
  //     },
  //     {
  //       path: '/module1/detail',
  //       name: 'module1Detail',
  //       component: Module1Detail,
  //       meta: {
  //         pTitle: '模块1',
  //         title: '详情',
  //         isMenu: false
  //       }
  //     }
  //   ]
  // },
  // {
  //   path: '/module2',
  //   name: 'module2',
  //   component: Module2,
  //   redirect: '/module2/list',
  //   meta: {
  //     title: '模块2',
  //     isMenu: true,
  //     icon: 'el-icon-s-goods'
  //   },
  //   children: [
  //     {
  //       path: '/module2/list',
  //       name: 'module2List',
  //       component: Module2List,
  //       meta: {
  //         pTitle: '模块2',
  //         title: '列表',
  //         isMenu: true
  //       }
  //     },
  //     {
  //       path: '/module2/detail',
  //       name: 'module2Detail',
  //       component: Module2Detail,
  //       meta: {
  //         pTitle: '模块2',
  //         title: '详情',
  //         isMenu: false
  //       }
  //     }
  //   ]
  // }
]
