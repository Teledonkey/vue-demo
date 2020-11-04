<template>
  <el-container class="home">
    <!-- 头部 -->
    <el-header class="ub main-justify cross-center header">
      <div class="header-left-text">
        Spring boot开发小而完整的Web前后端分离项目实战
      </div>
      <div class="ub main-center cross-center">
        <el-dropdown placement="bottom-start">
          <img class="user-img" src="../assets/images/avatar.jpg" alt="" />
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <div class="user-role">
          <div class="wollcom">欢迎您，管理员</div>
          <div class="header-time">2020.11.02 10:29:23 星期一</div>
        </div>
      </div>
    </el-header>
    <el-container>
      <!-- 菜单栏 -->
      <el-aside width="auto">
        <menu-bar></menu-bar>
      </el-aside>
      <el-container>
        <!-- 右边内容显示区 -->
        <el-main>
          <tabs></tabs>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
import MenuBar from "../components/MenuBar.vue";
import Tabs from "../components/Tabs.vue";

export default {
  name: "Home",
  components: {
    MenuBar,
    Tabs,
  },
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;
}

.header {
  background-color: #167bd8;
  color: white;
}

.header-left-text {
  font-size: 20px;
}

.user-img {
  height: 45px;
  width: 45px;
  border-radius: 50%;
  cursor: pointer;
}

.user-role {
  margin-left: 10px;
}

.wollcom {
  font-size: 15px;
  font-weight: bolder;
}

.header-time {
  font-size: 14px;
}

.el-aside {
  border-right: 1px solid #e6e6e6;
}

.el-main {
  padding: 0px;
}
</style>