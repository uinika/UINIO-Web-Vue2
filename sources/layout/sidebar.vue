<template>
  <aside id="layout-sidebar">
    <el-menu mode="vertical" default-active="1">
      <el-menu-item-group title="分组一">
        <router-link to="dashboard">
          <el-menu-item index="1">
            <i class="el-icon-message"></i>Dashboard
          </el-menu-item>
        </router-link>
        <router-link to="demo">
          <el-menu-item index="2">
            <i class="el-icon-message"></i>Demo
          </el-menu-item>
        </router-link>
      </el-menu-item-group>
      <el-menu-item-group title="分组二">
        <el-menu-item index="3">
          <i class="el-icon-message"></i>导航三</el-menu-item>
        <el-menu-item index="4">
          <i class="el-icon-message"></i>导航四</el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </aside>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>


<style lang="scss" scoped>
#layout-sidebar {
  width: 16rem;
  .el-menu {
    height: 100%;
  }
}
</style>
