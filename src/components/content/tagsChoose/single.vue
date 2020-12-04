<template>
  <div class="tags">
    <el-tabs
      class="tags-radio"
      v-model="activeCategory"
      @tab-click="handleCategory"
    >
      <el-tab-pane
        v-for="category of allTags"
        :key="category.id.toString()"
        :label="category.tagName"
        :name="category.id.toString()"
      >
        <div v-for="(group, index) of category.subNode" :key="group.id">
          <span class="tags__label">{{ group.tagName }}：</span>
          <el-radio-group class="tags__group" v-model="checkedTags[index]">
            <el-radio
              class="tags__item"
              label="全部"
              @change="handleCheckedAll(index)"
            />
            <el-radio
              class="tags__item"
              v-for="(tag, inx) of group.subNode"
              :key="inx"
              :label="tag.id"
              @change="handleChecked(index)"
            >
              {{ tag.tagName }}
            </el-radio>
          </el-radio-group>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { UtilMethods } from '@/utils'
import { getAllTags } from '@/api/common'

const util = new UtilMethods()

export default {
  name: 'CTagsGroups',
  props: {
    reset: Boolean
  },
  watch: {
    // 响应重置标识 --> true时，重置标签相关预设变量
    reset(val) {
      if (val) {
        // !Q --> 解决首tags组再次搜索无反应问题
        for (let i = 0; i < 5; i++) {
          this.checkedTags.push('全部')
        }
        // 重置tag标签
        this.initcheckedTags(this.allTags, 0)
      }
    }
  },
  data() {
    return {
      isFirst: true,
      allTags: [],
      activeGLen: 0,
      activeCategory: 0, // 已选一级类别项（id）
      checkedGroups: [], // 已选二级分组项（id）
      checkedTags: [] // 已选三级分组项（id）
    }
  },
  methods: {
    // 切换一级分类时 --> 1. 更新类别激活态；2.初始化二三级别已选组；
    handleCategory() {
      // element-ui切换标签组name需要是String，此处需转回Number
      const activeCId = parseInt(this.activeCategory)
      const activeCIdIndex = this.allTags
        .map(item => item.id)
        .indexOf(activeCId)
      // 点击一级分类时，需要初始化（清空）下级所有选择
      this.initcheckedTags(this.allTags, activeCIdIndex)
    },
    // 非全选操作
    handleChecked(index) {
      this.checkedGroups[index].tags_id = this.checkedTags[index]
      this.resData()
    },
    // 全选操作
    handleCheckedAll(index) {
      this.checkedTags[index] = '全部'
      this.checkedGroups[index].tags_id = []
      this.resData()
    },
    // 处理请求参数（ps：不要直接操作this.checkedGroups，会迷之报错）
    resData() {
      let readyList = util.deepCopy(this.checkedGroups)
      readyList = readyList.splice(0, this.activeGLen)
      const obj = {
        tag_root: this.activeCategory,
        list: readyList.filter(item => item.tags_id.length !== 0)
      }
      this.$emit('res', obj)
    },
    // 初始化各预设标签选中组（切换一次一级分类都需要重置一次）
    initcheckedTags(arr, index) {
      const activeC = arr[index]
      this.activeGLen = activeC.subNode.length
      this.checkedGroups = []
      // element-ui切换标签组name需要是String，此处需转换
      this.activeCategory = activeC.id.toString()
      if (this.activeGLen > 0) {
        activeC.subNode.forEach((group, index) => {
          this.checkedGroups.push({
            group_id: group.id,
            tags_id: []
          })
          this.checkedTags[index] = '全部'
        })
      }
      this.resData()
    }
  },
  created() {
    // !Q --> checkedTags的初始化问题
    for (let i = 0; i < 5; i++) {
      this.checkedTags.push('全部')
    }
  },
  activated() {
    getAllTags().then(res => {
      this.allTags = res.data.data
      if (this.isFirst) {
        this.initcheckedTags(this.allTags, 0)
        this.isFirst = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
// 标签筛选
.tags {
  // 统一变量定义
  --tag__label-color: #303030;
  --tag__item-color: #444950;
  --tag__item-color_active: #409eff;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 5px 20px 10px;
  margin-bottom: 10px;
  &__label {
    margin-right: 10px;
    min-width: 80px;
    padding: 0;
    font-weight: 600;
    color: var(--tag__label-color);
    height: 35px;
    line-height: 35px;
  }
  &__group {
    display: inline-block;
    padding: 0;
    height: 30px;
    line-height: 30px;
    ::v-deep .el-radio__input {
      display: none;
    }
  }
  &__item {
    font-size: 14px;
    line-height: 20px;
    margin: 0 5px 5px 0;
    color: var(--tag__item-color);
    ::v-deep .el-radio__label {
      padding: 0 3px;
      padding: 5px 10px;
      border-radius: 6px;
    }
    ::v-deep .el-radio__input.is-checked + .el-radio__label,
    ::v-deep .el-radio__input.is-disabled + .el-radio__label {
      color: var(--tag__item-color_active);
      background-color: #f0f6ff;
    }
  }
  &__item:hover {
    cursor: pointer;
    color: var(--tag__item-color_active);
  }
}
</style>
