import SHA from "sha.js";

export const sha = (string) => {
  return SHA("sha256").update(string, "utf8").digest("hex");
};

export const Token = {
  set(token) {
    if (token)
      sessionStorage.setItem("token", token);
  },
  get() {
    const token = sessionStorage.getItem("token")
    return token ? token : undefined;
  },
  remove() {
    sessionStorage.removeItem("token");
  }
};
