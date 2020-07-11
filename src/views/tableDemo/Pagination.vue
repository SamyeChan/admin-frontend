<template>
  <div>
    <!--
      该页面为分页表格页
    -->
    <CTable
      :columns="tableConfig.columns"
      :options="tableConfig.options"
      :dataSource="tableData"
    />
    <CPagination
      :currentPage="params.current"
      :pageSize="params.size"
      :total="params.total"
      @change="resPagination"
    />
  </div>
</template>

<script>
import CTable from '@/components/content/table'
import CPagination from '@/components/content/pagination'
import TableConfig from './tableConfig'
import { getTableP, delRow } from '@/api/demo'

export default {
  name: 'tablePagination', // 分页表格
  components: { CTable, CPagination },
  data() {
    return {
      // 表格配置项
      tableConfig: {
        options: TableConfig.options,
        columns: TableConfig.columns
      },
      // 表格数据项
      tableData: [],
      // 分页参数
      params: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    // RES - 响应分页变化
    resPagination({ currentPage, pageSize }) {
      this.params.current = currentPage
      this.params.size = pageSize
      this._getTableList()
    },
    // REQ - 获取表格数据
    async _getTableList() {
      this.tableConfig.options.loading = true
      getTableP(this.params).then(res => {
        this.params.total = res.total
        this.tableData = res.record
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
