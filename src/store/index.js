import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import permission from './module/permission'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: state => ({ userInfo: state.permission.userInfo }) // 只对userinfo进行持久化
})

export default new Vuex.Store({
  plugins: [vuexLocal.plugin],
  modules: {
    permission
  },
  state: {},
  mutations: {},
  actions: {}
})
