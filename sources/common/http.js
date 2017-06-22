import _ from "lodash";
import Request from "superagent";

export default () => {
  const token = sessionStorage.token;
  if(token) {
    return Request.set({"Authorization": "Wiserv " + token});
  } else {
    return Request;
  }
};
