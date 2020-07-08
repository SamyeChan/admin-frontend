<template>
  <div>单级菜单页</div>
</template>

<script>
export default {
  name: 'Detail1', // 列表
  created() {
    this.$notify({
      // title: '提示',
      message: `Balabababa~~~~~~ 后台脚手架正常运行，现在就开始完成你的新业务叭~~~`,
      position: 'top-left',
      duration: 5000
    })
  }
}
</script>
