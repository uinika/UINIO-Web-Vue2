import Encrypt from "./encrypt";
import Axios from "axios";

export default {
  url: window.url,
  fetch: Axios.create({
    timeout: 1000,
    headers: {
      "Authorization": "Wiserv " + Encrypt.getToken()
    }
  }),
  verify(data, status) {
    if (data && data.head &&
      data.head.status === status &&
      data.hasOwnProperty("body"))
      return true;
    else
      return false;
  }
}
