<template>
  <!-- 【Transfer 穿梭框】

      @description -> 1. 基于element-ui；
                      2. 剥离于GR > Venus > 触店 > 商品关联；
                      3. 参考：element-ui穿梭框、微信pc版标签添加操作 -> 更倾向微信交互（不同：选中后直接在待选项中移除）；
                      4. 依赖：npm i --save vuedraggable；
                      5. 功能描述：
        A.批量选取数据，如：商品关联、用户选择等；
        B.选项显示：01. 待选 -> [图片] + 文字；
                    02. 已选 -> [图片] + 文字 + 删除按钮；
                    03. 注意: a. 图片有无根据传入数据有无判断；
                              b. 选项被选择后将在待选中移除；
        C.全局按钮组：确认 + 取消；
        D.显示已选项数量；
        E.支持数据回显；
        F.支持待选区域的选项搜索；
        G.支持已选项顺序调整；
        H.支持单次新增选取最大/最小值；
        
    - - - - -  
      @config -> 配置描述，如下：
      
      1. 组件配置项：
        A. data        - 所有数据列表 - 【必须】；
        B. checked     - 已选数据列表；
        C. min         - 最少选择项；
        D. max         - 最多选择项；
        E. defaultImg  - 图片默认项；
        F. icon        - 选框中间图标；
        G. hadTitle    - 是否带有列表标题；
        H. canCheckConfig  - 待选列表配置项；
          1. title       - 待选项标题；
          2. nullText    - 无数据文案；
          3. search      - true / false - 是否开启待选项含搜索功能；
          4. searchText  - 搜索框文案；
        I. checkedConfig - 已选列表配置项；
          1. title       - 已选项标题；
          2. nullText    - 无数据文案；
          3. sort        - true / false - 是否开启已选项顺序调整功能；

      2. 组件返回项：
        A. @res - 返回

    - - - - -
      @starttime -> 20201204
      @author    -> SamyeChan
  -->
  <el-container>
    <!-- 选择项 -->
    <el-card shadow="never" class="card">
      <el-row slot="header">
        <el-row class="card-title" v-if="hadTitle">
          {{ canCheckConf.title }}
        </el-row>
        <el-row>
          <el-input
            class="card-input"
            maxlength="100"
            size="mini"
            prefix-icon="el-icon-search"
            :placeholder="canCheckConf.searchText"
            v-model="searchParamm"
            @keyup.native.enter="onSearch(searchParam)"
          ></el-input>
        </el-row>
      </el-row>
      <div class="card-list">
        <div class="null" v-if="dataArr.length === 0">
          {{ canCheckConf.nullText }}
        </div>
        <div
          class="item"
          v-for="item of dataArr"
          :key="item.val"
          @click="onCheck(item)"
        >
          <span class="img">
            <CImg :hasText="false" :src="item.img" />
          </span>
          <span class="text">{{ item.label }}</span>
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
        <span v-if="hadTitle">{{ checkedConf.title }}</span>
        <span class="row-r" v-if="max > 0">
          {{ checkedArr.length }} / {{ max > 0 && max }}
        </span>
        <span class="row-r" v-else>已选 {{ checkedArr.length }} 个</span>
      </div>
      <div class="card-list">
        <div class="null" v-if="checkedArr.length === 0">
          {{ checkedConf.nullText }}
        </div>
        <Vdraggable
          :list="checkedArr"
          @start="drag = true"
          @end="drag = false"
          handle=".handle"
        >
          <div class="item" v-for="item of checkedArr" :key="item.val">
            <span class="img">
              <CImg :hasText="false" :src="item.img" />
            </span>
            <span class="text">{{ item.label }}</span>
            <el-tooltip effect="dark" content="取消关联" placement="left">
              <el-button
                class="btn"
                :style="`right: ${checkedConf.sort ? '30' : '5'}px;`"
                type="text"
                size="mini"
                icon="el-icon-close"
                @click="onCancelChecked(item)"
              ></el-button>
            </el-tooltip>
            <el-button
              v-if="checkedConf.sort"
              :class="checkedConf.sort ? 'btn handle' : 'btn'"
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
import Vdraggable from 'vuedraggable'
import { UtilMethods } from '@/utils/'

const util = new UtilMethods()

export default {
  props: {
    // 所有数据项
    data: {
      type: Array,
      // required: true
      default() {
        return [
          {
            val: 1,
            label: '项1',
            img: ''
          }
        ]
      }
    },
    // 已选列表
    checked: {
      type: Array,
      default() {
        return []
      }
    },
    // 可选最小值
    min: {
      type: Number,
      default: 0
    },
    // 可选最大值
    max: {
      type: Number,
      default: 0
    },
    // 是否有列表头
    hadTitle: {
      type: Boolean,
      default: true
    },
    // 图片默认项
    defaultImg: {
      type: String,
      default: ''
    },
    // 选框中间图标
    icon: {
      type: String,
      default: ''
    },
    // 待选项配置
    canCheckConfig: {
      type: Object
    },
    // 已选项配置
    checkedConfig: {
      type: Object
    }
  },
  components: { CImg, Vdraggable },
  data() {
    return {
      drag: false, // 拖拽
      searchParamm: null, // 搜索参数
      dataArr: util.deepCopy(this.data), // 所有数据列表
      canCheckArr: [], // 待选列表
      checkedArr: util.deepCopy(this.checked), // 已选列表
      // 待选列表配置项
      canCheckConf: {
        title: '待选项',
        nullText: '无待选数据',
        search: true,
        searchText: '请输入搜索项'
      },
      // 已选列表配置项
      checkedConf: {
        title: '已选项',
        nullText: '无已选数据',
        sort: false
      }
    }
  },
  methods: {
    // ON - 选择
    onCheck(item) {
      this.dataArr = this.dataArr.filter(v => v.val !== item.val)
      this.checkedArr.push(item)
    },
    // ON - 移除选择
    onCancelChecked(item) {
      this.checkedArr = this.checkedArr.filter(v => v.val !== item.val)
      this.dataArr.push(item)
    },
    // TODO: ON - 待选搜索
    onSearch(label) {
      console.log(label)
    }
  },
  created() {
    const checkedValsArr = this.checkedArr.map(item => item.val)
    // 前端过滤已选项
    this.dataArr = this.data.filter(
      item => checkedValsArr.indexOf(item.val) === -1
    )
    // - - - - - 传入项覆盖默认设置
    this.canCheckConfig &&
      (this.canCheckConf = Object.assign(
        this.canCheckConf,
        this.canCheckConfig
      ))
    this.checkedConfig &&
      (this.checkedConf = Object.assign(this.checkedConf, this.checkedConfig))
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 300px;
  height: 400px;
  &-title {
    line-height: 28px;
    margin: 10px 0 0;
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
