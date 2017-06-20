<template>
  <div id="layout-navbar">
    <el-menu theme="dark" mode="horizontal">
      <el-row>
        <el-col :span="4">
          <li class="logo left"></li>
        </el-col>
        <el-col :span="20">
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
          <li class="user right">
            <el-dropdown>
              <span class="el-dropdown-link">
                用户
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>用户信息</el-dropdown-item>
                <el-dropdown-item>修改密码</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </li>
        </el-col>
      </el-row>
    </el-menu>
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

#layout-navbar {
  .logo {
    width: 100%;
    height: 3.75rem;
    background-color: @black;
    background-image: url("../assets/aves.png") no-repeat;
  }
  .user {
    height: 3.75rem;
    .el-dropdown {
      position: relative;
      top: 1rem;
      right: 1rem;
    }
  }
  .el-dropdown-link {
    color: @gray;
  }
}
</style>
