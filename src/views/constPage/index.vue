<template>
  <div>
    <iframe src="" />
  </div>
</template>

<script>
export default {
  name: 'constPage', // 静态路由页面
  created() {
    // 脚手架提示语
    this.$notify({
      message: `Balabababa~~~~~~ 后台脚手架正常运行，现在就开始完成你的新业务叭~~~`,
      position: 'top-left',
      duration: 5000
    })
  }
}
</script>
