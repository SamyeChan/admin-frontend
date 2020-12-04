<template>
  <div class="specPage">
    <div class="specPage-tips">
      <h1>Ooooops...页面好像走丢了</h1>
      <el-button type="primary" plain @click="$router.go(-1)"
        >返回上一页</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.specPage {
  background: #f2f2f2 url(../assets/404.png);
  background-size: cover;
  height: 100%;
  &-tips {
    padding: 15% 10%;
  }
}
</style>
