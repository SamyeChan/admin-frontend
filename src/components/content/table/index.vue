<template>
  <el-table
    ref="tb"
    v-loading="options.loading"
    :data="dataSource"
    :max-height="options.maxHeight"
    :stripe="options.stripe"
    :border="options.border"
    :size="options.size"
    @row-click="handleRowClick"
    @selection-change="handleSelectionChange"
    :header-row-class-name="options.headerClass"
  >
    <!--selection选择框-->
    <el-table-column
      v-if="options.mutiSelect && options.mutiSelectPosition === 'left'"
      type="selection"
      style="width:50px"
      align="center"
    ></el-table-column>
    <!--序号-->
    <el-table-column
      v-if="options.index"
      :label="options.indexLabel"
      type="index"
      width="50"
      align="center"
    ></el-table-column>
    <!--数据列-->
    <template v-for="(column, index) in columns">
      <el-table-column
        :key="index"
        :prop="column.prop"
        :label="column.label"
        :align="column.align || 'center'"
        :width="column.width"
        :fixed="column.fixed"
        :sortable="column.sortable"
        :show-overflow-tooltip="true"
      >
        <template slot-scope="scope">
          <template
            v-if="(!column.type || column.type === 'text') && !column.render"
          >
            {{ scope.row[column.prop] }}
          </template>

          <!-- render dom -->
          <template v-if="column.render">
            <RenderDom
              :row="scope.row"
              :index="index"
              :render="column.render"
            />
          </template>

          <!-- TODO - render tag -->
          <template v-if="column.type === 'date'">
            <!-- 日期组件 -->
          </template>

          <!-- TODO - render switch -->
          <template v-if="column.type === 'switch'">
            <el-switch
              v-model="scope.row[column.prop]"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="column.onSwitch(scope.row)"
            >
            </el-switch>
          </template>

          <!-- render image -->
          <template v-if="column.type === 'image'">
            <span
              v-if="typeof scope.row[column.prop] === 'string'"
              style="display:inline-block;height:inherit;"
            >
              <CImg :src="scope.row[column.prop] + column.imgSuffix" />
            </span>
            <span v-else style="display:inline-block;height:inherit;">
              <CImg
                v-for="(v, i) of scope.row[column.prop]"
                :key="i"
                :src="`v${column.imgSuffix}`"
              />
            </span>
          </template>

          <!-- render button -->
          <template v-if="column.type === 'button'">
            <template v-for="(btn, i) in column.group">
              <el-button
                v-show="btn.showFlag === scope.row[btn.showProp]"
                :key="i"
                :type="btn.type"
                :size="btn.size || 'mini'"
                :icon="btn.icon || ''"
                :disabled="btn.disabled || false"
                :plain="btn.plain || false"
                @click.stop="btn.onClick(scope.row, scope.$index)"
                >{{ btn.name }}</el-button
              >
            </template>
          </template>
        </template>
      </el-table-column>
    </template>
    <!--selection选择框-->
    <el-table-column
      v-if="options.mutiSelect && options.mutiSelectPosition === 'right'"
      type="selection"
      style="width:50px"
      align="center"
    ></el-table-column>
  </el-table>
</template>

<script>
import CImg from '@/components/content/img'

export default {
  name: 'CTable', // 表格组件
  components: {
    CImg,
    RenderDom: {
      functional: true, // 函数式组件 - 无 data 和 this 上下文 => better render
      props: {
        row: Object,
        index: Number,
        render: Function
      },
      /**
       * @param {Function} createElement - 原生创建dom元素的方法， 弃用，推荐使用 jsx
       * @param {Object} ctx - 渲染的节点的this对象
       * @argument 传递参数 row index
       */
      render(createElement, ctx) {
        const { row, index } = ctx.props
        return ctx.props.render(createElement, row, index)
      }
    }
  },
  props: {
    // 表格数据
    dataSource: {
      type: Array,
      required: true,
      default() {
        return []
      }
    },
    // 表格配置
    options: {
      // 表格参数控制 maxHeight、stripe 等等...
      type: Object,
      required: true
    },
    // 行数据配置
    columns: {
      type: Array,
      required: true
    },
    // check数据回显
    checked: {
      type: Array,
      required: false
    }
  },
  created() {
    // 传入的options覆盖默认设置
    this.$parent.options = Object.assign({
      loading: false,
      size: 'small',
      maxHeight: 600,
      index: false, // 是否有序号
      indexLabel: '序号',
      stripe: false, // 是否斑马纹显示
      border: true, // 是否含边框
      mutiSelect: false, // 是否多选
      mutiSelectPosition: 'left',
      headerClass: 'table-header'
    })
  },
  mounted() {
    // ref 不是响应式的，不能在 created 的时候对其进行操作
    // this.initChecked()
  },
  methods: {
    handleSelectionChange(selection) {
      // this.initChecked()
      this.$emit('selection-change', selection)
    },
    handleRowClick(row, event, column) {
      this.$emit('row-click', row, event, column)
    },
    // 回显checked
    initChecked() {
      if (this.checked) {
        this.checked.forEach(item => {
          this.dataSource.forEach((val, index) => {
            item.id === val.id &&
              this.$refs.tb.toggleRowSelection(this.dataSource[index], true)
          })
        })
      }
    }
  }
}
</script>
