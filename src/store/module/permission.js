import { getUserInfo, getUserMenu } from '@/api/auth'
import types from '../types'
import router, { resetRouter } from '@/router'
import { Error404 } from '@/router/constant'
import { dynamicRoutes } from '@/router/dynamic'
import { UtilMethods } from '@/utils'
const util = new UtilMethods()

export default {
  state: {
    userInfo: null, // 用户信息
    permissionRoutes: [] // router最终挂载的路由
  },
  mutations: {
    // 设置用户信息
    [types.SET_USER_INFO]: (state, data) => {
      state.userInfo = data
    },
    // 设置权限路由
    [types.SET_MOUNTED_ROUTES]: (state, data) => {
      state.permissionRoutes = data
    }
  },
  actions: {
    // 获取用户信息，并存入vuex（持久化）--> 用户信息请求成功后才进行权限路由请求
    [types.ASYNC_GET_USER_INFO_MENU]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(resData1 => {
            commit(types.SET_USER_INFO, { user: resData1 })
            getUserMenu()
              .then(resData2 => {
                const userInfo = {
                  user: resData1,
                  menu: resData2
                }
                commit(types.SET_USER_INFO, userInfo)
                resolve(userInfo)
              })
              .catch(err2 => {
                reject(err2)
              })
          })
          .catch(err1 => {
            commit(types.SET_USER_INFO, null)
            reject(err1)
          })
      })
    },
    // 挂载权限路由 --> 通过后台传回的权限，生成权限路由并进行挂载
    [types.MOUNT_PERMISSION_ROUTES]: ({ commit }, permissionList) => {
      return new Promise((resolve, reject) => {
        if (util.checkDataType(permissionList) === 'array') {
          let mountedRoutes = util.deepCopy(dynamicRoutes)
          // 生成权限路由
          generatePermissionRoutes(mountedRoutes, permissionList)
          console.log('mountedRoutes', mountedRoutes)
          // 404处理
          mountedRoutes.push({
            path: '*',
            name: 'error404',
            components: {
              notFound: Error404
            }
          })
          // 重置路由 --> 恢复至无权状态
          resetRouter()
          // 挂载权限路由
          router.addRoutes(mountedRoutes)
          // 保存重置redirect后的权限路由，供菜单使用
          commit(types.SET_MOUNTED_ROUTES, mountedRoutes)
          resolve(mountedRoutes)
        } else {
          console.error(
            `${types.MOUNT_DYNAMIC_ROUTER} permissionList: param is not array`
          )
          reject(new Error('用户权限出错!'))
        }
      })
    }
  }
}

/**
 * 动态路由表中筛选出有权限的路由表
 * 支持递归深度筛选，筛选标识name
 * @param {Array} dynamicRoutes 前端动态路由表
 * @param {Array} permissionList 后台传回的权限路由表
 */
function generatePermissionRoutes(dynamicRoutes, permissionList) {
  if (util.checkDataType(dynamicRoutes) === 'array') {
    for (var i = 0; i < dynamicRoutes.length; i++) {
      let isMatch = false // 是否匹配（动态路由 vs 权限路由）
      let matchIndex = null // 匹配的权限路由下标
      for (let j in permissionList) {
        //! FIXME - 用name匹配比较好 --> 但修改的话需要md配合
        if (dynamicRoutes[i].name === permissionList[j].name) {
          dynamicRoutes[i].meta = Object.assign(
            dynamicRoutes[i].meta,
            permissionList[j].meta
          ) // meta：title/isMenu 从md后台获取
          isMatch = true
          matchIndex = j
          break
        }
      }
      // 若无匹配项，则去除该路由
      if (!isMatch) {
        dynamicRoutes.splice(i, 1)
        i--
      }
      // 若含匹配项，继续匹配其子路由
      if (isMatch && dynamicRoutes[i].children) {
        generatePermissionRoutes(
          dynamicRoutes[i].children,
          permissionList[matchIndex].children
        )
      }
    }
  }
}
