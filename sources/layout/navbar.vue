<template>
  <div class="layout-navbar">
    <div class="left">
      <h3>DEMO</h3>
    </div>
    <div class="center">
      <el-menu theme="dark" mode="horizontal">
        <el-menu-item index="1">首页</el-menu-item>
        <el-submenu index="2">
          <template slot="title">菜单1</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
        </el-submenu>
        <el-submenu index="3">
          <template slot="title">菜单2</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <i class="fa fa-user-o"></i>
          用户
          <i class="el-icon-caret-bottom el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>用户信息</el-dropdown-item>
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>
            <router-link :to="'/login'">退出</router-link>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="less" scoped>
@import "../common/color.less";
@import "../common/base.less";

.layout-navbar {
  display: flex;
  flex-direction: row;
  color: @gray;
  background-color: @light-black;
  .left {
    text-align: center;
    width: 17rem;
    h3 {
      .clear;
    }
  }
  .center {
    width: 100%
  }
  .right {
    width: 10rem;
    background-color: @light-black;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-right: 1rem;
    .el-dropdown {
      color: @gray;
    }
  }
}
</style>
