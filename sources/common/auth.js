import Encrypt from "./encrypt.js";

export default {
  permit: (to, from, next) => {
    if (to.matched.some(record => record.meta.auth)) {
      if (!Encrypt.getToken()) {
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
  },
  timeout: () => {
    return "";
  }
};
