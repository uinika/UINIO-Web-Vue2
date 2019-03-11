import Http from "../common/scripts/http.js";
import Encrypt from "../common/scripts/encrypt.js";
export default {
  data() {
    return {
      search: "",
      type: ""
    };
  },
  methods: {
    onSearch() {
      console.log("on Search!");
    },
    handleCommand(command) {
      switch (command) {
        case "quit":
          this.$router.push("/login");
          break;
      }
    }
  }
};
