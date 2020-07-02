<template>
  <div class="specPage">
    <div class="specPage-tips">
      <h1>Ooooops...暂无权限访问</h1>
      <h2>请先联系管理员进行权限分配</h2>
      <el-button type="primary" @click="handleLogout"> 点击登出 </el-button>
    </div>
  </div>
</template>

<script>
import { logout } from '@/api/auth'

export default {
  methods: {
    // 登出
    handleLogout() {
      logout()
    }
  }
}
</script>

<style lang="scss" scoped>
.specPage {
  background: #f2f2f2 url(../assets/no-auth.png);
  background-size: cover;
  height: 100%;
  &-tips {
    padding: 15% 10%;
  }
}
</style>
