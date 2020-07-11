<template>
  <div
    id="app"
    v-loading="loading"
    :element-loading-text="`${BASE.TITLE_ABBR} 拼命加载中...`"
  >
    <!-- 系统主页 -->
    <CHome :menuList="menuList" v-if="!loading && hasAuth && !notFound" />
    <!-- 无权限页面 -->
    <CNoAuth v-if="!loading && !hasAuth && !notFound" />
    <!-- 404 -->
    <router-view name="notFound" v-if="hasAuth && notFound" />
  </div>
</template>

<script>
import BASE from '@/assets/baseConf'
import CNoAuth from './views/NoAuth'
import CHome from './views/Home'
import { mapState } from 'vuex'
import { constantRoutes } from '@/router/constant'
import { UtilMethods } from '@/utils'

const util = new UtilMethods()

export default {
  name: 'app',
  components: { CNoAuth, CHome },
  data() {
    return {
      BASE,
      loading: true, // 加载
      hasAuth: false, // 是否有权限
      notFound: false // 404
    }
  },
  computed: {
    ...mapState({
      permissionRoutes: state => state.permission.permissionRoutes
    }),
    // 侧边菜单列表 --> 权限判断依据
    menuList() {
      // 遍历所有项（包括children），过滤出路由中的菜单项
      function filterMenu(arr, spcPath) {
        let menu = arr
          ? arr.filter((item, index) => {
              if (item.children) {
                item.children = filterMenu(arr[index].children, spcPath)
              }
              return item.path !== spcPath && item.meta && item.meta.isMenu
            })
          : []
        return menu
      }

      let permissionArr = filterMenu(this.permissionRoutes, '*')
      let constantArr = filterMenu(constantRoutes, '/')
      // 静态路由会放置在动态路由前面
      permissionArr = constantArr.concat(permissionArr)

      return this.handleChildrenPath(permissionArr)
    }
  },
  watch: {
    menuList(val) {
      this.hasAuth = val.length > 0
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    '$route.name'(val) {
      this.notFound = val === 'error404'
    }
  },
  methods: {
    // 拼接children中的path，最多支持三层，不支持递归
    handleChildrenPath(menuList) {
      const path = require('path')
      const menus = util.deepCopy(menuList)
      for (let i = 0; i < menus.length; i++) {
        let child1 = menus[i].children
        if (child1 && child1.length > 0) {
          for (let j = 0; j < child1.length; j++) {
            if (!child1[j].path.startsWith('/')) {
              child1[j].path = path.join(menus[i].path, child1[j].path)
            }
            let child2 = child1[j].children

            if (child2 && child2.length > 0) {
              for (let k = 0; k < child2.length; k++) {
                if (!child2[k].path.startsWith('/')) {
                  child2[k].path = path.join(child1[j].path, child2[k].path)
                }
              }
            }
          }
        }
      }
      return menus
    }
  }
}
</script>

<style lang="scss">
html,
body,
#app {
  margin: 0px;
  padding: 0px;
  // background-color: #f0f2f5;
  background-color: #fff;
  height: 100%;
}
html,
body {
  overflow: hidden;
}
#app {
  overflow: auto !important;
}
#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB',
    'Microsoft YaHei', '微软雅黑', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
@media screen and (max-width: 600px) {
  html,
  body,
  #app {
    width: 100%;
    height: 100%;
  }
}
</style>
