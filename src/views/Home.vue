<template>
  <div>
    <!-- MB | 顶部栏 -->
    <div class="header-mb">
      <span class="header-mb-sys-title">{{ BASE.TITLE_CN }}</span>
      <i
        class="el-icon-menu"
        @click="
          isPhFold = !isPhFold
          isFold = false
        "
      ></i>
      <span class="header-mb-user">{{ nickName }}</span>
      <span
        v-if="!isLogin"
        class="header-mb-opt"
        @click="handleCommand('login')"
        >[ 登录 ]</span
      >
      <span v-else class="header-mb-opt" @click="handleCommand('logout')"
        >[ 退出 ]</span
      >
    </div>
    <!-- PC | 顶部栏 -->
    <div class="header-pc">
      <el-avatar class="header-pc-avatar" src="/default-avatar.png"></el-avatar>
      <el-dropdown
        class="header-pc-opt"
        @command="handleCommand"
        placement="bottom"
      >
        <span>{{ nickName }}</span>
        <i class="el-icon-caret-bottom" />
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item v-if="!isLogin" command="login"
            >登录</el-dropdown-item
          >
          <el-dropdown-item v-else command="logout">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <!-- 侧边栏 -->
    <div :class="isPhFold ? 'aside fold' : 'aside'">
      <div :class="isFold ? 'header-pc-sys fold' : 'header-pc-sys'">
        <span>{{ BASE.TITLE_CN }}</span>
        <span style="font-size: 16px; margin-left: 10px;">
          {{ BASE.TITLE_SUB }}
        </span>
        <el-tooltip
          :content="isFold ? '展开菜单栏' : '收起菜单栏'"
          placement="right"
        >
          <i
            :class="
              isFold ? 'icon-fold el-icon-s-unfold' : 'icon-fold el-icon-s-fold'
            "
            @click="isFold = !isFold"
          ></i>
        </el-tooltip>
      </div>
      <CMenu
        :menuList="menuList"
        :collapse="isFold"
        :style="{
          width: isFold ? '64px' : '220px'
        }"
      />
      <img class="lyentech-logo" :src="BASE.LYENTECH" v-show="!isFold" />
    </div>
    <!-- 内容区 -->
    <transition :name="transition">
      <div :class="isFold ? 'container fold' : 'container'">
        <CBreadcrumb v-if="BASE.HAS_BREADCRUMB" />
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" />
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" />
      </div>
    </transition>
  </div>
</template>

<script>
import BASE from '@/assets/baseConf'
import CMenu from '@/components/layout/menu'
import CBreadcrumb from '@/components/layout/breadcrumb'
import { mapState } from 'vuex'
import { logout, getLoginUrl } from '@/api/auth'

export default {
  name: 'home', // 系统页面主结构
  props: {
    menuList: {
      type: Array,
      require: true
    }
  },
  components: {
    CMenu,
    CBreadcrumb
  },
  computed: {
    ...mapState({
      userInfo: state => state.permission.userInfo
    }),
    // 登录状态
    isLogin() {
      let flag = true
      const userInfo = this.userInfo
      if (userInfo) {
        const roles = userInfo.user.roles
        for (let i = 0; i < roles.length; i++) {
          if (roles[i] === 'anonymous') {
            flag = false
          }
        }
      } else {
        return false
      }
      return userInfo.user && userInfo.user.id && flag
    },
    // 用户昵称
    nickName() {
      if (this.isLogin) {
        return this.userInfo.user.nickname
      } else {
        return '请登录'
      }
    },
    // 用户头像
    avatar() {
      return this.userInfo.user.avatar
    }
  },
  data() {
    return {
      BASE, // 基础配置项
      isFold: false, // 是否收缩/展开菜单(pc)
      isPhFold: true, // 是否收缩/展开菜单(phone)
      transition: '' // 父子路由切换时的过渡效果 --> 此处应该没有用到
    }
  },
  methods: {
    // 登录态方法切换
    handleCommand(command) {
      switch (command) {
        case 'logout':
          logout()
          break
        case 'login':
          getLoginUrl()
          break
      }
    },
    // 手机点击空白 --> 折叠侧边栏
    onClickBlank(e) {
      if (e.x > 220 && e.y > 50 && !this.isPhFold) {
        this.isPhFold = true
      }
    }
  },
  watch: {
    $route(to, from) {
      // 父子路由切换时的过渡效果 --> 此处应该没有
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transition = toDepth < fromDepth ? 'slide-left' : 'slide-right'
    },
    menuList: {
      handler(val) {
        // 初始化默认首项菜单
        if (val.length > 0) {
          this.$router.push(`${val[0].path}`)
        }
      },
      immediate: true
    }
  },
  mounted() {
    window.addEventListener('click', this.onClickBlank, false)
  },
  beforeDestroy() {
    window.removeEventListener('click', this.onClickBlank, false)
  }
}
</script>

<style lang="scss" scoped>
// 侧边栏
.aside {
  position: fixed;
  z-index: 666;
  height: 100%;
  opacity: 1;
  transform: translate3d(0, 0, 0);
  transition: all 0.3s ease-in-out;
  -moz-transition: width 0.3s ease-in-out; /* Firefox 4 */
  -o-transition: width 0.3s ease-in-out; /* Opera */
  -webkit-transition: all 0.3s ease-in-out; /* Safari 和 Chrome */
}
// 内容区
.container {
  min-width: 1000px;
  transition: all 0.3s ease-in-out;
  -moz-transition: all 0.3s ease-in-out; /* Firefox 4 */
  -o-transition: all 0.3s ease-in-out; /* Opera */
  -webkit-transition: all 0.3s ease-in-out; /* Safari 和 Chrome */
}

