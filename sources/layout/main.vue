<template>
  <div>
    <h1>layout</h1>
    <router-view></router-view>
  </div>
</template>

<script>
import { Tree } from "element-ui";
export default {
  components: { "el-tree": Tree },
  // data() { },
  // methods: {}
};
</script>

<style lang="less" scoped>
div {
  background: white
}
</style>
