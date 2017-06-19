<template>
  <Card class="box-card">
    <div v-for="o in 4" :key="o" class="text item">
      {{'列表内容 ' + o }}
    </div>
  </Card>
</template>

<script>
import { Card } from "element-ui";

export default {
  components: { "Card": Card },
}
</script>


<style lang="less" scoped>

</style>
