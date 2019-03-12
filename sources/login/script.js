import Http from '../common/scripts/http.js';
import Encrypt from '../common/scripts/encrypt.js';
export default {
  data() {
    return {
      loginName: '',
      password: ''
    }
  },
  methods: {
    onSubmit() {
      const vm = this;
      console.info(Http.url.master)
      vm.$router.push('/layout/dashboard');
      Http.fetch({
          method: 'post',
          url: Http.url.master + '/login',
          data: {
            loginName: Encrypt.sha(vm.loginName),
            password: Encrypt.sha(vm.password)
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
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
