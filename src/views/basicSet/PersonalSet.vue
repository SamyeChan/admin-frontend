<template>
  <div>
    个人中心
    <el-button @click="changeView('/one')">111</el-button>
    <div id="appContainer"></div>
  </div>
</template>

<script>
export default {
  name: 'PersonalSet', // 个人中心
  methods: {
    changeView(who) {
      window.history.pushState(null, who, who)
    }
  }
}
</script>

<style lang="scss" scoped></style>
