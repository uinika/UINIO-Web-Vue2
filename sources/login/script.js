import Http from "../common/http.js";
import Encrypt from "../common/encrypt.js";
export default {
  data() {
    return {
      username: "",
      password: ""
    }
  },
  methods: {
    onSubmit: () => {
      Http.fetch({
          method: "post",
          url: Http.url.master + "/login",
          data: {
            loginName: Encrypt.sha(this.data.username),
            password: Encrypt.sha(this.data.password)
          }
        })
        .then(function (result) {
          console.log(result)
        })
    }
  }
};
