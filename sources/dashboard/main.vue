<template>
  <h1>Dashboard</h1>
</template>

<script>
import Http from "../common/http.js";
import Encrypt from "../common/encrypt";

const master = Http.url.master;

export default {
  mounted() {
    Http.fetch({
      method: "GET",
      url: master + "/sys/logs"
    })
    .then(function (result) {
      console.log(result.data.head);
    })
  }
}
</script>
