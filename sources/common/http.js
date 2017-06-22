import _ from "lodash";
import Request from "superagent";

export default () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    return {
      get(url) {
        return Request.get(url).set({
          "Authorization": "Wiserv " + token
        });
      },
      put(url) {
        return Request.put(url).set({
          "Authorization": "Wiserv " + token
        });
      },
      delete(url) {
        return Request.delete(url).set({
          "Authorization": "Wiserv " + token
        });
      },
      post(url) {
        return Request.post(url).set({
          "Authorization": "Wiserv " + token
        });
      }
    }
  } else {
    return Request;
  }
};
