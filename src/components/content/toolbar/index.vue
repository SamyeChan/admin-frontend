<template>
  <el-row class="container">
    <el-button plain disabled>朴素按钮</el-button>
    <el-button type="primary" plain disabled>主要按钮</el-button>
    <el-button type="success" plain disabled>成功按钮</el-button>
    <el-button type="info" plain disabled>信息按钮</el-button>
    <el-button type="warning" plain disabled>警告按钮</el-button>
    <el-button type="danger" plain disabled>危险按钮</el-button>
  </el-row>
</template>

<script>
export default {
  name: 'toolbar', // 操作按钮组
  props: {
    // 按钮配置
    options: {
      type: Object,
      required: false
    },
    // 按钮项配置数据
    sets: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      // 按钮配置项 - 因其为非必须配置，故定义于子组件中
      cOptions: {}
    }
  },
  created() {
    this.cOptions = Object.assign(
      {
        size: 'mini' // 大小
      },
      this.options || {}
    )
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 10px 0;
  text-align: right;
}
</style>
