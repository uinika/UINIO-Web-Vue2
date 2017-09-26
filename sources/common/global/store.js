import login from "../../login/script.store"

export default {
  strict: process.env.NODE_ENV !== "production",
  modules: {
    login
  }
}
