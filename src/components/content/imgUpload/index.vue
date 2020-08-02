<template>
  <div class="img-upload">
    <!-- 图片集 -->
    <div
      class="image image-item"
      v-for="(item, index) of fileList"
      :key="index"
    >
      <!-- 进度环 -->
      <el-progress
        class="img-upload__prog"
        type="circle"
        :percentage="item.percentage"
        v-if="item.unUpload"
      />
      <!-- 回显 -->
      <div
        class="image image-item__click"
        @click="handlePreview(item.url)"
        v-else
      >
        <CImg
          class="image-item__ct"
          :src="`${item.url}?imageMogr2/crop/148x148/quality/80`"
        />
      </div>
      <!-- 遮罩层 -->
      <!-- <div class="image-item__mask">&nbsp;</div> -->
      <!-- 遮罩层操作项 -->
      <div class="image-item__icon">
        <!-- <i
          class="el-icon-zoom-in"
          @click="handelRemove(index)"
          v-show="isEdit"
        ></i> -->
        <i
          class="el-icon-close"
          @click="handelRemove(index)"
          v-show="isEdit && !item.unUpload"
        ></i>
      </div>
    </div>
    <!-- 预览 -->
    <CImageView
      v-if="dialogVisible"
      :on-close="handleClosePreview"
      :url-list="[dialogImageUrl]"
    />
    <!-- 上传按钮 -->
    <div
      :class="isCheckNul ? 'image image-add image-checkNul' : 'image image-add'"
      v-show="isEdit && restCount"
    >
      <i class="image-add__icon el-icon-plus"></i>
      <input
        class="upload__btn"
        type="file"
        :multiple="isMultiple"
        @change="handleChange"
      />
    </div>
    <!-- 错误提示 -->
    <div class="image-checkNul__tip" v-show="isEdit && isCheckNul">
      请上传图片
    </div>
    <!-- 备注信息 -->
    <div class="image-remark" v-show="isEdit">
      注：图片格式只支持PNG、JPG、JPEG，
      <span v-if="limit === 1">仅可上传一张</span>
      <span v-else>最多上传 {{ limit }} 张</span>
      <span v-show="remark">{{ remark }}</span>
    </div>
    <!-- 无数据 -->
    <div class="image-null" v-show="isNull && !isEdit">暂未上传</div>
  </div>
</template>

<script>
import CImg from '../img'
import CImageView from '../imgPreview'
import createUploader from './uploader'
import { UtilMethods } from '@/utils/'

const util = new UtilMethods()

