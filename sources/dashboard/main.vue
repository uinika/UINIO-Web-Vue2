<template>
  <h1>
    Dashboard</h1>
</template>

<script>
import { http, url } from "../common/http.js";
import Encrypt from "../common/encrypt";

export default {
  mounted() {
    http({
      method: "GET",
      url: url.master + "/sys/logs"
    })
      .then(function (result) {
        console.log(result.data.head);
      })
  }
}
</script>
