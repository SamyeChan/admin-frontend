<template>
  <div class="breadcrumb">
    <el-breadcrumb class="breadcrumb-main" separator="/">
      <el-breadcrumb-item :to="{ name: indexTo }">
        {{ pTitle }}
      </el-breadcrumb-item>
      <el-breadcrumb-item v-if="title">{{ title }}</el-breadcrumb-item>
      <el-breadcrumb-item v-if="subTitle">{{ subTitle }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button
      class="breadcrumb-back"
      size="mini"
      type="primary"
      plain
      @click="$router.go(-1)"
      v-show="subTitle"
      >返回</el-button
    >
  </div>
</template>

<script>
export default {
  name: 'breadcrumb', // 面包屑导航
  computed: {
    // 一级标题
    pTitle() {
      return this.$route.meta.pTitle
    },
    // 一级路径
    indexTo() {
      const parentName = this.$route.fullPath.split('/')[1]
      return parentName
    },
    // 当前标题
    title() {
      return this.$route.meta.title
    },
    // 模块子标题
    subTitle() {
      return this.$route.params.name
    }
  }
}
</script>

<style lang="scss" scoped>
.breadcrumb {
  margin: 5px 0 16px;
  min-width: 886px;
  height: 40px;
  line-height: 40px;
  position: relative;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05), 0 2px 6px rgba(0, 0, 0, 0.045);
  &-main {
    position: absolute;
    top: 0;
    left: 0;
    padding: 13px;
  }
  &-back {
    position: absolute;
    top: 6px;
    right: 20px;
  }
}
</style>
