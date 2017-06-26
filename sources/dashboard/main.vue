<template>
  <h1>
    dashboard</h1>
</template>

<script>
import Http from "../common/http.js";
import Encrypt from "../common/encrypt";

const master = Http.url.master;

export default {
  mounted() {
    // console.log("ITEM", Encrypt.getToken());
    Http.get(master + "/sys/logs")
      .then(function (result) {
        console.log(result.body.head);
      })
  }
}
</script>
