import _ from "lodash";
import Vue from "vue";
import VueRouter from "vue-router";
import "./common/base.scss";
import 'element-ui/lib/theme-default/index.css';
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