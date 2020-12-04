<template>
  <!-- 【TagsChoose 标签选择】

      @description -> 1. 基于element-ui；
                      2. 剥离于GR > Tuya；
                      3. 功能描述：
        A.
        B.
        C.

    - - - - - 
      @config      -> 

    - - - - - 
      @starttime   -> 202012xx
      @author      -> SamyeChan
  -->
  <div class="category-selector">
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="96px"
      :size="size"
    >
      <el-form-item v-if="showTitle" label="标题：" prop="title" required>
        <el-input v-model="form.title" style="width: 260px;"></el-input>
      </el-form-item>
      <div v-if="!hideCategory">
        <el-form-item label="类型：">
          <el-select
            v-model="form.type"
            placeholder="图片"
            style="width: 260px;"
            @change="onChangeType"
          >
            <template>
              <el-option
                v-for="(item, index) in allTags"
                :label="item.tagName"
                :value="item.id"
                :key="index"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="场景：" prop="scenes">
          <el-select
            v-model="form.scenes"
            placeholder="场景"
            multiple
            clearable
            style="width: 260px;"
          >
            <template v-if="allTags">
              <el-option
                v-for="(item, index) in scenes"
                :label="item.tagName"
                :value="item.id"
                :key="index"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="产品分类：" prop="category">
          <el-select
            v-model="form.category"
            placeholder="产品分类"
            multiple
            clearable
            style="width: 260px;"
          >
            <template v-if="allTags">
              <el-option
                v-for="(item, index) in category"
                :label="item.tagName"
                :value="item.id"
                :key="index"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
      </div>
      <div v-if="buttons" style="text-align:center;padding-top:10px;">
        <el-button
          v-if="showCancel"
          @click="onCancel"
          style="margin-right: 50px;"
          :size="size"
          >取消</el-button
        >
        <el-button
          v-if="showSave"
          type="primary"
          @click="onSave"
          :size="size"
          :style="btnStyle"
          >保存</el-button
        >
      </div>
    </el-form>
  </div>
</template>

<script>
import { UtilMethods } from '@/utils'
import { getAllTags } from '@/api/common'

const util = new UtilMethods()
const validateTitle = (rule, value, callback) => {
  let reg = /^[a-zA-Z0-9\u4e00-\u9fa5]+$/
  if (!value.trim()) {
    callback(new Error('请输入作品标题'))
  } else if (!reg.test(value)) {
    callback(new Error('输入字符必须由汉字、字母、数字组成'))
  } else if (value.length > 20) {
    callback(new Error('长度不能超过20个字符'))
  } else {
    callback()
  }
}

export default {
  props: {
    buttons: String,
    data: Object,
    showTitle: Boolean,
    hideCategory: Boolean,
    size: {
      type: String,
      default: 'small'
    }
  },
  computed: {
    showCancel() {
      return this.buttons.indexOf('cancel') > -1
    },

    showSave() {
      return this.buttons.indexOf('save') > -1
    },

    btnStyle() {
      return !this.showCancel ? 'width:140px;' : ''
    }
  },
  data() {
    return {
      allTags: [],
      scenes: [],
      category: [],
      form: {
        title: '',
        type: '',
        category: [],
        scenes: []
      },
      rules: {
        title: [
          { required: true, message: '请输入作品标题', trigger: 'change' },
          { validator: validateTitle, trigger: 'blur' }
        ],
        category: [
          { required: true, message: '请选择产品分类', trigger: 'change' }
        ],
        scenes: [{ required: true, message: '请选择场景', trigger: 'change' }]
      }
    }
  },
  methods: {
    onChangeType(type) {
      this._changeType(type)
      this.form.scenes = []
      this.form.category = []
    },
    onCancel() {
      this.$emit('onCancel')
    },
    onSave() {
      this.$refs.form.validate(valid => {
        if (valid) {
          const data = this.getData()
          this.$emit('onSave', data)
        }
      })
    },
    getData() {
      return util.deepCopy(this.form)
    },

    _changeType(value) {
      const type = this.allTags.find(item => {
        return item.id === value
      })
      if (type) {
        this.scenes = type.subNode.find(item => {
          return item.id === 3 || item.id === 5
        }).subNode

        this.category = type.subNode.find(item => {
          return item.id === 4 || item.id === 6
        }).subNode
      }
    }
  },
  created() {
    // 初次获取全部标签
    getAllTags().then(res => {
      this.allTags = res.data.data || []
      if (this.data) {
        this.form = util.deepCopy(this.data)
      }
      if (!this.form.type && this.allTags[0]) {
        this.form.type = this.allTags[0].id
      }

      this._changeType(this.form.type)
    })
  }
}
</script>

<style lang="scss" scoped>
.category-selector {
  padding: 10px 10px;
}
</style>
