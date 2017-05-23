import _ from "lodash";
import Vue from "vue";
import VueRouter from "vue-router";
import "./parts/test.scss";
import test from "./parts/test.js";
import 'element-ui/lib/theme-default/index.css';
import layout from "./parts/layout/main.vue";
import login from "./parts/login/main.vue";

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