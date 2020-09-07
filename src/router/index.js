import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRoutes } from './constant'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: constantRoutes
})

// 全局守卫
router.beforeEach((to, from, next) => {
  // 设置页面头部标签
  document.title = to.meta.title || ''
  next()
})

export default router
