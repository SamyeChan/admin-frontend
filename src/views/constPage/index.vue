<template>
  <div>
    <iframe src="" />
    <hr />
    <CTransfer />
  </div>
</template>

<script>
import CTransfer from '@/components/content/transfer'

export default {
  name: 'constPage', // 静态路由页面
  components: { CTransfer },
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
