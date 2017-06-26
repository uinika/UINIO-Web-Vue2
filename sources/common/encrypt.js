import SHA from "sha.js";

export default {
  sha(string) {
    return SHA("sha256").update(string, "utf8").digest("hex");
  },
  setToken(token) {
    if (token)
      sessionStorage.setItem("token", token);
  },
  getToken() {
    const token = sessionStorage.getItem("token")
    return token ? token : undefined;
  },
  removeToken() {
    sessionStorage.removeItem("token");
  },
  permit(to, from, next) {
    if (to.matched.some(record => record.meta.auth)) {
      if (!this.getToken()) {
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
  }
};
