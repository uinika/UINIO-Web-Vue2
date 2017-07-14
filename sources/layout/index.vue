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
export default {
  components: {
    navbar,
    sidebar
  },
  data() {
    return {}
  },
  methods: {}
};
</script>

<style lang="scss" scoped>

</style>
