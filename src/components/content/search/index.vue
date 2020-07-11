<template>
  <!-- 搜索 -->
  <el-form
    class="search"
    :label-width="`${cOptions.labelWidth}px`"
    :size="cOptions.size"
    :inline="true"
  >
    <!-- 搜索项 -->
    <el-form-item
      v-for="(item, index) of propset"
      :key="index"
      :label="`${item.label}：`"
    >
      <!-- render input -->
      <template v-if="!item.type || item.type === 'input'">
        <el-input
          class="item"
          :placeholder="`请输入${item.label}`"
          clearable
          v-model="params[item.prop]"
          @clear="handleClear(item.prop)"
          @keyup.native.enter="handleSearch"
        />
      </template>

      <!-- render select -->
      <template v-if="item.type === 'select'">
        <el-select
          class="item"
          :placeholder="`请选择${item.label}`"
          clearable
          v-model="params[item.prop]"
          @clear="handleClear(item.prop)"
          @change="handleSearch"
        >
          <el-option
            v-for="v in item.optionArr"
            :key="v.id"
            :label="v.label"
            :value="v.id"
          />
        </el-select>
      </template>

      <!-- render date -->
      <template v-if="item.type === 'date'">
        <el-date-picker
          class="item"
          type="date"
          :placeholder="`请选择${item.label}`"
          :value-format="item.format"
          v-model="params[item.prop]"
          @change="handleDateSearch(item.prop)"
        />
      </template>
    </el-form-item>
    <!-- 按钮项 -->
    <el-form-item class="button" :label="' '">
      <el-button
        :size="cOptions.size"
        round
        icon="el-icon-refresh"
        @click="handleReset"
      >
        重置
      </el-button>
      <el-button
        type="primary"
        round
        icon="el-icon-search"
        @click="handleSearch"
      >
        查询
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import { UtilMethods } from '@/utils'

const utils = new UtilMethods()

export default {
  name: 'search', // 搜索组件
  props: {
    // 搜索配置
    options: {
      type: Object,
      required: false
    },
    // 搜索项配置数据
    propset: {
      type: Array,
      required: true
    }
  },
  watch: {
    propset: {
      handler(val) {
        this.cpParams = this.paramsFilter(val)
        this.params = utils.deepCopy(this.cpParams)
      },
      immediate: true
    }
  },
  data() {
    return {
      // 搜索参数
      params: {},
      cpParams: {},
      // 搜素配置项 - 因其为非必须配置，故定义于子组件中
      cOptions: {}
    }
  },
  methods: {
    // 配置中过滤出参数
    paramsFilter(arr) {
      let obj = {}
      arr.forEach(item => {
        obj[item.prop] = null
      })
      return obj
    },
    // HD - 重置
    handleReset() {
      this.params = utils.deepCopy(this.cpParams)
      this.handleSearch()
    },
    // HD - 普通搜索
    handleSearch() {
      const params = utils.delEmptyObjItem(this.params)
      this.$emit('res', params)
    },
    // HD - 普通清除
    handleClear(key) {
      this.params[key] = null
      this.handleSearch()
    },
    // HD - 日期相关的搜索/清除
    handleDateSearch(key) {
      const val = this.params[key]
      val ? this.handleSearch() : this.handleClear(key)
    }
  },
  created() {
    this.cOptions = Object.assign(
      {
        size: 'mini', // 大小
        labelWidth: 80 // 标签宽度
      },
      this.options || {}
    )
  }
}
</script>

<style lang="scss" scoped>
.search {
  .item {
    width: 220px;
  }
}
</style>
