<template>
  <h1>dashboard</h1>
</template>

<script>
import Http from "../common/http.js";

export default {
  mounted() {
    Http().get("http://172.16.0.96:8080/adap_server/sys/logs")
    .then(function(result){
      console.log(result)
    })
  }
}
</script>
