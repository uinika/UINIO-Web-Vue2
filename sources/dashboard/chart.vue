<template>
  <div class="dashboard-chart">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>Echarts</span>
      </div>
      <div class="uinika">

      </div>
    </el-card>
  </div>
</template>

<script>
import Http from "../common/http.js";
import {chart} from "../common/helper.js";
export default {
  mounted() {
    chart(".uinika", {
      title: {
        text: "DEMO"
      },
      tooltip: {},
      legend: {
        data: ["销量"]
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: "销量",
        type: "bar",
        data: [5, 20, 36, 10, 10, 20]
      }]
    });
  }
};
</script>

<style lang="less" scoped>
.dashboard-chart {
  width: 50%;
  .uinika {
    height: 16rem;
  }
}
</style>
