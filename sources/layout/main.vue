<template>
  <div id="layout-main">
    <el-row>
      <el-col :span="24">
        <nav-bar></nav-bar>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="4">
        <side-bar></side-bar>
      </el-col>
      <el-col :span="20">
        <div id="container">
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Navbar from "./navbar";
import Sidebar from "./sidebar";

export default {
  components: {
    "nav-bar": Navbar,
    "side-bar": Sidebar
  },
  data() {
    return {}
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../common/base.less";

#layout-main {
  .fill;
}
</style>
