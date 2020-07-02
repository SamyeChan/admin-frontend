import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import types from '../store/types'
import { Storage, UtilMethods } from '../utils'
import { constantRoutes } from './constant'
const util = new UtilMethods()
const storage = new Storage()

Vue.use(VueRouter)

const router = new VueRouter({
  routes: constantRoutes
})

// 全局守卫
router.beforeEach((to, from, next) => {
  // 设置页面头部标签
  document.title = to.meta.title || ''
  const vuex = storage.get('vuex')
  const { permissionRoutes } = store.state.permission
  if (vuex && !util.checkIsEmpty(vuex.userInfo)) {
    // 缓存中是否含登录记录 --> 无则向下进行用户信息请求
    if (!util.checkIsEmpty(permissionRoutes)) {
      // 已挂载路由或者游客
      next()
      return
    }
  }
  store.dispatch(types.ASYNC_GET_USER_INFO_MENU).then(res => {
    const {
      menu, // 权限路由列表
      user: { roles }
    } = res
    // 挂载权限路由
    store.dispatch(types.MOUNT_PERMISSION_ROUTES, menu).then(() => {
      // 若角色含“游客”，则跳转首页 --> //! FIXME - 若无游客首页，如何处理？
      if (roles.join().indexOf('anonymous') === -1) {
        next('/')
        return
      }
      next({ ...to, replace: true })
    })
  })
})

export default router

/**
 * 挂载路由前重置路由
 * 为解决addRoutes挂载路由时，上一次挂载的路由不会重置问题
 */
export function resetRouter() {
  router.matcher = new VueRouter({
    routes: constantRoutes
  }).matcher
}
