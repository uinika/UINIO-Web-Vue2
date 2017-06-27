<template>
  <div class="dashboard">
    <chart></chart>
  </div>
</template>

<script>
import Http from "../common/http.js";
import chart from "./chart.vue";

export default {
  components: {
    chart: chart
  },
  mounted() {
    Http.fetch({
      method: "GET",
      url: Http.url.master + "/sys/logs"
    })
    .then(function (result) {
      console.log(result.data.head);
    })
  }
}
</script>

<style lang="less" scoped>
  .dashboard{
    display: flex;
    flex-direction: row;
  }
</style>
