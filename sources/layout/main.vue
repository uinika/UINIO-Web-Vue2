<template>
  <div id="layout">
    <header>
      <navbar></navbar>
    </header>
    <main>
      <sidebar></sidebar>
      <container></container>
    </main>
  </div>
</template>

<script>
import navbar from "./navbar";
import sidebar from "./sidebar";
import container from "./container";
export default {
  components: {
    navbar,
    sidebar,
    container
  },
  data() {
    return {}
  },
  methods: {}
};
</script>

<style lang="less" scoped>
@import "../common/base.less";
#layout {
  .fill;
  display: flex;
  flex-direction: column;
  >header {
    width: 100%;
  }
  >main {
    display: flex;
    flex-direction: row;
    height: 100%;
    #container {
      width: 100%;
    }
  }
};
</style>
