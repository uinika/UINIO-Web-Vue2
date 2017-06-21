// library
import Vue from "vue";
import VueRouter from "vue-router";
// css
import "./common/base.less";
import "./common/color.less";
import "font-awesome/css/font-awesome.css";
// ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-default/index.css";
// component
import Layout from "./layout/main.vue";
import Login from "./login/main.vue";
import Dashboard from "./dashboard/main.vue";

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes: [{
    path: "/",
    component: Login
  }, {
    path: "/login",
    component: Login
  }, {
    path: "/layout",
    component: Layout,
    children: [{
      path: "dashboard",
      component: Dashboard
    }, {
      path: "demo",
      component: resolve => require(["./demo/main.vue"], resolve)
    }]
  }]
})

const app = new Vue({
  router
}).$mount("#app")
