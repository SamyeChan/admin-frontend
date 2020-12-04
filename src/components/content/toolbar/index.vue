<template>
  <!-- 【Toolbar 操作组】

      @description -> 1. 基于element-ui；
                      2. 剥离于GR > B端系统；
                      3. 功能描述：
        A.
        B.
        C.

    - - - - - 
      @config      -> 

    - - - - - 
      @starttime   -> 202012xx
      @author      -> SamyeChan
  -->
  <el-row class="toolbar" :style="`text-align:${cOptions.position};`">
    <span
      class="btn"
      v-for="(btn, index) of sets"
      :key="index"
      :style="btn.visible == false ? 'margin: 0;' : 'margin: 0 5px 10px;'"
    >
      <el-button
        :plain="cOptions.plain"
        :size="cOptions.size"
        :round="cOptions.round"
        :type="btn.type"
        :icon="btn.icon"
        :disabled="btn.disabled"
        @click="btn.onClick()"
        v-show="!(btn.visible === false)"
      >
        {{ btn.label }}
      </el-button>
    </span>
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
  .btn {
    margin: 0 5px 10px;
  }
}
</style>
