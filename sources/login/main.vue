<template>
  <div id="login">
    <el-row class="fill" type="flex" justify="center" align="middle">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>Demo</span>
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
    <!-- -->
    <el-dialog title="提示" :visible.sync="dialogVisible" size="tiny">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
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
      password: "",
      dialogVisible: false
    }
  },
  methods: {
    onSubmit() {
      const vm = this;
      Http.fetch({
        method: "post",
        url: master + "/login",
        data: {
          loginName: Encrypt.sha(vm.username),
          password: Encrypt.sha(vm.password)
        }
      }).then(
        function (result) {
          if (result && result.data) {
            let head = result.data.head;
            switch (head.status) {
              case 200: {
                Encrypt.setToken(head.token);
                vm.$router.push("/layout/dashboard");
              } break;
              default: {
                alert(head.message);
              }
            }
          }
        })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    }
  },
  beforeCreate() {
    Encrypt.removeToken();
  },
}
</script>

<style lang="less" scoped>
@import "../common/base.less";
@import "../common/color.less";

#login {
  .fill;
  background: @light-black;
  .submit {
    width: 100%;
    span {
      letter-spacing: 0.5rem;
    }
  }
}
</style>
