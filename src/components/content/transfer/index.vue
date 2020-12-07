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
        C. optionDF    - 选项数据结构定义；
        D. min         - 最少选择项；
        E. max         - 最多选择项；
        F. defaultImg  - 图片默认项；
        G. icon        - 选框中间图标（暂仅支持element-ui icon）；
        H. hadTitle    - 是否带有列表标题；
        I. canCheckConfig  - 待选列表配置项；
          1. title       - 待选项标题；
          2. nullText    - 无数据文案；
          3. search      - true / false - 是否开启待选项含搜索功能；
          4. searchText  - 搜索框文案；
        J. checkedConfig - 已选列表配置项；
          1. title       - 已选项标题；
          2. nullText    - 无数据文案；
          3. sort        - true / false - 是否开启已选项顺序调整功能；
        K. submitText  - 确认按钮文案
        L. cancelText  - 取消按钮文案

      2. 组件返回项：
        A. @on-cancel - 取消
        B. @on-submit - 确认（按条件触发数量限制判定）

    - - - - -
      @starttime -> 20201204
      @author    -> SamyeChan
  -->
  <el-container>
    <!-- 待选项 -->
    <el-card shadow="never" class="card">
      <el-row slot="header">
        <el-row class="card-title" v-if="hadTitle">
          {{ canCheckConf.title }}
        </el-row>
        <el-row>
          <el-input
            class="card-input"
            size="mini"
            maxlength="100"
            prefix-icon="el-icon-search"
            :placeholder="canCheckConf.searchText"
            v-model="searchParam"
            clearable
            @clear="onClear"
            @input="onSearch(searchParam)"
          ></el-input>
        </el-row>
      </el-row>
      <div class="card-list">
        <div class="null" v-if="searchArr.length === 0">
          {{ canCheckConf.nullText }}
        </div>
        <div
          class="item"
          v-for="item of searchArr"
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
      <i :class="icon"></i>
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
            <!-- 按钮组 -->
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
    <div class="footer-btns">
      <el-button
        type="primary"
        size="small"
        @click="onSubmit"
        :disabled="checkedArr.length === 0"
      >
        {{ submitText }}
      </el-button>
      <el-button size="small" @click="$emit('on-cancel')">
        {{ cancelText }}
      </el-button>
    </div>
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
          },
          {
            val: 2,
            label: '项2',
            img: ''
          },
          {
            val: 3,
            label: '项3',
            img: ''
          },
          {
            val: 4,
            label: '项4',
            img: ''
          },
          {
            val: 5,
            label: '项5',
            img: ''
          },
          {
            val: 6,
            label: '项6',
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
    // TODO - 选项结构定义
    optionDF: {
      type: Array,
      default() {
        return ['val', 'label', 'img']
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
    // 选框中间图标（暂仅支持element-ui icon）
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
    },
    // 确认按钮文本
    submitText: {
      type: String,
      default: '确 定'
    },
    // 取消按钮文本
    cancelText: {
      type: String,
      default: '取 消'
    }
  },
  components: { CImg, Vdraggable },
  data() {
    return {
      drag: false, // 拖拽
      searchParam: null, // 搜索参数
      canCheckArr: [], // 待选列表
      searchArr: [], // 搜索列表（实际显示待选列表）
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
    // INIT - 初始化数据（传入vs当前）
    initData() {
      // TODO - - - - - 01 选项数据结构规整
      // let arr = []
      // this.data.forEach(v => {
      //   let obj = {}
      //   this.optionDF[0] && (obj.val = v[this.optionDF[0]])
      //   this.optionDF[1] && (obj.label = v[this.optionDF[1]])
      //   this.optionDF[2] && (obj.img = v[this.optionDF[2]])
      //   arr.push(obj)
      // })
      // - - - - - 02 过滤已选列表值得出待选列表
      const checkedValsArr = this.checked.map(item => item.val)
      this.canCheckArr = this.data.filter(
        item => checkedValsArr.indexOf(item.val) === -1
      )
      // 实际待选列表（搜索列表）同时得到赋值
      this.searchArr = util.deepCopy(this.canCheckArr)
      // - - - - - 03 传入项覆盖默认设置
      this.canCheckConfig &&
        (this.canCheckConf = Object.assign(
          this.canCheckConf,
          this.canCheckConfig
        ))
      this.checkedConfig &&
        (this.checkedConf = Object.assign(this.checkedConf, this.checkedConfig))
    },
    // ON - 选择
    onCheck(item) {
      // 数量限制判定 - 最大值
      if (this.max > 0 && this.checkedArr.length >= this.max) {
        this.$message.warning(`至多选择 ${this.max} 项，请调整选项`)
        return
      }
      this.canCheckArr = this.canCheckArr.filter(v => v.val !== item.val)
      this.searchArr = this.searchArr.filter(v => v.val !== item.val)
      this.checkedArr.push(item)
    },
    // ON - 移除选择
    onCancelChecked(item) {
      this.checkedArr = this.checkedArr.filter(v => v.val !== item.val)
      this.canCheckArr.push(item)
      this.searchArr.push(item)
    },
    // ON - 待选搜索
    onSearch(label) {
      this.searchArr = this.canCheckArr.filter(
        item => item.label.indexOf(label) !== -1
      )
    },
    // ON - 清空搜索
    onClear() {
      this.searchArr = util.deepCopy(this.canCheckArr)
    },
    // ON - 确认
    onSubmit() {
      const len = this.checkedArr.length
      // 数量限制判定 - 最小值
      if (this.min > 0 && len < this.min) {
        this.$message.warning(`请至少选择 ${this.min} 项`)
        return
      }
      // 数量限制判定 - 最大值 --> [保险校验 - 一般用不着]
      if (this.max > 0 && len >= this.max) {
        this.$message.warning(`至多选择 ${this.max} 项，请调整选项`)
        return
      }
      // 通过则返回
      this.$emit('on-submit', this.checkedArr)
    }
  },
  created() {
    this.initData()
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
.option {
  font-size: 30px;
  color: #409eff;
  height: 400px;
  line-height: 400px;
  margin: 0 15px;
}
</style>
