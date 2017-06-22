import _ from "lodash";
import superagent from "superagent";

const token = sessionStorage.getItem("token");

const wrapped = {
  url: window.url,
  header: {
    "Authorization": "Wiserv " + token
  },
  get(url) {
    return Request.get(url).set(this.header);
  },
  put(url) {
    return Request.put(url).set(this.header);
  },
  post(url) {
    return Request.post(url).set(this.header);
  },
  delete(url) {
    return Request.delete(url).set(this.header);
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

const unwrapped = () => {
  superagent.url = wrapped.url;
  superagent.verify = wrapped.verify;
  return superagent;
};

export default token ? wrapped : unwrapped();
