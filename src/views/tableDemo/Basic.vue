<template>
  <div>
    <!--
      该页面为基础表格页（即无分页页面）
    -->
    <CTable
      :columns="tableConfig.columns"
      :options="tableConfig.options"
      :dataSource="tableData"
    />
  </div>
</template>

<script>
import CTable from '@/components/content/table'
import TableConfig from './tableConfig'
import { getTable, delRow } from '@/api/demo'

export default {
  name: 'constPage', // 静态路由页面
  components: { CTable },
  data() {
    return {
      // 表格配置项
      tableConfig: {
        options: TableConfig.options,
        columns: TableConfig.columns
      },
      // 表格数据项
      tableData: []
    }
  },
  methods: {
    // REQ - 获取表格数据
    async _getTableList() {
      this.tableConfig.options.loading = true
      getTable().then(res => {
        this.tableData = res
        this.tableConfig.options.loading = false
      })
    },
    // REQ - 删除
    async _del(id) {
      delRow(id).then(() => {
        this.$message.success('成功删除该条记录！')
      })
    }
  },
  created() {
    // 初始化配置js中的this
    TableConfig.sendThis(this)
    // 初始化表格数据
    this._getTableList()
  }
}
</script>
