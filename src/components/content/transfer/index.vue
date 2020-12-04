<template>
  <!-- 【Transfer 穿梭框】

      @description -> 1. 基于element-ui；
                      2. 剥离于GR > Venus > 触店 > 商品关联；
                      3. 参考：element-ui穿梭框、微信pc版标签添加操作 -> 更倾向微信交互；
                      4. 功能描述：
        A.
        B.
        C.
        
    - - - - -  
      @config      -> 1. 组件配置项：
                      2. 组件返回项：

    - - - - -
      @starttime   -> 20201204
      @author      -> SamyeChan
  -->
  <el-container>
    <!-- 选择项 -->
    <el-card shadow="never" class="card">
      <el-row slot="header">
        <el-col :span="8" class="card-title">可关联商品：</el-col>
        <el-col :span="16">
          <el-input
            class="card-input"
            maxlength="100"
            size="mini"
            suffix-icon="el-icon-search"
            placeholder="搜索商品"
            v-model="searchPara"
            @keyup.native.enter="_getList(searchPara)"
          ></el-input>
        </el-col>
      </el-row>
      <div class="card-list">
        <div class="null" v-if="dataArr.length === 0">已无可关联商品</div>
        <div
          class="item"
          v-for="item of dataArr"
          :key="item.spuUniqueId"
          @click="handleCheck(item)"
        >
          <span class="img">
            <CImg :hasText="false" :src="item.firstImage" />
          </span>
          <span class="text">{{ item.name }}</span>
        </div>
      </div>
    </el-card>
    <!-- 操作按钮 -->
    <span class="option">
      <i class="el-icon-link"></i>
    </span>
    <!-- 已选项 -->
    <el-card shadow="never" class="card">
      <div slot="header" class="row">
        <span>已配置商品：</span>
        <span class="row-r">已选 {{ checkArr.length }} 个</span>
      </div>
      <div class="card-list">
        <div class="null" v-if="checkArr.length === 0">暂未关联商品</div>
        <Vdraggable
          :list="checkArr"
          @start="drag = true"
          @end="drag = false"
          handle=".handle"
        >
          <div class="item" v-for="item of checkArr" :key="item.spuUniqueId">
            <span class="img">
              <CImg :hasText="false" :src="item.firstImage" />
            </span>
            <span class="text">{{ item.name }}</span>
            <el-tooltip effect="dark" content="取消关联" placement="left">
              <el-button
                class="btn"
                :style="`right: ${canSort ? '30' : '5'}px;`"
                type="text"
                size="mini"
                icon="el-icon-close"
                @click="handleClose(item)"
              ></el-button>
            </el-tooltip>
            <el-button
              v-if="canSort"
              :class="canSort ? 'btn handle' : 'btn'"
              style="right: 5px; font-size: 24px;"
              type="text"
              size="mini"
              icon="el-icon-sort"
            ></el-button>
          </div>
        </Vdraggable>
      </div>
    </el-card>
  </el-container>
</template>

<script>
import CImg from '@/components/content/img'
import { UtilMethods } from '@/utils/'
import Vdraggable from 'vuedraggable'

const util = new UtilMethods()

export default {
  props: {
    aCheck: {
      type: Number,
      default: 0
    },
    data: {
      type: Array,
      default() {
        return []
      }
    },
    canSort: {
      type: Boolean,
      default: false
    },
    limit: {
      type: Number
    }
  },
  components: { CImg, Vdraggable },
  watch: {
    aCheck(val) {
      if (val > 0) {
        if (this.checkArr.length === 0) {
          this.$message.warning('请选择需关联商品！')
        } else if (this.limit && this.checkArr.length < this.limit) {
          this.$message.warning(`请至少关联${this.limit}件商品`)
        } else {
          this.$emit('res', this.checkArr)
        }
      }
    }
  },
  data() {
    return {
      drag: false, // 拖拽
      searchPara: null,
      dataArr: [],
      checkArr: util.deepCopy(this.data)
    }
  },
  methods: {
    // HD - 关联
    handleCheck(item) {
      this.dataArr = this.dataArr.filter(
        v => v.spuUniqueId !== item.spuUniqueId
      )
      this.checkArr.push(item)
    },
    // HD - 取消关联
    handleClose(item) {
      this.checkArr = this.checkArr.filter(
        v => v.spuUniqueId !== item.spuUniqueId
      )
      this.dataArr.push(item)
    },
    // RQ - 请求门店已上架商品列表
    _getList(name) {
      const data = name ? name.trim() : null
      getGoodsList(data).then(res => {
        const allArr = res.data
        const checkSpuIdArr = this.checkArr.map(item => item.spuUniqueId)
        // 前端过滤已关联项
        this.dataArr = allArr.filter(
          item => checkSpuIdArr.indexOf(item.spuUniqueId) === -1
        )
      })
    }
  },
  created() {
    this._getList()
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 400px;
  &-title {
    line-height: 28px;
    margin: 10px 0 10px;
    font-weight: 600;
  }
  &-input {
    margin: 10px 0 5px;
  }
  &-list {
    height: calc(400px - 50px);
    overflow-y: scroll;
    .null {
      width: 100%;
      margin: 50px 0;
      text-align: center;
      color: #bbb;
    }
    .item {
      position: relative;
      padding: 5px 8px;
      .img {
        width: 70px;
        height: 70px;
      }
      .text {
        vertical-align: top;
        padding: 0 10px;
        line-height: 20px;
        display: inline-block;
        width: 175px;
      }
      .btn {
        font-size: 26px;
        position: absolute;
        right: 5px;
        bottom: 0;
      }
    }
    .item:hover {
      background-color: #ecf5ff;
      cursor: pointer;
    }
  }
  ::v-deep .el-card__header {
    padding: 0 15px;
  }
  ::v-deep .el-card__body {
    padding: 0;
  }
  .row {
    height: 28px;
    line-height: 28px;
    margin: 10px 0 10px;
    &-r {
      float: right;
    }
  }
}
// .option {
//   display: inline-block;
//   width: 110px;
//   height: 400px;
//   line-height: 400px;
//   margin: 0 15px;
// }
.option {
  font-size: 30px;
  color: #409eff;
  height: 400px;
  line-height: 400px;
  margin: 0 15px;
}
</style>
