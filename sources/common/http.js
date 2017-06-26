import _ from "lodash";
import superagent from "superagent";
import Encrypt from "./encrypt";

export default {
  url: window.url,
  get(url) {
    return superagent.get(url).set(this.handler());
  },
  put(url) {
    return superagent.put(url).set(this.handler());
  },
  post(url) {
    return superagent.post(url).set(this.handler());
  },
  delete(url) {
    return superagent.delete(url).set(this.handler());
  },
  handler() {
    const token = Encrypt.getToken();
    return token ? {
      "Authorization": "Wiserv " + token
    } : {};
  },
  verify(data, status) {
    if (data && data.head &&
      data.head.status === status &&
      data.hasOwnProperty("body"))
      return true;
    else
      return false;
  }
};
