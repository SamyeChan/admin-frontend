import { getUserInfo } from '@/api/auth'
import types from '../types'

export default {
  state: {
    userInfo: null, // 用户信息
    permissionRoutes: [], // router最终挂载的路由
    orgActive: null // 用户当前选中门店
  },
  mutations: {
    // 设置用户信息
    [types.SET_USER_INFO]: (state, data) => {
      state.userInfo = data
    }
  },
  actions: {
    // 获取用户信息，并存入vuex（持久化）--> 用户信息请求成功后才进行权限路由请求
    [types.ASYNC_GET_USER_INFO_MENU]: ({ commit }) => {
      return new Promise((resolve, reject) => {
        const fn = async function() {
          try {
            let userInfo
            try {
              userInfo = await getUserInfo()
            } catch (err1) {
              commit(types.SET_USER_INFO, null)
              reject(err1)
            }
            commit(types.SET_USER_INFO, userInfo)
            resolve(userInfo)
          } catch (err) {
            reject(err)
          }
        }
        fn()
      })
    }
  }
}
