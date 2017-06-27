<template>
  <div id="layout-main">
    <div id="head">
      <nav-bar id="navbar"></nav-bar>
    </div>
    <div id="body">
      <side-bar id="sidebar"></side-bar>
      <router-view id="container"></router-view>
    </div>
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
  display: flex;
  flex-direction: column;
  #head {
    width: 100%;
  }
  #body {
    display: flex;
    flex-direction: row;
    height: 100%;
    #sidebar {
      width: 16rem;
    }
    #container {
      width: 100%;
    }
  }
};
</style>
