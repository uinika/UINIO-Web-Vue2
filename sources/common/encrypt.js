import SHA from "sha.js";

export default {
  sha(string) {
    return SHA("sha256").update(string, "utf8").digest("hex");
  }
}
