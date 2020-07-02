<template>
  <div class="menu">
    <el-menu
      :router="true"
      :default-active="pPath"
      :collapse="collapse"
      background-color="#0747a6"
      text-color="#fff"
      active-text-color="#0747a6"
      class="menu-vertical"
      style="height: 100%;"
    >
      <template v-for="(item, index) in menuList">
        <!-- 一级含子项 -->
        <el-submenu
          v-if="item.children && item.children.length > 0"
          :index="item.path"
          :key="index"
        >
          <template slot="title">
            <i :class="item.meta.icon ? item.meta.icon : 'el-icon-menu'"></i>
            <span>{{ filterTitle(item) }}</span>
          </template>
          <template v-for="(item2, index2) in item.children">
            <!-- 二级含子项 -->
            <el-submenu
              v-if="item2.children && item2.children.length > 0"
              :index="item2.path"
              :key="index2"
            >
              <template slot="title">{{ filterTitle(item2) }}</template>
              <!-- 最多支持三级菜单 -->
              <el-menu-item
                v-for="(item3, index3) in item2.children"
                :index="item3.path"
                :key="index3"
                >{{ filterTitle(item3) }}</el-menu-item
              >
            </el-submenu>
            <!-- 二级无子项 -->
            <el-menu-item v-else :index="item2.path" :key="index2">
              <span slot="title">{{ filterTitle(item2) }}</span>
            </el-menu-item>
          </template>
        </el-submenu>
        <!-- 一级无子项 -->
        <el-menu-item v-else :index="item.path" :key="index">
          <i :class="item.meta.icon ? item.meta.icon : 'el-icon-menu'"></i>
          <span slot="title">{{ filterTitle(item) }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      required: true
    },
    collapse: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 一级路由
    pPath() {
      let path = this.$route.path
      if (this.$route.params.name) {
        const temp = path.split('/')
        const temp2 = temp[2].split('?')[0]
        path = `/${temp[1]}/${temp2}`
      }
      return path
    }
  },
  methods: {
    filterTitle(item) {
      if (item.meta && item.meta.title) {
        return item.meta.title
      }
      console.error(`path:"${item.path}" err: meta.title is null`)
      return '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  box-shadow: 10px 0 10px rgba(0, 0, 0, 0.08);
  height: calc(100% - 50px);
  &-vertical:not(.el-menu--collapse) {
    width: 220px;
  }
  ::v-deep .el-menu-item i {
    color: inherit;
  }
  ::v-deep .el-submenu__title i {
    color: #fff;
  }
  ::v-deep .el-menu-item.is-active,
  ::v-deep .el-menu-item.is-active:hover {
    background: #fff !important;
    font-weight: 600;
  }
  ::v-deep .el-menu-item:hover {
    background: #e0edff !important;
    color: #0747a6 !important;
    font-weight: 600;
  }
}
.menu .el-menu {
  border: none;
}
</style>
