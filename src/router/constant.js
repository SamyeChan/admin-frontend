export const Error404 = () =>
  import(/* webpackChunkName: 'Error404' */ '@/views/Error404')
// 静态页
const ConstPage = () =>
  import(/* webpackChunkName: 'ConstPage' */ '@/views/constPage')
  // 搜索页
const Search = () => import(/* webpackChunkName: 'Search' */ '@/views/searchDemo')
const SearchBasic = () =>
  import(/* webpackChunkName: 'SearchBasic' */ '@/views/searchDemo/Basic')
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
  },
  {
    path: '/searchDemo',
    name: 'searchDemo',
    component: Search,
    redirect: { name: 'searchBasic' },
    meta: {
      title: '搜索页',
      isMenu: true
      // icon: 'el-icon-s-goods'
    },
    children: [
      {
        path: 'basic',
        name: 'searchBasic',
        component: SearchBasic,
        meta: {
          pTitle: '搜索页',
          title: '基础搜索',
          isMenu: true
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
