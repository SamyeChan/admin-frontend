// 模块1
const Module1 = () =>
  import(/* webpackChunkName: 'Module1' */ '@/views/module1')
const Module1List = () =>
  import(/* webpackChunkName: 'Module1List' */ '@/views/module1/List')
// 表格页
const Table = () => import(/* webpackChunkName: 'Table' */ '@/views/tableDemo')
const TableBasic = () =>
  import(/* webpackChunkName: 'TableBasic' */ '@/views/tableDemo/Basic')
const TablePagination = () =>
  import(
    /* webpackChunkName: 'TablePagination' */ '@/views/tableDemo/Pagination'
  )
const TableSearch = () =>
  import(/* webpackChunkName: 'TableSearch' */ '@/views/tableDemo/Search')
const TableSum = () =>
  import(/* webpackChunkName: 'TableSum' */ '@/views/tableDemo/Sum')

/**
 * 路由配置 | 需前端动态挂载
 *
 * @description 根据后台返回的路由进行筛选
 *
 * @param path 路由路径 --> 权限判断依据 //! FIXME - 后续应该设定以“名称”作为判断依据
 * @param name 路由名称
 * @param redirect 重定向 --> 当路由含有子路由时，该项设定默认路由项
 * @param component 相关组件
 * @param meta 路由携带信息
 *      - title：路由名称 --> 若路由为菜单，则会显示于侧边栏；//! RD_first
 *      - isMenu：路由类型（是否为菜单）；//! RD_first
 *      - icon：菜单图标 --> 暂时仅一级菜单支持图标；
 *      - keepAlive：页面是否开启缓存；
 */

export const dynamicRoutes = [
  {
    path: '/module1',
    name: 'module1',
    component: Module1,
    redirect: '/module1/list',
    meta: {
      title: '模块1',
      isMenu: true
      // icon: 'el-icon-s-goods'
    },
    children: [
      {
        path: '/module1/list',
        name: 'module1List',
        component: Module1List,
        meta: {
          pTitle: '模块1',
          title: '列表',
          isMenu: false
        }
      }
    ]
  },
  {
    path: '/tableDemo',
    name: 'tableDemo',
    component: Table,
    redirect: '/tableDemo/basic',
    meta: {
      title: '表格页',
      isMenu: true
      // icon: 'el-icon-s-goods'
    },
    children: [
      {
        path: '/tableDemo/basic',
        name: 'tableBasic',
        component: TableBasic,
        meta: {
          pTitle: '表格页',
          title: '基础表格',
          isMenu: true
        }
      },
      {
        path: '/tableDemo/pagination',
        name: 'tablePagination',
        component: TablePagination,
        meta: {
          pTitle: '表格页',
          title: '分页表格',
          isMenu: true
        }
      },
      {
        path: '/tableDemo/search',
        name: 'tableSearch',
        component: TableSearch,
        meta: {
          pTitle: '表格页',
          title: '搜索表格',
          isMenu: true
        }
      },
      {
        path: '/tableDemo/sum',
        name: 'tableSum',
        component: TableSum,
        meta: {
          pTitle: '表格页',
          title: '综合表格',
          isMenu: true
        }
      }
    ]
  }
]
