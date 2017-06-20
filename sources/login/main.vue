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
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit: function () {
      this.$router.push("/layout/dashboard")
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
