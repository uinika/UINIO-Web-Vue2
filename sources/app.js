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
// router component
import layout from "./layout/main.vue";
import login from "./login/main.vue";
import dashboard from "./dashboard/main.vue";

Vue.use(VueRouter);
Vue.use(ElementUI);

const router = new VueRouter({
  routes: [{
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
})

const app = new Vue({
  router
}).$mount("#app")
