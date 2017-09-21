import Layout from "../../layout/index.vue";

const Login = resolve => require(["../../login/index.vue"], resolve);

export default {
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
      meta: {
        auth: true
      },
      component: resolve => require(["../../dashboard/index.vue"], resolve)
    }, {
      path: "demo",
      meta: {
        auth: true
      },
      component: resolve => require(["../../demo/index.vue"], resolve)
    }]
  }]
}
