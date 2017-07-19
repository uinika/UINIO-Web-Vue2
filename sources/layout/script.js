import Http from "../common/http.js";
import Encrypt from "../common/encrypt.js";
export default {
  data() {
    return {
      search: "",
    }
  },
  methods: {
    onSearch() {
      console.log("on Search!");
    }
  }
};
