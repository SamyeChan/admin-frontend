<template>
  <div>
    <!--
      该页面为综合表格页
    -->
    <CSearch :propset="searchConfig.props" @res="resSearch" />
    <CBtn :sets="btnConfig.sets" :options="btnConfig.options" />
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
import CSearch from '@/components/content/search'
import CBtn from '@/components/content/toolbar'
import CTable from '@/components/content/table'
import CPagination from '@/components/content/pagination'
import SearchConfig from './searchConfig'
import BtnConfig from './btnConfig'
import TableConfig from './tableConfig'
import { getTableP, delRow, getOptions } from '@/api/demo'

export default {
  name: 'tableSum', // 综合表格
  components: { CSearch, CBtn, CTable, CPagination },
  data() {
    return {
      // 搜索配置项
      searchConfig: {
        props: SearchConfig.props,
        options: SearchConfig.options
      },
      // 按钮配置项
      btnConfig: {
        sets: BtnConfig.sets,
        options: BtnConfig.options
      },
      // 表格配置项
      tableConfig: {
        options: TableConfig.options,
        columns: TableConfig.columns
      },
      // 表格数据项
      tableData: [],
      // 参数（分页+搜索）
      params: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  methods: {
    // RES - 响应搜索变化
    resSearch(params) {
      this.params = { current: 1, size: 10 }
      Object.assign(this.params, params)
      this._getTableList()
    },
    // RES - 响应分页变化
    resPagination({ currentPage, pageSize }) {
      this.params.current = currentPage
      this.params.size = pageSize
      this._getTableList()
    },
    // REQ - 获取
    async _getOptions() {
      let res = await getOptions()
      let arr = []
      res &&
        res.forEach(v => {
          const item = { id: v.id, label: v.label }
          arr.push(item)
        })
      SearchConfig.initOptions(arr)
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
    // BtnConfig.sendThis(this)
    this._getTableList()
  }
}
</script>
