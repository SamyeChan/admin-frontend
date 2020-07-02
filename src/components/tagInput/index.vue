<template>
  <div class="tag-input">
    <el-tag
      class="tag-input__item"
      v-for="tag in tagsArr"
      :key="tag"
      :closable="isEdit"
      :disable-transitions="false"
      @close="handleClose(tag)"
    >
      {{ tag }}
    </el-tag>
    <el-input
      class="tag-input__new"
      v-if="isEdit && inputVisible"
      v-model="inputValue"
      ref="tagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    >
    </el-input>
    <el-button
      class="tag-input__btn"
      size="small"
      @click="showInput"
      v-if="isEdit && !inputVisible"
      >+ 添加</el-button
    >
  </div>
</template>

<script>
import { UtilMethods } from '@/utils/'

const util = new UtilMethods()
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      tagsArr: [],
      inputVisible: false,
      inputValue: '',
      canRes: false
    }
  },
  watch: {
    canRes(val) {
      if (val) {
        this.$emit('res', this.tagsArr)
        this.canRes = false
      }
    },
    data(val) {
      val && (this.tagsArr = util.deepCopy(val))
    },
    isEdit(val) {
      !val && (this.tagsArr = util.deepCopy(this.data))
    }
  },
  methods: {
    // 移除标签
    handleClose(tag) {
      this.tagsArr.splice(this.tagsArr.indexOf(tag), 1)
      this.canRes = true
    },
    // 显示输入框
    showInput() {
      this.inputVisible = true
      this.$nextTick(() => {
        this.$refs.tagInput.$refs.input.focus()
      })
    },
    // 确认输入
    handleInputConfirm() {
      let inputValue = this.inputValue
      if (inputValue) {
        this.tagsArr.push(inputValue)
        this.canRes = true
      }
      this.inputVisible = false
      this.inputValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.tag-input {
  width: 100%;
  &__item {
    margin: 0 5px 5px 0;
  }
  &__new {
    width: 180px;
    margin-left: 5px;
    vertical-align: bottom;
  }
}
</style>
