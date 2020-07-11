<template>
  <el-image class="img" :src="src" fit="cover" :style="styleConf">
    <!-- 图片未加载出来前的占位处理 -->
    <div slot="placeholder" class="image-slot img__slot-loading">
      <i class="el-icon-loading"></i>
    </div>
    <!-- 图片加载失败的占位处理 -->
    <div slot="error" class="image-slot img__slot-err">
      <div v-if="hasText">糟糕！图片走丢了...</div>
    </div>
  </el-image>
</template>

<script>
export default {
  name: 'cImage',
  props: {
    src: {
      type: String,
      default: ''
    },
    styleConf: {
      type: String,
      default: ''
    },
    hasText: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: inherit;
  height: inherit;
  line-height: inherit;
  // 图片加载异常
  &__slot {
    // 加载态
    &-loading {
      font-size: 30px;
      text-align: center;
      line-height: inherit;
    }
    // 图片走失
    &-err {
      width: inherit;
      height: inherit;
      background-image: url(./not-found.png);
      background-size: cover;
      div {
        line-height: 45px;
        text-align: center;
        color: #777;
      }
    }
  }
}
</style>
