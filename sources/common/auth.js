import {Http} from "./http.js";
import {Token} from "./encrypt.js";

// Is access allowed ?
export const accessibility = (to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    if (!Token.get()) {
      next({
        path: "/login",
        query: {
          redirect: to.fullPath
        }
      })
    } else {
      next()
    }
  } else {
    next()
  }
};

// Json Web Token handler
export const interceptor = () => {
  Http.interceptors.request.use(function (config) {
    const token = Token.get();
    if (token)
      config.headers.Authorization = "Wiserv " + token;
    return config;
  }, function (error) {
    return Promise.reject(error);
  });
  Http.interceptors.response.use(function (response) {
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
