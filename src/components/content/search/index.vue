<template>
  <!-- 【搜索组件Search】

      A.搜索框类型(type): 01. input[默认值] - 输入框；
                          02. select - 下拉选择框；
                          03. date - 日期选择；
                          04. time - 时间选择；
                          05. datetime - 日期时间选择；
      B.操作按钮: 01. Enter键入搜索；
                  02. 按钮点击搜索；
                  03. 重置点击请求；
                  04. 搜索框项的清空请求；
      C.父组件响应: @res - 返回搜索参数 - resSearch(params) { ... } 
    -->
  <el-form
    class="search"
    :label-width="`${cOptions.labelWidth}px`"
    :label-position="cOptions.labelPosition"
    :size="cOptions.size"
    :inline="true"
    @submit.native.prevent
  >
    <!-- 搜索项 -->
    <el-form-item
      v-for="(item, index) of propset"
      :key="index"
      :label="`${item.label ? item.label + '：' : ''}`"
      :label-width="`${item.labelWidth || cOptions.labelWidth}px`"
    >
      <!-- render input -->

      <!-- 输入框配置项
          props: [
          {
            // - - - - - - - - - 功能配置项 - - -

            type: 'input',
            prop: '', // 搜索字段名【必须】
            label: '', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）

            // - - - - - - - - - 样式配置项 - - -

            labelWidth: 90, // 标签宽度(px)
            inputWidth: 100 // 输入宽度(px)
          }
        ]
        -->
      <template v-if="!item.type || item.type === 'input'">
        <el-input
          :style="`width: ${item.inputWidth || cOptions.inputWidth}px;`"
          :placeholder="item.placeholder || `请输入${item.label}`"
          clearable
          v-model="params[item.prop]"
          @clear="handleClear(item.prop)"
          @keyup.native.enter="handleSearch"
        />
      </template>

      <!-- render select -->

      <!-- 下拉框配置项
          props: [
          {
            // - - - - - - - - - 功能配置项 - - -

            type: 'select',
            prop: '', // 搜索字段名【必须】
            label: '', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            optionArr: () => {
              return [{
                val: '',
                label: ''
              }] 
            }, // 下拉框项（一个方法，返回数组）

            // - - - - - - - - - 样式配置项 - - -

            labelWidth: 90, // 标签宽度(px)
            inputWidth: 100 // 输入宽度(px)
          }
        ]
        -->
      <template v-if="item.type === 'select'">
        <el-select
          :style="`width: ${item.inputWidth || cOptions.inputWidth}px;`"
          :placeholder="item.placeholder || `请选择${item.label}`"
          clearable
          v-model="params[item.prop]"
          @clear="handleClear(item.prop)"
          @change="handleSearch"
        >
          <el-option
            v-for="v in item.optionArr()"
            :key="v.val"
            :label="v.label"
            :value="v.val"
          />
        </el-select>
      </template>

      <!-- = = = = = = = = = = TODO = = = = = = = = = = -->

      <!-- render date -->

      <!-- 日期选择配置项
          props: [
          {
            type: 'date',
            prop: '', // 搜索字段名【必须】
            label: '', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            start: '', // 可选范围 - 开始日期
            end: '', // 可选范围 - 结束日期

            // - - - - - - - - - 样式配置项 - - -

            labelWidth: 90, // 标签宽度(px)
            inputWidth: 100 // 输入宽度(px)
          }
        ]
        -->
      <template v-if="item.type === 'date'">
        <el-date-picker
          type="month"
          :style="`width: ${item.inputWidth || cOptions.inputWidth}px;`"
          :value-format="item.format || 'yyyy-MM'"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :editable="false"
          v-model="params[item.prop]"
          @change="handleDateSearch(item.prop)"
        />
      </template>

      <!-- = = = = = = = = = = TODO = = = = = = = = = = -->

      <!-- render time -->

      <!-- 时间选择配置项
          props: [
          {
            type: 'time',
            prop: '', // 搜索字段名【必须】
            label: '', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            start: '', // 可选范围 - 开始时间
            end: '', // 可选范围 - 结束时间

            // - - - - - - - - - 样式配置项 - - -

            labelWidth: 90, // 标签宽度(px)
            inputWidth: 100 // 输入宽度(px)
          }
        ]
        -->
      <template v-if="item.type === 'time'">
        <el-date-picker
          :style="`width: ${item.inputWidth || cOptions.inputWidth}px;`"
          type="month"
          :value-format="item.format || 'yyyy-MM'"
          :placeholder="item.placeholder || `请选择${item.label}`"
          :editable="false"
          v-model="params[item.prop]"
          @change="handleDateSearch(item.prop)"
        />
      </template>

      <!-- = = = = = = = = = = TODO = = = = = = = = = = -->

      <!-- render datetime -->

      <!-- 时间选择配置项
          props: [
          {
            type: 'datetime',
            prop: '', // 搜索字段名【必须】
            label: '', // 搜索项名称（不设置则不显示）
            placeholder: '', // 搜索提示语（不设置则默认显示：请输入xxx）
            start: '', // 可选范围 - 开始日期时间
            end: '', // 可选范围 - 结束日期时间

            // - - - - - - - - - 样式配置项 - - -

            labelWidth: 90, // 标签宽度(px)
            inputWidth: 100 // 输入宽度(px)
          }
        ]
        -->
      <template v-if="item.type === 'datetime'"> </template>
    </el-form-item>
    <!-- 按钮项 -->
    <el-form-item class="button" :style="cOptions.buttonStyle">
      <el-button
        type="primary"
        :size="cOptions.size"
        :round="cOptions.round"
        icon="el-icon-search"
        @click="handleSearch"
      >
        查询
      </el-button>
      <!-- 当只有一个搜索项时，无论hasResetBtn是啥，都不出现重置按钮 -->
      <el-button
        :size="cOptions.size"
        :round="cOptions.round"
        icon="el-icon-refresh-right"
        @click="handleReset"
        v-show="cOptions.hasResetBtn && propset.length !== 1"
      >
        重置
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
    // 搜索参数初始化
    propset: {
      handler(val) {
        this.cpParams = this.paramsFilter(val)
        this.params = utils.deepCopy(this.cpParams)
      }
    }
  },
  data() {
    return {
      // 搜索参数
      params: {},
      // 初始化参数
      cpParams: {},
      // 搜素配置项 - 因其为非必须配置，故定义于子组件中
      cOptions: {}
    }
  },
  methods: {
    // 在参数配置中过滤出参数
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
      // 搜索参数（String）要前后去空
      const params = utils.trimString(this.params)
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
      val === null ? this.handleClear(key) : this.handleSearch()
    }
  },
  created() {
    // 初始化组件配置
    this.cOptions = Object.assign(
      {
        size: 'mini', // 大小 - large/medium/small/mini
        round: false, // 是否圆角
        labelPosition: 'right', // 标签位置 - right/left
        labelWidth: 100, // 标签宽度(px)
        inputWidth: 200, // 输入宽度(px)
        hasResetBtn: true, // 是否有重置按钮
        buttonStyle: '' // 按钮项的样式调整 - 一般是位置调整(少用)
      },
      this.options || {}
    )
  }
}
</script>

<style lang="scss" scoped>
.search {
  .button {
    margin-left: 5px;
    padding: 0;
  }
}
</style>
