<template>
  <div class="app-container">
    <el-container>
      <router-view></router-view>
      <FooterNav></FooterNav>
    </el-container>
  </div>
</template>

<script>
import FooterNav from './components/FooterNav/FooterNav'
export default {
  components:{
    FooterNav
  }
}
</script>

<style>
@import url('./common/css/style.css');
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  color: #333;
  text-align: center;
}

body .el-container {
  margin-bottom: 40px;
  height: auto;
  flex-direction: column;
}
.el-footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  background-color: #fff;
  box-shadow: 0 0 3px rgb(0 0 0 / 20%);
}
.el-footer a {
  flex:1;
  text-decoration: none;
  color:#409EFF;
  font-size:14px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-message {
  width:90% !important;
}
.el-message-box {
  width:90% !important;
}
</style>
