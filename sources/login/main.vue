<template>
  <el-row class="fill" type="flex" justify="center" align="middle">
    <el-col :span="8">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span style="line-height: 36px;">Login</span>
        </div>
        <el-form>
          <el-form-item label="用户名">
            <el-input placeholder="请输入内容" v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input placeholder="请输入内容" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button class="submit" type="primary" @click="onSubmit">
              <i class="fa fa-user-circle" aria-hidden="true"></i>
              <span>登陆</span>
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-col>
  </el-row>
</template>

<script>
import Http from "superagent";
import Encrypt from "../common/encrypt.js";

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit() {
      const router = this.$router;
      let username = this.username;
      let password = this.password;
      Http.post("http://172.16.0.96:8080/adap_server/login")
        .send({
          loginName: Encrypt.sha(username),
          password: Encrypt.sha(password)
        }).then(
        // success
        function () {
          router.push("/layout/dashboard")
        },
        // failure
        function () {

        })
    }
  }
}
</script>


<style lang="less" scoped>
.submit {
  width: 100%;
  span {
    letter-spacing: 0.5rem;
  }
}
</style>
