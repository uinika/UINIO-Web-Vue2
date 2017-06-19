<template>
  <el-row :type="flex" :justify="center" :align="middle">
    <el-col :span="10">
      <el-card class="box-card">
        <el-input class="hank.zheng" placeholder="请输入内容" v-model="username">
          <template slot="prepend">用户名</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="password">
          <template slot="prepend">密码</template>
        </el-input>
        <el-button type="primary" native-type="submit">登陆</el-button>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import { Col, Row } from "element-ui";
import { Card, Input, Button } from "element-ui";

export default {
  components: {
    "el-card": Card,
    "el-input": Input,
    "el-button": Button,
    "el-col": Col,
    "el-row": Row
  },
  data: function () {
    return {
      username: "",
      password: ""
    }
  }
}
</script>


<style lang="less" scoped>
#login {}
</style>
