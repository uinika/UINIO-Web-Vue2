import Http from "../common/helper/http.js";
import Encrypt from "../common/helper/encrypt.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit() {
      const vm = this;
      Http.fetch({
          method: "post",
          url: Http.url.master + "/login",
          data: {
            loginName: Encrypt.sha(vm.username),
            password: Encrypt.sha(vm.password)
          }
        })
        .then(function (result) {
          const data = result.data;
          if (Http.protocol(data, 200)) {
            alert(data.head.message);
            Encrypt.token.set(data.head.token);
            vm.$router.push("/layout/dashboard");
          }
        })
    }
  }
};