// PC端
@media screen and (min-width: 601px) {
  // - - - - - - - - - - - - 顶部栏 - - -
  .header-pc {
    position: fixed;
    top: 0;
    z-index: 100;
    width: 100%;
    height: 60px;
    background: #fff;
    text-align: right;
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
    // 系统logo栏
    &-sys {
      width: 220px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      background: #0747a6;
      color: #fff;
      text-align: center;
      position: relative;
      transition: width 0.3s ease-in-out;
      -moz-transition: width 0.3s ease-in-out; /* Firefox 4 */
      -o-transition: width 0.3s ease-in-out; /* Opera */
      -webkit-transition: width 0.3s ease-in-out; /* Safari 和 Chrome */
      i {
        line-height: 60px;
        font-size: 28px;
        fill: #eee;
        position: absolute;
        right: -40px;
        top: 0;
        color: #2c3e50;
      }
      i:hover {
        cursor: pointer;
      }
      &-logo {
        margin-top: 10px;
        background: none !important;
      }
    }
    // 系统logo栏 --> 折叠
    &-sys.fold {
      width: 64px;
    }
    // 用户头像
    &-avatar {
      margin-top: 10px;
      background: #ecf5ff;
      border: 1px solid #dcdfe6;
    }
    // 下拉操作项
    &-opt {
      float: right;
      height: 60px;
      line-height: 60px;
      padding: 0 15px 0 10px;
      margin-right: 20px;
      span {
        padding: 5px;
      }
    }
    &-opt:hover {
      cursor: pointer;
    }
  }
  // mb顶部栏 --> 隐藏
  .header-mb {
    display: none;
  }
  // - - - - - - - - - - - - 侧边栏 - - -
  .aside {
    top: 0;
  }
  // - - - - - - - - - - - - 内容区 - - -
  .container {
    // 100% - 顶部栏 - 纵向margin
    min-height: calc(100% - 60px - 40px);
    margin: 80px 20px 0 240px;
    padding: 0;
  }
  // --> 折叠
  .container.fold {
    margin-left: 84px;
  }
}

// 移动端 - 手机
@media screen and (max-width: 600px) {
  // - - - - - - - - - - - - 顶部栏 - - -
  .header-mb {
    display: block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: fixed;
    top: 0;
    background: #0747a6;
    z-index: 2000; // element的提示框 z-index: 2013
    box-shadow: 0 10px 10px rgba(0, 0, 0, 0.08);
    // 系统logo
    &-sys-logo {
      background: none;
      margin: 5px 2px 5px 15px;
    }
    &-sys-title {
      color: #fff;
      font-size: 20px;
      font-weight: 600;
      padding-left: 20px;
    }
    // 展开/收起图标
    i {
      position: absolute;
      top: 0;
      line-height: inherit;
      font-size: 22px;
      color: #fff;
      margin-left: 10px;
    }
    // 用户名
    &-user {
      position: absolute;
      top: 0;
      right: 45px;
      font-size: 14px;
      color: #ffffff;
      padding: 0 10px;
    }
    // 登录/退出操作项
    &-opt {
      position: absolute;
      right: 15px;
      font-size: 12px;
      color: #fff;
      display: inline-block;
      line-height: 50px;
    }
    &-opt:active {
      color: #409eff;
    }
  }
  // pc顶部栏 --> 隐藏
  .header-pc {
    display: none;
  }
  // pc顶部logo栏 --> 隐藏
  .header-pc-sys {
    display: none;
  }
  // - - - - - - - - - - - - 侧边栏 - - -
  .aside {
    top: 50px;
  }
  // 侧边栏 --> 折叠
  .aside.fold {
    opacity: 0;
    transform: translate3d(-100%, 0, 0);
  }
  // - - - - - - - - - - - - 内容区 - - -
  .container {
    // 100% - 顶部栏 - 纵向margin - 纵向padding
    min-height: calc(100% - 50px - 100px - 30px);
    margin: 50px 0;
    padding: 15px;
  }
}

// 移动端 - 平板 --> 暂不特别兼容
// @media screen and (min-width: 600px) and (max-width: 960px) {
// }

/* transiton --> 父子路由切换时的过渡效果[此处应该没有] */
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all 0.3s;
  position: absolute;
  width: 100%;
  height: 100%;
}
.slide-right-enter {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}
.slide-right-leave-active {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-enter {
  opacity: 0;
  transform: translate3d(100%, 0, 0);
}
.slide-left-leave-active {
  opacity: 0;
  transform: translate3d(-100%, 0, 0);
}

// todo 自定义滚动条
// *::-webkit-scrollbar {
//   background-color: transparent;
//   width: 6px;
//   height: 6px;
// }

// *::-webkit-scrollbar-thumb {
//   background-color: #909399;
//   background-repeat: no-repeat;
//   background-position: center center;
//   border-radius: 3px;
// }

// MUST ---> 联云logo
.lyentech-logo {
  height: 40px;
  position: absolute;
  left: 20px;
  bottom: 10px;
}
</style>
