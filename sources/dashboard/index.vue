<template>
  <div class="dashboard">
  </div>
</template>

<script>
import Http from "../common/http.js";

export default {
  mounted() {
    Http.fetch({
      method: "GET",
      url: Http.url.master + "/sys/logs"
    })
    .then(function (result) {
      console.log(result.data.head);
    })
  }
};
</script>

<style lang="scss" scoped>
  .dashboard{
    display: flex;
    flex-direction: row;
  }
</style>
