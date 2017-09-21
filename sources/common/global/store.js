import login from "../../login/store"

export default {
  strict: process.env.NODE_ENV !== "production",
  modules: {
    login
  }
}
