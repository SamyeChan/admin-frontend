<template>
  <el-row class="toolbar" :style="`text-align:${cOptions.position};`">
    <el-button
      :plain="cOptions.plain"
      :size="cOptions.size"
      :round="cOptions.round"
      v-for="(btn, index) of sets"
      :key="index"
      :type="btn.type"
      :icon="btn.icon"
      :disabled="btn.disabled"
      @click="btn.onClick()"
    >
      {{ btn.label }}
    </el-button>
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
        position: 'right', // 按钮组位置 - left/center/right
        size: 'small', // 大小 - medium/small/mini
        plain: false, // 是否非填充
        round: false // 是否圆角
      },
      this.options || {}
    )
  }
}
</script>

<style lang="scss" scoped>
/**
 * margin-bottom：15px 
 */
.toolbar {
  margin: 0 0 15px 0;
}
</style>
