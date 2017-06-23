<template>
  <div id="login">
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
  </div>
</template>

<script>
import Http from "../common/http.js";
import Encrypt from "../common/encrypt.js";

const master = Http.url.master;

export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  mounted() {
    Encrypt.removeToken();
  },
  methods: {
    onSubmit() {
      const vm = this;
      Http.post(master + "/login")
        .send({
          loginName: Encrypt.sha(this.username),
          password: Encrypt.sha(this.password)
        }).then(
        // success
        function (result) {
          if (result && result.body) {
            let data = result.body;
            switch (data.head.status) {
              case 200: {
                Encrypt.setToken(data.head.token);
                vm.$router.push("/layout/dashboard")
              } break;
              default: {
                alert(data.head.message);
              }
            }
          }
        },
        // failure
        function () {
          alert();
        })
    }
  }
}
</script>

<style lang="less" scoped>
@import "../common/base.less";

#login {
  .fill;
  .submit {
    width: 100%;
    span {
      letter-spacing: 0.5rem;
    }
  }
}
</style>
