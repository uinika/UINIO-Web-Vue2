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
import layout from "./component/layout/main.vue";
import login from "./component/login/main.vue";

Vue.use(VueRouter);

const routes = [{
  path: "/foo",
  component: layout
}, {
  path: "/bar",
  component: login
}]

const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount("#app")
