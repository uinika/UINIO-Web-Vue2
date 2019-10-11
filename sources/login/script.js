// import this.http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
export default {
  data() {
    return {
      language: "CN",
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit() {
      const vm = this;
      console.info(vm.http.url.master)
      vm.$router.push('/layout/dashboard');
      vm.http.fetch({
        method: 'post',
        url: vm.http.url.master + '/login',
        data: {
          username: Encrypt.sha(vm.username),
          password: Encrypt.sha(vm.password)
        }
      })
        .then(function (result) {
          const data = result.data;
          if (vm.http.protocol(data, 200)) {
            return data
          }
        })
        .then(function (data) {
          vm.$message({
            message: data.head.message
          });
          return data;
        })
        .then(function (data) {
          Encrypt.token.set(data.head.token);
          return data;
        })
        .then(function (data) {
          vm.$router.push('/layout/dashboard');
        });
    }
  }
};
