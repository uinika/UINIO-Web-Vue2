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
    return token ? token : "Unable to get token";
  },
  removeToken() {
    sessionStorage.removeItem("token");
  }
}
