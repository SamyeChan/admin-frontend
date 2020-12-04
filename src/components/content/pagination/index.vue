<template>
  <!-- 【Pagination 分页】

      @description -> 1. 基于element-ui；
                      2. 剥离于GR > B端系统；
                      3. 功能描述：
        A.
        B.
        C.

    - - - - - 
      @config      -> 

    - - - - - 
      @starttime   -> 始于2019，整理于20201204
      @author      -> SamyeChan
  -->
  <div class="pagination" :style="`text-align: ${position};`">
    <div class="pagination-content">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :layout="layout"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        @prev-click="handlePrevClick"
        @next-click="handleNextClick"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'pagination',
  props: {
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 当前每页条数
    pageSize: {
      type: Number,
      default: 10
    },
    // 每页条数
    pageSizes: {
      type: Array,
      default: () => {
        return [10, 20, 30]
      }
    },
    // 数据总条数
    total: {
      type: Number,
      required: true,
      default: 0
    },
    // 组件展示项
    layout: {
      type: String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
    // 组件位置 - left/center/right
    position: {
      type: String,
      default: 'right'
    }
  },
  watch: {
    currentPage(newVal) {
      this.params.currentPage = newVal || 1
    },
    pageSize(newVal) {
      this.params.pageSize = newVal || 10
    }
  },
  data() {
    return {
      params: {
        currentPage: 1,
        pageSize: 10
      }
    }
  },
  methods: {
    handleSizeChange(val) {
      this.params.currentPage = 1
      this.params.pageSize = val
      this.$emit('change', this.params)
    },
    handleCurrentChange(val) {
      this.params.currentPage = val
      this.$emit('change', this.params)
    },
    handlePrevClick(val) {
      if (val >= 1) {
        this.params.currentPage = val
      }
    },
    handleNextClick(val) {
      if (val <= this.total) {
        this.params.currentPage = val
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pagination {
  background-color: #fff;
  width: 100%;
  &-content {
    margin: 15px 10px;
  }
}
</style>
