// library
import Vue from "vue";
import VueRouter from "vue-router";
// css
import "font-awesome/css/font-awesome.css";
import "element-ui/lib/theme-default/index.css";
// common
import "./common/base.less";
import "./common/color.less";
// router component
import layout from "./layout/main.vue";
import login from "./login/main.vue";
import dashboard from "./dashboard/main.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/",
  component: login
}, {
  path: "/login",
  component: login
}, {
  path: "/layout",
  component: layout,
  children: [{
    path: "dashboard",
    component: dashboard
  }]
}]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount("#app")
