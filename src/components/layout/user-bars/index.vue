<template>
  <div class="user-bar">
    <el-avatar
      class="avatar"
      src="/default-avatar.png"
      v-if="hasAvatar"
    ></el-avatar>
    <el-popover
      popper-class="popover"
      placement="bottom"
      width="150"
      trigger="click"
    >
      <!-- 顶部显示项 -->
      <span slot="reference" class="text" type="text">
        {{ showName }}
        <i class="el-icon-caret-bottom" />
      </span>
      <!-- 操作项 -->
      <ul>
        <li><i class="el-icon-user-solid" />个人中心</li>
        <li><i class="el-icon-caret-bottom" />退出</li>
      </ul>
    </el-popover>
  </div>
</template>

<script>
export default {
  name: 'user-bars',
  props: {
    showName: {
      type: String,
      default: ''
    },
    hasAvatar: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
.user-bar {
  display: inline-block;
  height: inherit;
  line-height: inherit;
  .avatar {
    display: inline-block;
  }
  .popover {
    display: inline-block;
    height: inherit;
    line-height: inherit;
    margin-top: 5px !important;
  }
  .text {
    display: inline-block;
    height: inherit;
    line-height: inherit;
    color: #606266;
    font-size: 14px;
  }
}
</style>
