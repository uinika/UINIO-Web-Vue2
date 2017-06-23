<template>
  <h1>
    dashboard</h1>
</template>

<script>
import Http from "../common/http.js";

const master = Http.url.master;

export default {
  mounted() {
    Http.get(master + "/sys/logs")
      .then(function (result) {
        console.log("sys/logs ", result);
      })
  }
}
</script>
