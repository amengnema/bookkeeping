<template>
  <el-footer>
    <router-link to="/money">记账</router-link>
    <router-link to="/calendar">明细</router-link>
    <router-link to="/reports">报告</router-link>
  </el-footer>
</template>

<script>
export default {}
</script>

<style>
.el-footer .router-link-active {
  background-color: #409eff;
  color: #fff;
}
</style>