export default {
  name: 'imgUpload', // 图片上传
  components: { CImg, CImageView },
  props: {
    data: {
      // 回显数据
      type: Array,
      default() {
        return []
      }
    },
    limit: {
      // 上传限制数
      type: Number,
      default: 1
    },
    maxSize: {
      type: Number,
      default: 20
    },
    width: {
      type: Number,
      default: null
    },
    height: {
      type: Number,
      default: null
    },
    isEdit: {
      // 是否可编辑
      type: Boolean,
      required: false
    },
    aCheck: {
      // 校验标识
      type: Number,
      required: true
    },
    remark: {
      type: String,
      default: null
    }
  },
  computed: {
    isMultiple() {
      return this.limit > 1
    },
    isNull() {
      return this.fileList.length === 0
    },
    restCount() {
      // 余下可上传数
      const minus = this.limit - this.fileList.length
      return minus > 0 ? minus : false
    }
  },
  watch: {
    data: {
      handler(val) {
        // 传入数据总会跟着操作改变 --> 仅在首次（即aCheck处于初始值0时进行fileList赋值）
        if (val && this.aCheck < 1) {
          let _fileList = []
          val.forEach(item => {
            _fileList.push({ url: item })
          })
          this.fileList = util.deepCopy(_fileList)
        }
      },
      immediate: true
    },
    aCheck(val) {
      if (val > 0) {
        this.isNull ? (this.isCheckNul = true) : this.validateRes()
      }
    },
    isEdit(val) {
      !val && (this.isCheckNul = false)
    }
  },
  data() {
    return {
      isCheckNul: false,
      dialogImageUrl: '',
      dialogVisible: false,
      fileList: [] // 文件列表
    }
  },
  methods: {
    // 返回数据前的校验
    validateRes() {
      const isPass = this.validate(this.fileList)
      // 返回一个数组
      if (isPass) {
        const filesArr = this.fileList.map(item => item.url)
        this.$emit('res', { fileArr: filesArr, isReq: true })
      }
    },
    // 校验图片（格式 --> image/png、image/jpeg | 大小 --> ）
    validate(fileList) {
      let isPass = false
      for (let i = 0; i < fileList.length; i++) {
        const file = fileList[i]
        if (file && file.type) {
          const type = file.type.split('/')[1]
          const size = file.size
          if (!/png|jpg|jpeg/i.test(type)) {
            isPass = false
            this.$message.warning(
              '仅支持PNG、JPG、JPEG图片格式上传，请再次检查后上传'
            )
          } else if (
            parseFloat(size) > parseFloat(this.maxSize * 1024 * 1024)
          ) {
            isPass = false
            this.$message.warning(
              `图片大小限制不超过${this.maxSize}MB，请再次检查后上传`
            )
          } else if (this.width && this.height) {
            if (this.width === file.width && this.height === file.height) {
              isPass = true
            } else {
              this.$message.warning(
                `图片尺寸限制为：${this.width}*${this.height}，请调整后再次上传`
              )
              isPass = false
            }
          } else {
            isPass = true
          }
        } else {
          isPass = true
        }
        if (!isPass) {
          // 清空上传input值（解决同路径文件不可多次上传问题）
          document.querySelector('.upload__btn').value = ''
          break
        }
      }
      return isPass
    },
    // 获取文件信息（width、height）
    getImageInfo(file) {
      return new Promise((resolve, reject) => {
        let fileImg = URL.createObjectURL(file)
        let img = new Image()
        img.src = fileImg
        img.onload = () => {
          resolve({
            width: img.width,
            height: img.height
          })
        }
        img.onerror = () => {
          reject(new Error('generateLocalFileInfo error: image fail'))
        }
      })
    },
    // 文件改变即上传
    handleChange(e) {
      this.isCheckNul = false
      let files = e.target.files
      if (files.length === 1) {
        this.getImageInfo(files[0])
          .then(img => {
            files[0].width = img.width
            files[0].height = img.height
            this.handleFile(files)
          })
          .catch(() => {
            this.$message.warning(
              '仅支持PNG、JPG、JPEG图片格式上传，请再次检查后上传'
            )
            // 清空上传input值（解决同路径文件不可多次上传问题）
            document.querySelector('.upload__btn').value = ''
          })
      } else {
        this.handleFile(files)
      }
    },
    // 初始化
    handleFile(files) {
      if (this.checkExceed(files.length) && this.validate(files)) {
        files.forEach((file, index) => {
          file = Object.assign(file, {
            uid: new Date().getTime() + index.toString(), // 标识值（fix：多个上传）
            url: '',
            percentage: 0,
            unUpload: true
          })
          this.fileList.push(file)
          this.uploadOss(file)
        })
      }
    },
    // 响应进度条
    resProgress({ uid, percentage }) {
      this.matchUid(this.fileList, uid, i => {
        this.fileList[i].percentage = percentage
        this.$forceUpdate()
      })
    },
    // Oss - 上传成功
    resSuccess({ uid, url }) {
      this.matchUid(this.fileList, uid, i => {
        this.fileList[i].unUpload = false
        this.fileList[i].url = url
        this.$forceUpdate()
      })
      if (this.limit === 1) {
        const filesArr = this.fileList.map(item => item.url)
        this.$emit('res', { fileArr: filesArr, isReq: false })
      }
    },
    // Oss - 上传失败
    resError({ uid, err }) {
      console.log('------ resError ----')
      console.log(err)
      this.matchUid(this.fileList, uid, i => {
        this.fileList.splice(i, 1)
      })
      this.$message.error('上传出错，请稍后重试！')
    },
    // Oss - 上传到OSS
    uploadOss(file) {
      // 自定义存储地：chudian/image
      const baseObjectKey = 'chudian/image/'
      const uploader = createUploader(file, {
        progress: this.resProgress,
        success: this.resSuccess,
        error: this.resError,
        complete: this.onComplete,
        baseObjectKey
      })
      uploader.start()
    },
    // Oss - 匹配上传图片唯一标识uid
    matchUid(list, uid, callback) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].uid === uid) {
          callback && callback(i)
          break
        }
      }
    },
    // 移除文件
    handelRemove(index) {
      this.fileList.splice(index, 1)
      const filesArr = this.fileList.map(item => item.url)
      this.$emit('res', { fileArr: filesArr, isReq: false })
    },
    // 开启预览
    handlePreview(url) {
      this.dialogImageUrl = `${url}?imageMogr2/thumbnail/x600/quality/80`
      this.dialogVisible = true
    },
    // 关闭预览
    handleClosePreview() {
      this.dialogVisible = false
    },
    // 检查超限
    checkExceed(fileLen) {
      if (!this.restCount) {
        // 目前在已达上传上限时，就会自动隐藏“+”入口
        this.$message.warning(`已达到上传上限，请调整后重新上传`)
        return false
      } else if (this.restCount < fileLen) {
        this.$message.warning(
          `仅可再上传 ${this.restCount} 张，请调整后重新上传`
        )
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss" scoped>
@import './';
</style>
