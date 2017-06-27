<template>
  <h1>
    Dashboard</h1>
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
}
</script>
