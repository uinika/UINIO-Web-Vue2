import Encrypt from "./encrypt";
import Axios from "axios";

export const url = window.url;

// export const refreshToken = () => {
//   return Encrypt.getToken();
// };

export const http = Axios.create({
  timeout: 1000,
  headers: {
    "Authorization": "Wiserv " + Encrypt.getToken()
  }
});

export const verify = (data, status) => {
  if (data && data.head &&
    data.head.status === status &&
    data.hasOwnProperty("body"))
    return true;
  else
    return false;
};

export const timeout = () => {
  http.interceptors.response.use(function (response) {
    const head = response.data.head;
    if (head && typeof head === "object" && head.hasOwnProperty("status")) {
      if (head.status === 202) {
        window.location.href = "#/login";
      }
    }
    return response;
  }, function (error) {
    return Promise.reject(error);
  });
};
